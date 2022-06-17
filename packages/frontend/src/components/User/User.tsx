import React from "react";
import { ICustomer } from "../helpers/interfaces";
import "./User.scss";

interface IUserProps {
  user: ICustomer;
}

const User: React.FC<IUserProps> = ({ user }) => {
  const { login, name, lastName, email, address, phone, isAdmin } = user;
  return (
    <div className={isAdmin ? "user admin" : "user"}>
      <h2 className="user__login">{login}</h2>
      <span className="user__name">{name}</span>
      <span className="user__last-name"> {lastName}</span>
      <span className="user__email">Email: {email}</span>
      <span className="user__address">Corresponding address: {address}</span>
      <span className="user__phone">Phone: {phone}</span>
    </div>
  );
};

export default User;
