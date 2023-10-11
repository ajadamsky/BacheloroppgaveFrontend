import SideNav, {
  Toggle,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { FaCcJcb } from "react-icons/fa";
import {
  MdForum,
  MdOutlineForum,
  MdOutlinePostAdd,
  MdAddComment,
  MdAccessAlarm,
  MdNotifications,
  MdFormatUnderlined,
  MdComment,
  MdFavorite,
} from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import "../styling/sidebar.css";
import React, { createContext, useState, useContext } from "react";
import { UseAuth } from "../functions/authentication";

export default function NavigationSidebar() {
  const navigate = useNavigate();
  const { admin, token } = UseAuth();
  return (
    <SideNav
      className="sidenav"
      onSelect={(selected) => {
        console.log(selected);
        navigate(selected);
      }}
    >
      <Toggle></Toggle>
      <SideNav.Nav defaultSelected="/">
        {token ? (
          <NavItem eventKey="/posts">
            <NavIcon>
              <i>
                <MdForum style={{ fontSize: "25px" }} />
              </i>
            </NavIcon>
            <NavText>Innlegg</NavText>

            <NavItem eventKey="/posts">
              <NavText>Alle Innlegg</NavText>
            </NavItem>

            <NavItem eventKey="/posts/mine">
              <NavText>Mine innlegg</NavText>
            </NavItem>

            <NavItem eventKey="/posts/favourites">
              <NavText>Mine favoritter</NavText>
            </NavItem>
          </NavItem>
        ) : (
          ""
        )}
        {token ? (
          <NavItem eventKey="/posts/opprett">
            <NavIcon>
              <i>
                <MdAddComment style={{ fontSize: "25px" }} />
              </i>
            </NavIcon>
            <NavText>Registrer ny feedback</NavText>
          </NavItem>
        ) : (
          ""
        )}

        {token ? (
          <NavItem eventKey="/notifications">
            <NavIcon>
              <i>
                <MdNotifications style={{ fontSize: "25px" }} />
              </i>
            </NavIcon>
            <NavText>Notifikasjoner</NavText>
          </NavItem>
        ) : (
          ""
        )}
        {admin ? (
          <NavItem eventKey="/admin">
            <NavIcon>
              <i>
                <RiAdminFill style={{ fontSize: "25px" }} />
              </i>
            </NavIcon>
            <NavText>Admin</NavText>

            <NavItem eventKey="/admin">
              <NavText>Innlegg</NavText>
            </NavItem>
            <NavItem eventKey="/admin/brukere">
              <NavText>Brukere</NavText>
            </NavItem>
            <NavItem eventKey="/admin/category">
              <NavText>kategorier</NavText>
            </NavItem>
          </NavItem>
        ) : (
          ""
        )}
      </SideNav.Nav>
    </SideNav>
  );
}
