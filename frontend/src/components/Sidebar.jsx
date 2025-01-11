import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoPricetag, IoHome, IoLogOut, IoAdd} from "react-icons/io5";

import { useDispatch, useSelector} from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import axios from "axios";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getTicketsCount = async (u) => {
      const response = await axios.get("http://localhost:5000/tickets");
      const num = user
        ? response.data.filter((ticket) => ticket.assigned === u.role).length
        : response.data.length;
        setCount(num);
    };

    getTicketsCount(user);
  }, [user]); 

  const logout= () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  }
  return (
    <div>
      <aside className="menu pl-2 has-shadow">
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/dashboard"}> <IoHome/> Dashboard</NavLink>
          </li>
          {/* <li>
            <NavLink to={"/products"}><IoPricetag/> Products</NavLink>
          </li> */}
          <li>
            <NavLink to={"/tickets/open"}><IoPricetag/> Tickets 
              <span className="tag is-primary"> {count} </span>
            </NavLink>
          </li>
        </ul>
        {user && user.role === "admin" ? (
          <>
            <p className="menu-label">Admin</p>
            <ul className="menu-list">
              <li>
                <NavLink to={"/users"}><IoPerson/> Users</NavLink>
              </li>
            </ul>
          </>
        ): (
          <>
          {/* <p className="menu-label">{user.name}</p> */}
          <ul className="menu-list">
            <li>
              <NavLink to={"/tickets/add"}><IoAdd/> Add New</NavLink>
            </li>
          </ul>
        </>
        )}
        
        <p className="menu-label">Settings</p>
        <ul className="menu-list">
          <li>
            <button onClick={logout} className="button is-white"><IoLogOut/> Logout</button>
          </li>
        </ul>
      </aside>
    </div>
  );
};
