import React, { useEffect, useState } from "react";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { changeModalVisibility } from "../../app/storeSlice";
import { getAllCustomers, asyncDeleteUser } from "../../app/trunks";
import ModalsWrapper from "../ModalWrapper/ModalsWrapper";
import User from "../User/User";
import "./UsersList.scss";

const UsersList: React.FC = () => {
  const { customers: users, errorMessage } = useAppSelector((store) => store.admin);
  const [deletedCustomerId, setDeletedCustomerId] = useState<string>("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!users.length) dispatch(getAllCustomers());
    if (deletedCustomerId) dispatch(changeModalVisibility());
  }, [dispatch, users, deletedCustomerId]);
  return (
    <div className="app__customers">
      <ul className="customers__list">
        {users.length > 0 &&
          users.map((user) => (
            <User user={user} key={user.id} setDeletedCustomerId={setDeletedCustomerId} />
          ))}
      </ul>
      <ModalsWrapper>
        {errorMessage || deletedCustomerId ? (
          <>{errorMessage}</>
        ) : (
          <AutorenewIcon className="wait" data-testid="wait" />
        )}
        {deletedCustomerId && (
          <>
            Are you sure?{" "}
            <button
              onClick={() => {
                dispatch(changeModalVisibility());
                setDeletedCustomerId("");
              }}>
              No
            </button>{" "}
            <button onClick={() => dispatch(asyncDeleteUser(deletedCustomerId))}>Yes</button>
          </>
        )}
      </ModalsWrapper>
    </div>
  );
};

export default UsersList;
