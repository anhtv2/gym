import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "states";
import { fetchTrainer, selectTrainerStatus } from "states/slices/trainer";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionGridFilterCard from "./SectionGridFilterCard"; 
// import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories"; 
// import { TaxonomyType } from "assets/data/types"; // <-- Bỏ import DEMO_CATS

function PageTrainer() {
  // Thêm state để lưu trang hiện tại (page), mặc định 1
  const [page, setPage] = useState(1);

  // CUSTOM THEME STYLE
  useEffect(() => {
    const $body = document.querySelector("body");
    if (!$body) return;
    $body.classList.add("theme-purple-blueGrey");
    return () => {
      $body.classList.remove("theme-purple-blueGrey");
    };
  }, []);

  const dispatch = useAppDispatch();
  const trainerStatus = useAppSelector(selectTrainerStatus);

  // Khi trang load hoặc khi page thay đổi, gọi fetchTrainer
  useEffect(() => {
    // Ví dụ: fetchTrainer nhận tham số page
    dispatch(fetchTrainer(page));
  }, [dispatch, page]);

  return (
    <div className="nc-PageTrainer relative overflow-hidden">
      {/* GLASSMORPHISM */}
      <BgGlassmorphism />

      {/* SECTION HERO */}
      <div className="container px-1 sm:px-4 mb-24 ">
        {/* ... Nếu bạn muốn Hero hay Banner, đặt ở đây */}
      </div>

      <div className="container relative space-y-24 mb-24 ">
        {/* SECTION LISTING */}
        <SectionGridFilterCard
          className="pb-24 lg:pb-28"
          // Ví dụ truyền page & setPage xuống nếu SectionGridFilterCard quản lý nút phân trang
          page={page}
          onPageChange={(newPage) => setPage(newPage)}
        />

        {/* BỎ PHẦN “Top huấn luyện viên nổi bật” */}
        {/* Xoá luôn <div className="relative py-16"> ... <SectionSliderNewCategories ... /></div> */}
      </div>
    </div>
  );
}

export default PageTrainer;
