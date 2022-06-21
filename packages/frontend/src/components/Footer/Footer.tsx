import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { AppRoutes } from "../../constants/app-routes.constants";
import { signOutCustomer } from "../../app/storeSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import "./Footer.scss";

const Footer: React.FC = () => {
  const { payments, isAuthorized } = useAppSelector((state) => state.data);
  const dispatch = useAppDispatch();

  return (
    <footer className="app__footer">
      <div className="footer__menu">
        <Link to={AppRoutes.MAIN} className="footer__menu-item">
          About us
        </Link>
        <Link to={AppRoutes.PRODUCTS} className="footer__menu-item">
          Products
        </Link>
        {isAuthorized ? (
          <span className="footer__menu-item" onClick={() => dispatch(signOutCustomer())}>
            Sing out
          </span>
        ) : (
          <Link to={AppRoutes.AUTH} className="footer__menu-item">
            Sign in
          </Link>
        )}
      </div>
      <ul className="footer__socials">
        <li className="socials__icon">
          <FacebookIcon />
        </li>
        <li className="socials__icon">
          <InstagramIcon />
        </li>
      </ul>
      <span className="footer__tm">© 2021 Kal Hans Naturals.</span>
      <ul className="footer__payments">
        {payments.map((item) => (
          <li className="payments__icon" key={item} style={{ backgroundImage: `url(${item})` }} />
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
