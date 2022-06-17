import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getAllCustomers } from "../../app/adminSlice";
import User from "../User/User";
import "./Users.scss";

const Users: React.FC = () => {
  const users = useAppSelector((store) => store.admin.customers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCustomers());
  }, [dispatch]);
  return (
    <div className="app__customers">
      <ul className="customers__list">
        {users.length > 0 && users.map((user) => <User user={user} key={user.id} />)}
      </ul>
    </div>
  );
};

export default Users;
