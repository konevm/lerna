import React, { useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import { ICustomer } from "../helpers/interfaces";
import UserModification from "../UserModification/UserModification";
import "./User.scss";

interface IUserProps {
  user: ICustomer;
  setDeletedCustomerId: React.Dispatch<React.SetStateAction<string>>;
}

const User: React.FC<IUserProps> = ({ user, setDeletedCustomerId }) => {
  const { login, name, lastName, email, address, phone, isAdmin } = user;
  const [isChangeOpened, setChangeOpened] = useState<boolean>(false);

  return (
    <div className={isAdmin ? "user admin" : "user"}>
      <h2 className="user__login">
        {login} <CreateIcon onClick={() => setChangeOpened(!isChangeOpened)} />
      </h2>
      <span className="user__name">{name}</span>
      <span className="user__last-name"> {lastName}</span>
      <span className="user__email">Email: {email}</span>
      <span className="user__address">Corresponding address: {address}</span>
      <span className="user__phone">Phone: {phone}</span>
      {isChangeOpened && (
        <UserModification
          user={user}
          setChangeOpened={setChangeOpened}
          setDeletedCustomerId={setDeletedCustomerId}
        />
      )}
    </div>
  );
};

export default User;
