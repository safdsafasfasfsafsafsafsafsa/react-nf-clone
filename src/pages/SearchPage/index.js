import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "../../Hooks/useDebounce";
import axios from "../../api/axios";
import "./SearchPage.css";

export default function SearchPage() {
  const BASE_URL = "https://image.tmdb.org/t/p/w500";

  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]); // 검색 결과

  // console.log("useLocation()", useLocation());
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();
  const searchTerm = query.get("q"); // q 아래 문장 가져오기
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 0.5초 지연 전달
  // console.log("searchTerm", searchTerm);

  // 검색창 바뀔 때마다 실시간으로 갱신
  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  // 검색 요청 전달(성인물 제외)
  const fetchSearchMovie = async (searchTerm) => {
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      console.log("request.data.results", request.data.results);
      setSearchResults(request.data.results);
    } catch (error) {
      console.log("error");
    }
  };

  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <section className="search-container">
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl = BASE_URL + movie.backdrop_path;

            return (
              <div className="movie" key={movie.id}>
                <div
                  className="movie__column-poster"
                  onClick={() => navigate(`/${movie.id}`)}
                >
                  <img
                    src={movieImageUrl}
                    alt="movieImageUrl"
                    className="movie__poster"
                  />
                </div>
              </div>
            );
          }
        })}
      </section>
    ) : (
      <section className="no-results">
        <div className="no-results__text">
          <p>찾고자 하는 검색어: {debouncedSearchTerm}에 맞는 영화 없음</p>
        </div>
      </section>
    );
  };

  return renderSearchResults();
}
