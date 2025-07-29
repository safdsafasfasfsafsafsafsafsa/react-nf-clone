import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Nav.css";

export default function Nav() {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  //   이벤트 체크
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  // 검색 읽고 창 이동
  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  return (
    <nav className={`nav ${show && "nav__black"}`}>
      {/* 로고 */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1597px-Netflix_2015_logo.svg.png?20190206123158"
        alt="Netflix logo"
        className="nav__logo"
        onClick={() => window.location.reload()}
      />
      {/* 검색 */}
      <input
        value={searchValue}
        onChange={handleChange}
        type="text"
        className="nav__input"
        placeholder="영화 검색"
      />
      {/* 유저 */}
      <img
        src="https://cdn3.iconfinder.com/data/icons/essential-rounded/64/Rounded-31-512.png"
        alt="user logged"
        className="nav__avatar"
      />
    </nav>
  );
}
