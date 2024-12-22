import { CheckIcon } from "@heroicons/react/24/solid";
import React, { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";

export interface SectionSubcriptionProps {
  className?: string;
}

export interface PricingItem {
  isPopular: boolean;
  name: string;
  pricing: string;
  desc: string;
  per: string;
  features: string[];
}

const pricings: PricingItem[] = [
  {
    isPopular: false,
    name: "Người bắt đầu",
    pricing: "150.000đ",
    per: "/tháng",
    features: ["Tập luyện không giới hạn tại phòng gym", "Hướng dẫn tập cơ bản", "Sử dụng phòng tắm và tủ đồ"],
    desc: ` Literally you probably haven't heard of them jean shorts.`,
  },
  {
    isPopular: true,
    name: "Basic",
    pricing: "300.000đ",
    per: "/tháng",
    features: [
      "Bao gồm mọi tính năng gói BASIC",
      "Được hỗ trợ bởi huấn luyện viên 2 buổi/tháng",
      "Ưu tiên sử dụng máy móc cao cấp",
    ],
    desc: ` Literally you probably haven't heard of them jean shorts.`,
  },
  {
    isPopular: false,
    name: "Premium",
    pricing: "500.000đ",
    per: "/tháng",
    features: [
      "Bao gồm mọi tính năng gói BASIC",
      "Hướng dẫn cá nhân không giới hạn",
      "Lập kế hoạch tập luyện cá nhân",
      "Được huấn luyện viên đến tận nhà",
    ],
    desc: ` Literally you probably haven't heard of them jean shorts.`,
  },
  
];

const SectionSubcription: FC<SectionSubcriptionProps> = ({ className = "" }) => {
  const renderPricingItem = (pricing: PricingItem, index: number) => {
    return (
      <div
        key={index}
        className={`h-full relative px-6 py-8 rounded-3xl border-2 flex flex-col overflow-hidden ${
          pricing.isPopular
            ? "border-primary-500"
            : "border-neutral-100 dark:border-neutral-700"
        }`}
      >
        {pricing.isPopular && (
          <span className="bg-primary-500 text-white px-3 py-1 tracking-widest text-xs absolute right-3 top-3 rounded-full z-10">
            POPULAR
          </span>
        )}
        <div className="mb-8">
          <h3 className="block text-sm uppercase tracking-widest text-neutral-6000 dark:text-neutral-300 mb-2 font-medium">
            {pricing.name}
          </h3>
          <h2 className="text-5xl leading-none flex items-center text-neutral-900 dark:text-neutral-300">
            <span>{pricing.pricing}</span>
            <span className="text-lg ml-1 font-normal text-neutral-500">
              {pricing.per}
            </span>
          </h2>
        </div>
        <nav className="space-y-4 mb-8">
          {pricing.features.map((item, index) => (
            <li className="flex items-center" key={index}>
              <span className="mr-4 inline-flex flex-shrink-0 text-primary-6000">
                <CheckIcon className="w-5 h-5" aria-hidden="true" />
              </span>
              <span className="text-neutral-700 dark:text-neutral-300">
                {item}
              </span>
            </li>
          ))}
        </nav>
        <div className="flex flex-col mt-auto">
          {pricing.isPopular ? (
            <ButtonPrimary>Submit</ButtonPrimary>
          ) : (
            <ButtonSecondary>
              <span className="font-medium">Submit</span>
            </ButtonSecondary>
          )}
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-3">
            {pricing.desc}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-SectionSubcription container pb-24 lg:pb-32 ${className}`}
      data-nc-id="SectionSubcription"
    >
      <header className="text-center max-w-2xl mx-auto my-20">
        <h2 className="flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          <span className="mr-4 text-3xl md:text-4xl leading-none">💎</span>
          Subscription
        </h2>
        <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
          Pricing to fit the needs of any companie size.
        </span>
      </header>
      <section className="text-neutral-600 text-sm md:text-base overflow-hidden">
        <div className="grid lg:grid-cols-3 gap-5 xl:gap-8">
          {pricings.map(renderPricingItem)}
        </div>
      </section>
    </div>
  );
};

export default SectionSubcription;
