import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import "./Row.css";
import MovieModal from "./MovieModal";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Row({ isLargeRow, title, id, fetchUrl }) {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";

  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false); // 모달 오픈 확인
  const [movieSelected, setMovieSelected] = useState({}); // 선택한 영화 호출

  useEffect(() => {
    fetchMovieData();
  }, []);

  const handleClick = (movie) => {
    // console.log("tf0", modalOpen);
    setModalOpen(true);
    setMovieSelected(movie);
    // console.log("movie", movie);
    // console.log("tf1", modalOpen);
  };

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    // console.log("request", request);
    setMovies(request.data.results);
  };

  return (
    <section className="row">
      {/* 타이틀 */}
      <h2>{title}</h2>
      {/* <div className="slider"> */}
      {/* <div className="slider__arrow-left">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth - 80;
              // console.log(document.getElementById(id));
            }}
          >
            {"<"}
          </span>
        </div> */}
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        pagination={{ clickable: true }}
        loop
        breakpoints={{
          1378: {
            slidesPerView: 6,
            slidesPerGroup: 6,
          },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {/* 포스터 나열 */}
        <div id={id} className="row__posters">
          {movies.map((movie) => (
            <SwiperSlide>
              <img
                key={movie.id}
                onClick={() => handleClick(movie)}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`${BASE_URL}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                loading="lazy"
                alt={movie.name}
              />
            </SwiperSlide>
          ))}
        </div>
        {/* <div className="slider__arrow-right">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft += window.innerWidth - 80;
            }}
          >
            {">"}
          </span>
        </div> */}
        {/* </div> */}
      </Swiper>
      {/* 모달 */}
      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </section>
  );
}
