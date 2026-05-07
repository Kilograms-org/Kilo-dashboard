import { Link } from "react-router-dom";
import fallbackLogo from "../src/assets/killo-removebg-preview.png";
import { FaRegUser } from "react-icons/fa";
import Button from "@mui/material/Button";
import { MdMenuOpen } from "react-icons/md";
import { MdMenu } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import Searchbox from "./searchbox";
import { MdOutlineLightMode } from "react-icons/md";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Tooltip from "@mui/material/Tooltip";

import React from "react";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import axios from "axios";

import { Mycontext } from "../src/App";
import { useContext } from "react";

function Header() {
  const { hidesidebar, sethidesidebar, username, setusername } =
    useContext(Mycontext);
  const [logoUrl, setLogoUrl] = useState(fallbackLogo);

  useEffect(() => {
    axios.get("http://localhost:3000/admin/logo")
      .then(res => {
        if (res.data.logoUrl) {
          setLogoUrl(res.data.logoUrl);
        }
      })
      .catch(() => {
        setLogoUrl(fallbackLogo);
      });
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function clicktohidesidebar() {
    sethidesidebar(!hidesidebar);
  }

  function handlelogout() {
    setusername("admin");
    localStorage.setItem("adminname", "admin");
  }
  return (
    <header>
      <div className=" container  ">
        <div className="headercontainer">
          <div className=" logocontainer">
            <Link to="/dashboard">
              {/* <img src={logo} alt="" className="logo" /> */}
              <img src={logoUrl} style={{ width: "180px" }} alt="Kilograms Logo" />
            </Link>
            <Button className="circle" onClick={() => clicktohidesidebar()}>
              <MdMenuOpen />
            </Button>
          </div>
          <div className="search">{/* <Searchbox /> */}</div>

          <div className="adminheader">
            <div className="adminloginheader">
              <Box>
                <Tooltip>
                  <Button
                    className="circle"
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <CiUser />
                  </Button>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose}>
                  <Button style={{ fontSize: "14px", color: "black" }}>
                    <Link
                      to="/"
                      onClick={() => handlelogout()}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      SignOut
                    </Link>
                  </Button>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Button style={{ fontSize: "14px", color: "black" }}>
                    Rest Password
                  </Button>
                </MenuItem>
              </Menu>

              <span
                style={{
                  fontSize: "17px",
                  marginLeft: "10px",
                  cursor: "pointer",
                }}
              >
                {username}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
