import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import requests from "../api/requests";
import styled from "styled-components";
import "./Banner.css";

export default function Nav() {
  const [movie, setMovie] = useState([]); // 영화 정보 취득
  const [isClicked, setIsClicked] = useState(false); // play 누르면 비디오 전환

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // 상영 중인 영화 정보 취득
    const request = await axios.get(requests.fetchNowPlaying);
    // console.log(request.data);

    // 그 중 id 하나 무작위 고르기: 총 갯수 구한 뒤 랜덤 번호 뽑기
    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;

    // 상세 정보와 비디오 가져오기, 내부의 data 항목만 추출
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });
    // console.log(movieDetail);
    setMovie(movieDetail);
  };

  //   텍스트가 n자 이상이면 생략
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  if (!isClicked) {
    return (
      <header
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className="banner__contents">
          {/* 타이틀 */}
          <h1 className="banner__title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          {/* 버튼 */}
          <div className="banner__buttons">
            <button
              className="banner__button play"
              onClick={() => setIsClicked(true)}
            >
              Play
            </button>
            <button className="banner__button info">
              <div className="space">More Infomation</div>
            </button>
          </div>
          {/* 설명 */}
          <h1 className="banner__description">
            {truncate(movie?.overview, 100)}
          </h1>
        </div>
        <div className="banner--fadeBottom"></div>
      </header>
    );
  } else {
    return (
      <Container>
        <HomeContainer>
          <Iframe
            width="640"
            height="360"
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}
            ?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
            frameborder="0"
            allow="autoplay; fullscreen"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></Iframe>
        </HomeContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
