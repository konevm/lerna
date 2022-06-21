import React from "react";
import { useAppSelector } from "../../app/hooks";
import { IUser } from "../helpers/interfaces";
import "./InstagramElement.scss";

interface IInstagramElementProps {
  user: IUser;
}

const InstagramElement: React.FC<IInstagramElementProps> = ({ user }) => {
  const { id, email, first_name: name, last_name: lastName, avatar } = user;
  const posts = useAppSelector((store) => store.data.posts);

  return (
    <div className="carousel__element-wrapper" style={{ backgroundImage: `url(${avatar})` }}>
      <div className="carousel__element">
        {posts.length && <p> {posts.find((item) => item.id === id)?.body}</p>}
        <span className="carouselElement__name">
          {email}
          <br />
          {name} {lastName}
        </span>
      </div>
    </div>
  );
};

export default InstagramElement;
