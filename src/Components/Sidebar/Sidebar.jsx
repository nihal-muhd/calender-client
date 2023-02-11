import React, { useEffect } from "react";
import {
  BsFillCalendar2WeekFill,
  BsHouseFill,
  BsBoxArrowRight,
} from "react-icons/bs";
import "./Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/UserSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const LogOut = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  },[]);
  return (
    <div className="Sidebar">
      <div className="Header-Sidebar">Calender</div>
      <hr></hr>
      <div className="List-Sidebar">
        <div className="Nav-List">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <BsHouseFill className="Icons-Nav" />
            Home
          </Link>
        </div>
        <div className="Nav-List">
          <Link
            to="/summary"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <BsFillCalendar2WeekFill className="Icons-Nav" />
            Summary
          </Link>
        </div>
        <div className="Nav-List" onClick={LogOut}>
          <BsBoxArrowRight className="Icons-Nav" />
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
