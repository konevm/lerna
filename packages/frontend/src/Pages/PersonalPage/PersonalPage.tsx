import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { AppRoutes } from "../../constants/app-routes.constants";
import { signOutCustomer } from "../../app/storeSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import Purchases from "../../components/Purchases/Purchases";
import "./PersonalPage.scss";

const PersonalPage: React.FC = () => {
  const {
    customer: { name, lastName, email, address },
    isAuthorized,
  } = useAppSelector((store) => store.data);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized) navigate(AppRoutes.MAIN, { replace: true });
  }, [navigate, isAuthorized]);

  return (
    <div className="app__personal">
      <h2 className="personal__title">
        Hello, dear {name} {lastName}
      </h2>
      <p className="personal__email">Email: {email}</p>
      <p className="personal__email">Post address: {address}</p>
      <Purchases />
      <Button
        className="personal__button"
        variant="contained"
        onClick={() => dispatch(signOutCustomer())}>
        Sign Out
      </Button>
    </div>
  );
};

export default PersonalPage;
