import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assests/imgs/logo.png";
import avatar from "../../assests/imgs/userDefAvatar.jpg";
const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="topLine">
        <img
          className="logo"
          src={logo}
          alt="logoImg"
          onClick={() => navigate("/")}
        />
        <img
          className="avatar"
          src={avatar}
          alt="avtrImg"
          onClick={() => navigate("/profile")}
        />
        {/* <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem icon={<AddIcon />} command="⌘T">
             Profile
            </MenuItem>
            <MenuItem icon={<ExternalLinkIcon />} command="⌘N">
              Messages
            </MenuItem>
            <MenuItem icon={<RepeatIcon />} command="⌘⇧N">
              Settings
            </MenuItem>
            <MenuItem icon={<EditIcon />} command="⌘O">
              Logout
            </MenuItem>
          </MenuList>
        </Menu> */}
      </div>
      <div className="nav">
        {/* 
        home
        about 
        research
        events
        community
        search bar
        */}
      </div>
    </>
  );
};

export default Navbar;
