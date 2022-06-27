import React, { useEffect } from "react";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getPurchases } from "../../app/trunks";
import ModalsWrapper from "../../components/ModalWrapper/ModalsWrapper";
import Purchase from "../Purchase/Purchase";

const Purchases: React.FC = () => {
  const { purchases, errorMessage } = useAppSelector((store) => store.admin);
  const {
    isAdmin,
    customer: { id },
  } = useAppSelector((store) => store.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!purchases.length && !errorMessage && id) {
      dispatch(getPurchases(id));
    }
  }, [dispatch, purchases, isAdmin, id, errorMessage]);

  return (
    <div className="app__purchases">
      <ul className="purchases__list">
        {!errorMessage ? (
          purchases.map((purchase) => <Purchase purchase={purchase} key={purchase.id} />)
        ) : (
          <>{errorMessage}</>
        )}
      </ul>
      <ModalsWrapper>
        <AutorenewIcon className="wait" data-testid="wait" />
      </ModalsWrapper>
    </div>
  );
};

export default Purchases;
