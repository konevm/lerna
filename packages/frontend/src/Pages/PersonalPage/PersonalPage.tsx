import React from "react";
import { Button } from "@mui/material";
import { signOutCustomer } from "../../app/storeSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import Purchases from "../../components/Purchases/Purchases";
import "./PersonalPage.scss";

const PersonalPage: React.FC = () => {
  const {
    customer: { name, lastName, email, address },
  } = useAppSelector((store) => store.data);
  const dispatch = useAppDispatch();

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
