import json
import random
from collections import defaultdict
import numpy as np

# Function to write JSON data to a file
def write_data_to_json(data, file_path):
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=4)

# Function to generate random trainer workouts
def generate_trainer_workouts(trainers, workouts):
    count = 1
    trainer_workout = []
    for t in trainers:
        for w in workouts:
            if random.randint(0, 1) == 1:
                trainer_workout.append({"id": count, "trainerId": t['id'], "workoutId": w['id']})
                count += 1
    return trainer_workout

# Function to generate random trainer schedules
def generate_trainer_schedule(trainers):
    trainer_schedule = []
    count = 1
    for t in trainers:
        for day in range(7):
            for shift in range(3):
                if random.randint(0, 1) == 1:
                    trainer_schedule.append({"id": count, "trainerId": t['id'], "day": day, "shift": shift})
                    count += 1
    return trainer_schedule

def time_to_minutes(t):
    parts = t.split(':')
    h = int(parts[0])
    m = int(parts[1])
    return h * 60 + m

def time_to_shift(time):
    time = time_to_minutes(time)

    if time_to_minutes('05:30') <= time < time_to_minutes('12:00'):
        return 0
    elif time_to_minutes('12:00') <= time < time_to_minutes('17:00'):
        return 1
    elif time_to_minutes('17:00') <= time < time_to_minutes('22:00'):
        return 2

def can_work(trainer_id, day, shift, trainer_schedule):
    for ws in trainer_schedule:
        if ws['trainerId'] == trainer_id and ws['day'] == day and ws['shift'] == shift:
            return True
    return False

def find_booking_groups(bookings):
    booking_groups = defaultdict(list)
    for booking in bookings:
        key = (booking['member_id'], booking['day'])
        booking_groups[key].append(booking['id'])
    return list(booking_groups.values())

def convert_to_unavailable_shifts(working_shifts, days_in_week=7, shifts_per_day=3):
    """
    Chuyển đổi từ mảng ca làm việc thành mảng ca không thể làm việc.

    Parameters:
    working_shifts (list): Danh sách các ca làm việc.
    days_in_week (int): Số ngày trong tuần. Mặc định là 7.
    shifts_per_day (int): Số ca trong mỗi ngày. Mặc định là 3.

    Returns:
    list: Danh sách các ca không thể làm việc.
    """
    # Khởi tạo mảng rỗng cho các ca không thể làm việc
    unavailable_shifts = []

    # Tìm tất cả các ca mà huấn luyện viên không làm việc
    for trainer_id in set(shift["trainerId"] for shift in working_shifts):
        # Tạo tập hợp các ca làm việc của huấn luyện viên hiện tại
        trainer_working_shifts = {(shift["day"], shift["shift"]) for shift in working_shifts if shift["trainerId"] == trainer_id}
        
        # Tạo danh sách các ca không thể làm việc
        for day in range(days_in_week):
            for shift in range(shifts_per_day):
                if (day, shift) not in trainer_working_shifts:
                    unavailable_shifts.append({
                        "trainerId": trainer_id,
                        "day": day,
                        "shift": shift
                    })

    # Thêm id cho từng ca không thể làm việc
    for idx, shift in enumerate(unavailable_shifts, start=1):
        shift["id"] = idx

    return unavailable_shifts

def converToDayOfWeek(day):
    if day == 0:
        return "Chủ nhật"
    return f"Thứ {day + 1}"

def create_conflict_matrix(bookings):
    """
    Tạo ma trận xung đột thời gian giữa các buổi đặt chỗ.

    Args:
    bookings (list): Danh sách các buổi đặt chỗ, mỗi buổi là một dict có các key 'id', 'day', 'start_time', 'end_time'.

    Returns:
    np.array: Ma trận xung đột thời gian.
    """
    n = len(bookings)
    conflict_matrix = np.zeros((n, n), dtype=int)

    for i in range(n):
        for j in range(i+1, n):
            if bookings[i]['day'] == bookings[j]['day']:
                start_i = bookings[i]['start_time']
                end_i = bookings[i]['end_time']
                start_j = bookings[j]['start_time']
                end_j = bookings[j]['end_time']
                # Kiểm tra nếu thời gian của hai buổi đặt chỗ bị trùng lặp
                if max(start_i, start_j) < min(end_i, end_j):
                    conflict_matrix[i][j] = 1
                    conflict_matrix[j][i] = 1

    return conflict_matrix

def count_bookings_in_day_shift(bookings, day, shift):
    """
    Đếm số lượng booking trong một ngày và shift cụ thể.

    Args:
    bookings (list): Danh sách các booking.
    day (int): Ngày cần kiểm tra.
    shift (int): Shift cần kiểm tra.
    time_to_shift (function): Hàm chuyển đổi thời gian thành shift.

    Returns:
    int: Số lượng booking trong ngày và shift cụ thể.
    """
    count = 0
    for booking in bookings:
        if booking['day'] == day and time_to_shift(booking['start_time']) == shift:
            count += 1
    return count