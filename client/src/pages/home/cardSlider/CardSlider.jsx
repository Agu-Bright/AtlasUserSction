import React from "react";
import { Box } from "@mui/material";
import { Navigation, A11y } from "swiper";
import { Swiper as Slider, SwiperSlide } from "swiper/react";
import "swiper/css";

// Import Swiper styles
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import CardComponent from "../../../components/cardComponent/card";

function CardSlider({ data }) {
  return (
    <Box className="slider-container">
      <Slider
        className="main-slide-container"
        style={{
          padding: "15px 5px",
          margin: "5px",
        }}
        breakpoints={{
          // when window width is >= 320px
          400: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          445: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          600: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          // when window width is >= 640px
          700: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1000: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
        // install Swiper modules
        modules={[Navigation, A11y]}
        navigation
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {data.map((item) => (
          <SwiperSlide className="card-slide">
            <CardComponent data={item} />
          </SwiperSlide>
        ))}
      </Slider>
    </Box>
  );
}

export default CardSlider;
