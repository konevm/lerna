import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { changeModalVisibility } from "../../app/storeSlice";

import "./ModalsWrapper.scss";

interface IModalProps {
  children: React.ReactNode;
}

const ModalsWrapper: React.FC<IModalProps> = ({ children }) => {
  const isShown = useAppSelector((store) => store.data.showModal);
  const dispatch = useAppDispatch();
  if (!isShown) return null;
  return (
    <div
      className="app__modal"
      onClick={(e) => {
        if ((e.target as HTMLElement) === document.getElementsByClassName("app__modal")[0]) {
          dispatch(changeModalVisibility());
        }
      }}>
      {children}
    </div>
  );
};
export default ModalsWrapper;
