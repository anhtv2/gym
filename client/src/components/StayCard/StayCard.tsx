import React, { FC } from "react";
import GallerySlider from "components/GallerySlider/GallerySlider";
import { Link } from "react-router-dom";
import BtnLikeIcon from "components/BtnLikeIcon/BtnLikeIcon";
import StartRating from "components/StartRating/StartRating";

// Định nghĩa kiểu dữ liệu cho 1 bài tập (workout)
export interface WorkoutDataType {
  id: number;
  name: string;
  thumbnail: string;
  duration: number;
  // Nếu bạn muốn thêm rating hoặc description, có thể thêm ở đây
  // rating?: number;
  // description?: string;
}

export interface StayCardProps {
  className?: string;
  data?: WorkoutDataType; 
}

const StayCard: FC<StayCardProps> = ({ className = "", data }) => {
  // Nếu không có data, return null để tránh lỗi
  if (!data) {
    return null;
  }
  
  // Lấy các trường cần hiển thị
  const { id, name, thumbnail, duration } = data;

  // Tạo 1 mảng ảnh (GallerySlider nhận mảng)
  // Nếu GallerySlider của bạn yêu cầu { src: string }[] thì chuyển thành [{ src: thumbnail }]
  const galleryImgs = [thumbnail];

  // Hoặc link sang trang chi tiết - tuỳ ý
  const href = "#"; 

  // Slider 1 ảnh + nút Like
  const renderSliderGallery = () => {
    return (
      <div className="relative w-full">
        <GallerySlider
          uniqueID={`StayCard_${id}`}
          ratioClass="aspect-w-4 aspect-h-3"
          galleryImgs={galleryImgs}
          href={href}
        />
        {/* Nếu muốn nút Like, tuỳ chỉnh isLiked */}
        <BtnLikeIcon isLiked={false} className="absolute right-3 top-3 z-[1]" />
      </div>
    );
  };

  // Hiển thị tên bài tập, duration, rating (nếu cần)
  const renderContent = () => {
    return (
      <div className="p-4 space-y-4">
        {/* Tên bài tập */}
        <h2 className="text-lg font-semibold line-clamp-1">{name}</h2>

        {/* Duration, rating */}
        <div className="flex items-center justify-between">
          <span className="font-medium">{duration} phút</span>
          {/* Rating demo 5 sao + 99 reviews */}
          <StartRating point={5} reviewCount={99} />
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-StayCard group relative bg-white dark:bg-neutral-900 
      border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden 
      hover:shadow-xl transition-shadow ${className}`}
    >
      {renderSliderGallery()}
      <Link to={href}>{renderContent()}</Link>
    </div>
  );
};

export default StayCard;
