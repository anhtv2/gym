import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Input from "shared/Input/Input";
import { getTrainerBookingDetail } from "api/booking";
import FiveStartIconForRate from "components/FiveStartIconForRate/FiveStartIconForRate";
import { FC } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Badge from "shared/Badge/Badge";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import LoadingIcon from "shared/LoadingIcon/LoadingIcon";
import NcImage from "shared/NcImage/NcImage";
import convertMinuteToHour from "utils/converMinuteToHour";

export interface ScheduleDetailPageProps {
  className?: string;
}

/**
 * Code FE cho HUẤN LUYỆN VIÊN xem chi tiết lịch hẹn
 * API trả về:
 * {
 *   "statusCode":200,
 *   "data":{
 *     "id":157,"trainer_id":12,"member_id":40,"workout_id":8,"service_id":null,
 *     "participants":3,"payment_method":0,"note":"...","date":"2025-01-07",
 *     "start_time":"05:42:34","end_time":"06:12:34","status":1,
 *     "workout": {...},
 *     "member": {...}
 *   },
 *   "meta":[]
 * }
 */
const ScheduleDetailPage: FC<ScheduleDetailPageProps> = ({ className = "" }) => {
  const { id } = useParams();

  // Lấy chi tiết booking theo id
  const {
    data: scheduleData,
    isLoading,
    isError,
  } = useQuery("scheduleDetail", () => getTrainerBookingDetail(Number(id) || 0));

  // render nội dung (trainer xem)
  const renderContent = () => {
    if (!scheduleData?.data) return null;

    const {
      id: bookingId,
      note,
      participants,
      date,
      start_time,
      end_time,
      status,
      member,
      workout,
    } = scheduleData.data;

    const memberUser = member?.user;
    const workoutName = workout?.name;
    const workoutThumbnail = workout?.thumbnail;
    const workoutDuration = workout?.duration; // 30 => 30 phút
    const memberName = memberUser?.name;
    const memberAvatar = memberUser?.avatar;

    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        {/* Tiêu đề */}
        <h2 className="text-3xl lg:text-4xl font-semibold">
          Chi tiết lịch dạy của bạn
        </h2>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* Thông tin BÀI TẬP */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Thông tin bài tập</h3>
          <div className="flex flex-col sm:flex-row sm:items-center">
            {/* Hình thumbnail workout */}
            <div className="flex-shrink-0 w-full sm:w-40">
              <div className="aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
                <NcImage src={workoutThumbnail} />
              </div>
            </div>

            {/* Tên bài tập, thời lượng, note ... */}
            <div className="pt-5 sm:pb-5 sm:px-5 space-y-3">
              <div>
                <Badge name={"Bài tập"} color="green" />
                <span className="text-base sm:text-lg font-medium mt-1 block">
                  {workoutName}
                </span>
              </div>
              <span className="block text-sm text-neutral-500 dark:text-neutral-400">
                Thời gian tập: {convertMinuteToHour(workoutDuration || 30)}
              </span>
              <div className="w-10 border-b border-neutral-200 dark:border-neutral-700"></div>

              {/* Ghi chú, participants */}
              {note && (
                <p className="text-base sm:text-lg font-medium mt-1 block">
                  Ghi chú: {note}
                </p>
              )}
              <p className="text-base sm:text-lg font-medium mt-1 block">
                Số người tham gia: {participants}
              </p>
            </div>
          </div>
        </div>

        {/* Thông tin ngày giờ */}
        <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700">
          <div className="flex-1 p-5 flex space-x-4">
            <svg
              className="w-8 h-8 text-neutral-300 dark:text-neutral-6000"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.33333 8.16667V3.5M18.6667 8.16667V3.5M8.16667 12.8333H19.8333M5.83333 24.5H22.1667C23.4553 24.5 24.5 23.4553 24.5 22.1667V8.16667C24.5 6.878 23.4553 5.83333 22.1667 5.83333H5.83333C4.54467 5.83333 3.5 6.878 3.5 8.16667V22.1667C3.5 23.4553 4.54467 24.5 5.83333 24.5Z"
                stroke="#D1D5DB"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex flex-col">
              <span className="text-sm text-neutral-400">Ngày</span>
              <span className="mt-1.5 text-lg font-semibold">
                {date} : {start_time} - {end_time}
              </span>
            </div>
          </div>
        </div>

        {/* Thông tin HỘI VIÊN */}
        <div className="space-y-6 mt-10">
          <h3 className="text-2xl font-semibold">Thông tin hội viên</h3>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-shrink-0 w-full sm:w-40">
              <div className="aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
                <NcImage src={memberAvatar} />
              </div>
            </div>
            <div className="pt-5 sm:pb-5 sm:px-5 space-y-3">
              <div>
                <Badge name={"Hội viên"} color="green" />
                <span className="text-base sm:text-lg font-medium mt-1 block">
                  {memberName}
                </span>
              </div>
              <span className="block text-sm text-neutral-500 dark:text-neutral-400">
                Địa chỉ: {memberUser?.address}
              </span>
              <span className="block text-sm text-neutral-500 dark:text-neutral-400">
                Số điện thoại: {memberUser?.phone}
              </span>
            </div>
          </div>
        </div>

        {/* 
          Logic cũ: status = 1 => hiển thị nút Đánh giá
          --> BỎ HOÀN TOÀN (HLV không cần đánh giá)
        */}

        {/* 
          Logic: status = 0 và còn >= 7 ngày => cho phép HỦY
          Nếu HLV cần hủy, bạn có thể giữ hoặc bỏ 
        */}
        {status === 0 &&
          scheduleData.data.date &&
          new Date(scheduleData.data.date).getTime() - new Date().getTime() >=
            7 * 24 * 60 * 60 * 1000 && (
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <ButtonPrimary fontSize="text-sm sm:text-base lg:text-lg font-medium">
                Hủy lịch
              </ButtonPrimary>
            </div>
          )}
      </div>
    );
  };

  return (
    <div className={`nc-PayPage ${className}`} data-nc-id="PayPage">
      <main className="container mt-11 mb-24 lg:mb-32">
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <LoadingIcon size={30} />
          ) : isError ? (
            <div>Có lỗi xảy ra, vui lòng thử lại sau</div>
          ) : (
            renderContent()
          )}
        </div>
      </main>
    </div>
  );
};

export default ScheduleDetailPage;
