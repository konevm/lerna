import Carousel from "nuka-carousel";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUsers } from "../../app/trunks";
import InstagramElement from "../InstagramElement/InstagramElement";
import "./InstagramCarousel.scss";

const InstagramCarousel: React.FC = () => {
  const dispatch = useAppDispatch();
  const usersList = useAppSelector((store) => store.data.instagramUsers);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="mainPage__instagram">
      <h3 className="instagram__label">@kalhansnaturals</h3>
      <span className="instagram__text">
        Follow us to share snaps of you 💕 and your glowing skin ✨🌿💧 & learn more about fun
        events, contests 🎁 and giveaways.
      </span>
      {usersList.length && (
        <Carousel
          className="carousel__frame"
          wrapAround
          autoplay
          slidesToShow={Math.floor(window.innerWidth / 360)}
          cellSpacing={50}
          autoplayInterval={3000}
          speed={1000}
          withoutControls
          pauseOnHover>
          {usersList.map((item, index) => (
            <InstagramElement user={item} key={index} />
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default InstagramCarousel;
