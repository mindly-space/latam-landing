import React, { useState, useContext, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { type CarouselApi } from "@/components/ui/carousel";
import { MobileReviewsCarousel } from "./reviews/MobileReviewsCarousel";
import { DesktopReviewsCarousel } from "./reviews/DesktopReviewsCarousel";
import { reviewsData } from "./reviews/reviewsData";
import { LanguageContext } from "@/contexts/LanguageContext";
import { getRandomReviews } from "@/utils/getRandomReviews";
import { Review } from "@/types/reviews";

export const UserReviews = () => {
  const isMobile = useIsMobile();
  const isMobileMode = useRef(false);
  const { isEnglish } = useContext(LanguageContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [displayedReviews, setDisplayedReviews] = useState<Review[]>([]);

  // Convert reviews from object to array and get random reviews based on view
  const allReviews = Object.values(reviewsData);

  useEffect(() => {
    if (isMobile !== isMobileMode.current || !displayedReviews.length) {
      const count = isMobile ? 4 : 12;
      const res = getRandomReviews(allReviews, count);
      isMobileMode.current = isMobile;
      setDisplayedReviews(res);
    }
  }, [isMobile, allReviews, displayedReviews]);

  return (
    <section
      key={displayedReviews.length}
      id="reviews"
      className="w-full max-w-[1328px] mt-24 max-md:max-w-full max-md:mt-10 max-md:px-0"
    >
      <h2 className="text-center text-[48px] leading-[120%] font-dela text-[#212121] max-md:text-[36px] max-md:px-4">
        {isEnglish
          ? "What people in therapy with Mindly are saying"
          : "Reseñas de usuarios de Mindly"}
      </h2>

      {isMobile ? (
        <MobileReviewsCarousel
          reviews={displayedReviews}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          carouselApi={carouselApi}
          setCarouselApi={setCarouselApi}
        />
      ) : (
        <DesktopReviewsCarousel
          reviews={displayedReviews}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          carouselApi={carouselApi}
          setCarouselApi={setCarouselApi}
        />
      )}
    </section>
  );
};
