import React, { useRef } from "react";
import "./MovieModal.css";
import useOnClickOutside from "../../Hooks/useOnClickOutside";
// import axios from "../../api/axios";

export default function MovieModal({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setModalOpen,
}) {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";

  // 모달 추적: 안과 밖 구별
  const ref = useRef();
  // set~ 특성 상 즉시 적용되기 때문에, 함수로 조건 걸어 작동 제한해야
  useOnClickOutside(ref, () => {
    setModalOpen(false);
  });

  // modalOpan 자체는 작동함, backdrop_path에 모든 매개변수가 몰빵되는 문제
  // 그렇다면 매개변수에 중괄호 하나 더 넣어 모든 props에 뿌려준다고 선언해야
  // console.log("backdrop_path", backdrop_path);
  // console.log("title", title);
  // console.log("overview", overview);
  // console.log("name", name);
  // console.log("release_date", release_date);
  // console.log("first_air_date", first_air_date);
  // console.log("vote_average", vote_average);

  return (
    <div className="presentation">
      <div className="wrapper-modal">
        <div className="modal" ref={ref}>
          {/* 창 닫기 */}
          <span className="modal-close" onClick={() => setModalOpen(false)}>
            X
          </span>
          <img
            className="modal__poster-img"
            src={`${BASE_URL}${backdrop_path}`}
            alt="modal__poster-img"
          />
          <div className="modal__content">
            <div className="modal__details">
              <span className="modal__user_perc">100% for you </span>
              {release_date ? release_date : first_air_date}
              <h2 className="modal__title">{title ? title : name}</h2>
              <p className="modal__overview">평점: {vote_average}</p>
              <p className="modal__overview"> {overview}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
