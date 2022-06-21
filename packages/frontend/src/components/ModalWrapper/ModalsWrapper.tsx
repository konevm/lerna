import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { changeModalVisibility } from "../../app/storeSlice";
import { changeAdminModalVisibility } from "../../app/adminSlice";
import "./ModalsWrapper.scss";

interface IModalProps {
  children: React.ReactNode;
}

const ModalsWrapper: React.FC<IModalProps> = ({ children }) => {
  const isShownStore = useAppSelector((store) => store.data.showModal);
  const isShownAdmin = useAppSelector((store) => store.admin.isModalOpened);

  const dispatch = useAppDispatch();
  if (!isShownStore && !isShownAdmin) return null;
  return (
    <div
      className="app__modal"
      onClick={(e) => {
        if ((e.target as HTMLElement) === document.getElementsByClassName("app__modal")[0]) {
          if (isShownAdmin) dispatch(changeAdminModalVisibility());
          if (isShownStore) dispatch(changeModalVisibility());
        }
      }}>
      {children}
    </div>
  );
};
export default ModalsWrapper;
