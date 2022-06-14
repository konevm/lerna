import React from "react";
import { Link } from "react-router-dom";
import EcoProducts from "../../components/EcoProducts/EcoProducts";
import Glowing from "../../components/Glowing/Glowing";
import InstagramCarousel from "../../components/InstagramCarousel/InstagramCarousel";
import Magazines from "../../components/Magazines/Magazines";
import "./MainPage.scss";

const MainPage: React.FC = () => {
  return (
    <div className="app__main-page">
      <div className="mainPage__banner">
        <Link to="new" className="banner__ad">
          Shop NEW Summer Collection!
        </Link>
      </div>
      <div className="mainPage__about">
        <h2 className="about__label">We Make Feeling Comfortable in Your Own Skin Natural</h2>
        <p className="about__info">
          Kal Hans symbolizes transformation. Let's celebrate what makes you unique with our 100%
          all Natural, Vegan, Luxury skincare line,
          <br /> getting you one step closer to being your best self.
        </p>
      </div>
      <EcoProducts />
      <InstagramCarousel />
      <Magazines />
      <Glowing />
    </div>
  );
};
export default MainPage;
