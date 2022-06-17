import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getAllPurchases } from "../../app/adminSlice";
import Purchase from "../Purchase/Purchase";

const Purchases: React.FC = () => {
  const purchases = useAppSelector((store) => store.admin.purchases);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllPurchases());
  }, [dispatch]);
  return (
    <div className="app__purchases">
      <ul className="purchases__list">
        {purchases.map((purchase) => (
          <Purchase purchase={purchase} key={purchase.id} />
        ))}
      </ul>
    </div>
  );
};

export default Purchases;
