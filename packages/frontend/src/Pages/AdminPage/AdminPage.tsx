import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { AppRoutes } from "../../constants/app-routes.constants";
import { signOutCustomer } from "../../app/storeSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import Users from "../../components/Users/Users";
import Purchases from "../../components/Purchases/Purchases";
import "./AdminPage.scss";

const AdminPage: React.FC = () => {
  const { isAdmin } = useAppSelector((store) => store.data);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showUsers, setShowUsers] = useState<boolean>(true);

  useEffect(() => {
    if (!isAdmin) {
      navigate(AppRoutes.MAIN, { replace: true });
    }
  }, [navigate, isAdmin]);

  return (
    <main className="app__admin">
      <div className="admin__navigation">
        <span
          className={showUsers ? "navigation__customers active" : "navigation__customers"}
          onClick={() => setShowUsers(true)}>
          Users
        </span>
        <span
          className={showUsers ? "navigation__purchases" : "navigation__purchases active"}
          onClick={() => setShowUsers(false)}>
          Purchases
        </span>
      </div>
      <section className="admin__data">{showUsers ? <Users /> : <Purchases />}</section>
      <Button
        className="admin__button"
        variant="contained"
        onClick={() => dispatch(signOutCustomer())}>
        Sign Out
      </Button>
    </main>
  );
};

export default AdminPage;
