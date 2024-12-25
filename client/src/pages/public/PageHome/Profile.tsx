import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "states";
import { selectAuthUserInfo } from "states/slices/auth";
import { getMe } from "api/user"; // Lấy thông tin user qua API
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import Heading2 from "components/Heading/Heading2";
import Label from "components/Label/Label";
import LoadingIcon from "shared/LoadingIcon/LoadingIcon";

const PageProfile: React.FC = () => {
  const navigate = useNavigate();

  // Thay đổi theme
  useEffect(() => {
    const $body = document.querySelector("body");
    if (!$body) return;
    $body.classList.add("theme-purple-blueGrey");
    return () => {
      $body.classList.remove("theme-purple-blueGrey");
    };
  }, []);

  const user = useAppSelector(selectAuthUserInfo);

  // Gọi API lấy thông tin profile qua react-query
  const { data: profileData, isLoading, isError } = useQuery("profileData", getMe);

  const renderProfile = () => {
    if (!profileData) {
      return <Label className="z-999 relative">Không có dữ liệu</Label>;
    }

    const { name, avatar, email, phone, birth_date, address, facebook } = profileData.data;

    return (
      <div className="bg-glass p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          {/* Avatar */}
          <img
            src={avatar || "https://via.placeholder.com/150"}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-2 border-gray-300 dark:border-gray-600 mr-6"
          />

          {/* Thông tin cơ bản */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              {name || "N/A"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{email}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{phone}</p>
          </div>
        </div>

        {/* Thông tin chi tiết */}
        <div className="mt-6 space-y-2 text-gray-700 dark:text-gray-200">
          <p>
            <strong>Ngày sinh:</strong> {birth_date ? new Date(birth_date).toLocaleDateString() : "N/A"}
          </p>
          <p>
            <strong>Địa chỉ:</strong> {address || "N/A"}
          </p>
          {facebook && (
            <p>
              <strong>Facebook:</strong>{" "}
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {facebook}
              </a>
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="nc-PageHome3 relative overflow-hidden">
      {/* Glassmorphism background */}
      <BgGlassmorphism />

      {/* Hero Section */}
      <div className="container px-1 sm:px-4 mb-24"></div>

      {/* Profile Section */}
      <div className="container relative space-y-24 mb-24">
        <div className="flex justify-between items-center">
          <div>
            <Heading2
              heading="Thông tin cá nhân"
              subHeading={
                <span className="block text-neutral-500 dark:text-neutral-400 mt-3"></span>
              }
            />
          </div>
        </div>
        {isLoading ? (
          <LoadingIcon size={30} />
        ) : isError ? (
          <Label className="z-999 relative">Có lỗi xảy ra, vui lòng thử lại sau.</Label>
        ) : (
          renderProfile()
        )}
      </div>
    </div>
  );
};

export default PageProfile;
