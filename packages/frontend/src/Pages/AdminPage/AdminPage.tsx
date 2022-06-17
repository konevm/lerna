import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import Users from "../../components/Users/Users";
import Purchases from "../../components/Purchases/Purchases";
import { AppRoutes } from "../../constants/app-routes.constants";
import "./AdminPage.scss";

const AdminPage: React.FC = () => {
  const { isAdmin } = useAppSelector((store) => store.data);
  const [showUsers, setShowUsers] = useState<boolean>(true);
  if (!isAdmin) return <Navigate to={AppRoutes.MAIN} replace />;
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
    </main>
  );
};

export default AdminPage;
