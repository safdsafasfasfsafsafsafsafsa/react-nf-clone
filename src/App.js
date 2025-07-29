import "./App.css";
import Nav from "./components/Nav";
import Banner from "./components/Banner";
import Row from "./components/Row";
import Footer from "./components/Footer";
import requests from "./api/requests";
import MainPage from "./pages/MainPage/index";
import DetailPage from "./pages/DetailPage/index";
import SearchPage from "./pages/SearchPage/index";
import { Outlet, Routes, Route } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />}></Route>
          <Route path=":movieId" element={<DetailPage />}></Route>
          <Route path="search" element={<SearchPage />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
