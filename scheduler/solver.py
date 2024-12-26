import pulp
from utils import time_to_shift, can_work, convert_to_unavailable_shifts, converToDayOfWeek, create_conflict_matrix, count_bookings_in_day_shift

def solve_scheduling(request):
    trainers = request.trainers
    workouts = request.workouts
    bookings = request.bookings
    bookeds = request.bookeds
    trainer_workout = request.trainer_workout
    trainer_schedule = request.trainer_schedule
    trainer_not_available = convert_to_unavailable_shifts(trainer_schedule)
    conflict_booking_times = create_conflict_matrix(bookings)
    # Create helper dictionaries
    booking_dict = {b['id']: b for b in bookings}
    trainer_dict = {t['id']: t for t in trainers}
    workout_dict = {w['id']: w for w in workouts}
    trainer_workout_dict = {(tw['trainerId'], tw['workoutId']): True for tw in trainer_workout}

    trainer_ids = [t['id'] for t in trainers]
    booking_ids = [b['id'] for b in bookings]

    NumOfWeakConstraints = len(trainer_not_available) + len(bookeds)

    WeakWeight1 = 2
    WeakWeight2 = 1
    BalanceWeight = 3
    delta = 1  # Ngưỡng cho phép chênh lệch số lượng bookings giữa các trainers

    # Create a LP minimization problem
    prob = pulp.LpProblem("Gym", pulp.LpMinimize)

    weakConstraints = pulp.LpVariable.dicts("IsSATWeak", range(NumOfWeakConstraints), 0, 1, pulp.LpBinary)

    assign_vars = pulp.LpVariable.dicts("Assign", 
        [(i, j) for i in trainer_ids for j in booking_ids], 0, 1, pulp.LpBinary)

    # Variables for balance constraints
    avg_bookings = len(bookings) / len(trainers)
    balance_vars = pulp.LpVariable.dicts("Balance", trainer_ids, lowBound=0, cat='Continuous')

    prob += pulp.lpSum((weakConstraints[i] * WeakWeight1) for i in range(len(trainer_not_available))) + pulp.lpSum((weakConstraints[i] * WeakWeight2) for i in range(len(trainer_not_available), NumOfWeakConstraints)) + pulp.lpSum(balance_vars[i] * BalanceWeight for i in trainer_ids)

    # Strong Constraints

    # Constraint 1: All bookings must be assigned
    prob += pulp.lpSum([assign_vars[(i, j)] for i in trainer_ids for j in booking_ids]) == len(booking_ids)

    # Constraint 2: Each booking can only be assigned to one trainer
    for j in booking_ids:
        prob += pulp.lpSum([assign_vars[(i, j)] for i in trainer_ids]) == 1

    # Constraint 3: No trainer can be assigned more than 1 booking at the same time
    for i in trainer_ids:
        for j in range(len(booking_ids)):
            for k in range(j + 1, len(booking_ids)):
                if(conflict_booking_times[j][k] == 1):
                    prob += pulp.lpSum([assign_vars[(i, booking_ids[j])] + assign_vars[(i, booking_ids[k])]]) <= 1

    # Constraint 4: Each trainer can be assigned at most 20 bookings
    for i in trainer_ids:
        prob += pulp.lpSum([assign_vars[(i, j)] for j in booking_ids]) <= 20

    # Constraint 5: Each trainer must be assigned at least 1 booking per week
    for i in trainer_ids:
        prob += pulp.lpSum([assign_vars[(i, j)] for j in booking_ids]) >= 1

    # Constraint 6: Each trainer can only be assigned to bookings with workouts they can handle
    for i in trainer_ids:
        for j in booking_ids:
            if (i, booking_dict[j]['workout_id']) not in trainer_workout_dict:
                prob += assign_vars[(i, j)] == 0

    # Weak Constraints

    # Ràng buộc mềm 7: Mỗi trainer không thể làm việc vào ngày không có trong WorkSchedule
    for idx, ts in enumerate(trainer_not_available):
        trainer_id = ts['trainerId']
        day = ts['day']
        shift = ts['shift']
        prob += pulp.lpSum([assign_vars[(trainer_id, j)] for j in booking_ids if booking_dict[j]['day'] == day and time_to_shift(booking_dict[j]['start_time']) == shift]) - weakConstraints[idx] <= 0

    # Ràng buộc mềm 8: Mỗi bookeds được ưu tiên phân công cho trainer có trong bookeds(booking_id, trainer_id)
    for idx, booked in enumerate(bookeds):
        trainer_id = booked['trainer_id']
        booking_id = booked['booking_id']
        prob += pulp.lpSum([assign_vars[(trainer_id, j)] for j in booking_ids if j == booking_id]) +  weakConstraints[len(trainer_not_available) + idx] >= 1

    # New Weak Constraint: Minimize difference in number of bookings between trainers within a threshold delta
    for i in trainer_ids:
        prob += pulp.lpSum([assign_vars[(i, j)] for j in booking_ids]) - avg_bookings <= delta
        prob += avg_bookings - pulp.lpSum([assign_vars[(i, j)] for j in booking_ids]) <= delta
    
    # Solve the problem with a time limit
    prob.solve(pulp.PULP_CBC_CMD(timeLimit=300))

    status = pulp.LpStatus[prob.status]
    if status != "Optimal":
        status = False
    else:
        status = True
    
    print("Status:", status)
    # Prepare solution
    solution = []
    for j in booking_ids:
        for i in trainer_ids:
            if pulp.value(assign_vars[(i, j)]) == 1:
                solution.append({"trainer_id": i, "booking_id": j})
    violations = []
    
    # Create schedule map
    schedule_map = {}
    for s in solution:
        trainer_id = s['trainer_id']
        booking_id = s['booking_id']
        if trainer_id not in schedule_map:
            schedule_map[trainer_id] = []
        schedule_map[trainer_id].append(booking_id)

    # Strong constraint checks
    assigned_bookings = set()
    for s in solution:
        if s['booking_id'] in assigned_bookings:
            violations.append(f"Booking {s['booking_id']} được phân cho nhiều huấn luyện viên.")
        assigned_bookings.add(s['booking_id'])

    if len(assigned_bookings) != len(bookings):
        violations.append(f"Không phải tất cả các buổi đặt chỗ đều được phân công. {len(bookings) - len(assigned_bookings)} buổi đặt chỗ bị thiếu.")

    for trainer_id, booking_ids in schedule_map.items():
        for i in range(len(booking_ids)):
            for j in range(i + 1, len(booking_ids)):
                booking_i = booking_dict[booking_ids[i]]
                booking_j = booking_dict[booking_ids[j]]
                if booking_i['day'] == booking_j['day']:
                    start_i = booking_i['start_time']
                    end_i = booking_i['end_time']
                    start_j = booking_j['start_time']
                    end_j = booking_j['end_time']
                    # Kiểm tra nếu thời gian của hai buổi đặt chỗ bị trùng lặp
                    if max(start_i, start_j) < min(end_i, end_j):
                        violations.append(f"Huấn luyện viên {trainer_dict[trainer_id]['name']} được phân công cho hai buổi đặt chỗ chồng chéo {booking_ids[i]} và {booking_ids[j]}.")

    for trainer_id, booking_ids in schedule_map.items():
        if len(booking_ids) > 20:
            violations.append(f"Huấn luyện viên {trainer_dict[trainer_id]['name']} được phân công hơn 20 buổi đặt chỗ.")

    for trainer in trainers:
        trainer_id = trainer['id']
        if trainer_id not in schedule_map or len(schedule_map[trainer_id]) < 1:
            violations.append(f"Huấn luyện viên {trainer['name']} không được phân công buổi đặt chỗ nào.")

    for s in solution:
        trainer_id = s['trainer_id']
        booking_id = s['booking_id']
        workout_id = booking_dict[booking_id]['workout_id']
        if (trainer_id, workout_id) not in trainer_workout_dict:
            violations.append(f"Huấn luyện viên {trainer_dict[trainer_id]['name']} được phân công cho bài tập {workout_dict[workout_id]['name']} mà họ không thể dạy (buổi đặt chỗ {booking_id}).")

    # Weak constraint checks
    for s in solution:
        trainer_id = s['trainer_id']
        booking_id = s['booking_id']
        day = booking_dict[booking_id]['day']
        shift = time_to_shift(booking_dict[booking_id]['start_time'])
        dayOfWeek = converToDayOfWeek(day)
        time = booking_dict[booking_id]['start_time']
        if not can_work(trainer_id, day, shift, trainer_schedule):
            violations.append(f"Huấn luyện viên {trainer_dict[trainer_id]['name']} được phân công cho buổi đặt chỗ {booking_id} vào thứ {dayOfWeek} lúc {time} không có trong lịch làm việc của họ.")

    for booked in bookeds:
        booking_id = booked['booking_id']
        preferred_trainer_id = booked['trainer_id']
        if booking_id in assigned_bookings and preferred_trainer_id not in [s['trainer_id'] for s in solution if s['booking_id'] == booking_id]:
            violations.append(f"Buổi đặt chỗ {booking_id} không được phân công cho huấn luyện viên ưu tiên {trainer_dict[preferred_trainer_id]['name']}.")

    # Print violations
    if violations:
        print("Giải pháp có các vi phạm sau:")
        for v in violations:
            print(v)
    else:
        print("Giải pháp hợp lệ và đáp ứng tất cả các ràng buộc.")


    print("Số lượng buổi đặt chỗ:", len(bookings))
    print("Số lượng huấn luyện viên:", len(trainer_ids))
    print("Số lượng bookeds:", len(bookeds))
    print("Số lượng ràng buộc mềm:", NumOfWeakConstraints)
    print("Số lượng vi phạm:", len(violations))
    print("Số lượng buổi đặt chỗ được phân công:", len(assigned_bookings))
        
    
        
    return {"status": status, "solution": solution, "violations": violations}
