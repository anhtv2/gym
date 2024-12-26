import { getDetailTrainer } from "api/trainer";
import { FC, useState } from "react"; // <-- import useState
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Avatar from "shared/Avatar/Avatar";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import SocialsList from "shared/SocialsList/SocialsList";
import CommentListing from "components/CommentListing/CommentListing";
import StartRating from "components/StartRating/StartRating";
import StayCard from "components/StayCard/StayCard";

export interface AuthorPageProps {
  className?: string;
}

const AuthorPage: FC<AuthorPageProps> = ({ className = "" }) => {
  const { id } = useParams();

  // Tạo state limit để điều khiển số bài tập hiển thị
  const [limit, setLimit] = useState(4);

  // Gọi API trainerDetail
  const {
    data,
    isLoading,
    isError
  } = useQuery(["trainerDetail", id], () => getDetailTrainer(Number(id) || 0));

  // `trainerDetail` là object: { id, staff_id, experience, specialty, staff, workouts, ... }
  const trainerDetail = data?.data;

  // Sidebar ...
  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col items-center text-center sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-7 px-0 sm:p-6 xl:p-8">
        <Avatar
          hasChecked
          hasCheckedClass="w-6 h-6 -top-0.5 right-2"
          sizeClass="w-28 h-28"
          imgUrl={trainerDetail?.staff?.user?.avatar}
        />

        <div className="space-y-3 text-center flex flex-col items-center">
          <h2 className="text-3xl font-semibold">
            {trainerDetail?.staff?.user?.name}
          </h2>
          <StartRating className="!text-base" />
        </div>

        <p className="text-neutral-500 dark:text-neutral-400">
          {trainerDetail?.specialty}
        </p>

        <SocialsList
          className="!space-x-3"
          itemClass="flex items-center justify-center w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xl"
        />

        <div className="border-b border-neutral-200 dark:border-neutral-700 w-14"></div>

        <div className="space-y-4">
          {/* Address */}
          <div className="flex items-center space-x-4">
            {/* Icon cho Address - ví dụ icon MapPin */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 10c1.105 0 2-.672 2-1.5S13.105 7 12 7s-2 .672-2 1.5  .895 1.5 2 1.5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10c0 7.168-7.5 10.5-7.5 10.5S4.5 17.168 4.5 10a7.5 7.5 0 1115 0z"
              />
            </svg>
            <span className="text-neutral-6000 dark:text-neutral-300">
              {trainerDetail?.staff?.user?.address}
            </span>
          </div>

          {/* Phone */}
          <div className="flex items-center space-x-4">
            {/* Icon Phone */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 4.5l2.1-.525a2.25 2.25 0 012.482 1.278l1.123 2.245a2.25 2.25 0 01-.513 2.559l-1.034 1.034a16.041 16.041 0 006.096 6.096l1.034-1.034a2.25 2.25 0 012.559-.513l2.245 1.123a2.25 2.25 0 011.278 2.482l-.525 2.1A2.25 2.25 0 0117.25 21h-.75A15.75 15.75 0 01.75 5.25v-.75a2.25 2.25 0 011.5-2.136z"
              />
            </svg>
            <span className="text-neutral-6000 dark:text-neutral-300">
              {trainerDetail?.staff?.user?.phone}
            </span>
          </div>

          {/* Birthdate */}
          <div className="flex items-center space-x-4">
            {/* Icon CalendarDays */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V5.25A2.25 2.25 0 0110.25 3h3.5
                A2.25 2.25 0 0116 5.25V7m-8 0h8M4.5
                9.75h15M7.5 16.5h.008v.008H7.5v-.008zm3
                0h.008v.008h-.008v-.008zm3
                0h.008v.008h-.008v-.008z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 7.5h16.5A1.5 1.5 0 0121.75
                9v9.75a2.25 2.25 0 01-2.25
                2.25H4.5a2.25 2.25 0 01-2.25
                -2.25V9a1.5 1.5 0 011.5-1.5z"
              />
            </svg>
            <span className="text-neutral-6000 dark:text-neutral-300">
              {trainerDetail?.staff?.user?.birth_date}
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Section hiển thị danh sách workouts
  const renderSection1 = () => {
    const workouts = trainerDetail?.workouts || [];

    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">
            Danh sách bài tập khả dụng
          </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            +{workouts.length} bài tập
          </span>
        </div>

        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* Grid hiển thị các workouts */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
          {/* Lấy ra đến limit bài tập */}
          {workouts.slice(0, limit).map((workout) => (
            <StayCard
              key={workout.id}
              data={{
                id: workout.id,
                name: workout.name,
                thumbnail: workout.thumbnail,
                duration: workout.duration,
              }}
            />
          ))}
        </div>

        {/* Nút Show me more */}
        {limit < workouts.length && (
          <div className="flex mt-11 justify-center items-center">
            <ButtonSecondary onClick={() => setLimit(limit + 4)}>
              Show me more
            </ButtonSecondary>
          </div>
        )}
      </div>
    );
  };

  // Section 2: reviews ...
  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        <h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          <CommentListing hasListingTitle className="pb-8" />
          <CommentListing hasListingTitle className="py-8" />
          <CommentListing hasListingTitle className="py-8" />
          <CommentListing hasListingTitle className="py-8" />
          <div className="pt-8">
            <ButtonSecondary>View more 20 reviews</ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <div className="text-center py-10">Đang tải dữ liệu ...</div>;
  }

  if (isError) {
    return <div className="text-center py-10">Lỗi tải dữ liệu! Vui lòng thử lại.</div>;
  }

  return (
    <div className={`nc-AuthorPage ${className}`} data-nc-id="AuthorPage">
      <main className="container mt-12 mb-24 lg:mb-32 flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="block flex-grow mb-24 lg:mb-0">
          <div className="lg:sticky lg:top-24">{renderSidebar()}</div>
        </div>

        {/* Main content */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0">
          {renderSection1()}
          {renderSection2()}
        </div>
      </main>
    </div>
  );
};

export default AuthorPage;
