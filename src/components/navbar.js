import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import {
  UseAuth,
  SignInHandler,
  SignOutHandler,
} from "../functions/authentication";
import "../styling/navbar.css";
import { useMsal } from "@azure/msal-react";
import { RiLoginCircleFill } from "react-icons/ri";
import { ProfileIn, ProfileOut } from "./profile";

export function Navigationbar() {
  const { token, admin } = UseAuth();
  const { instance, accounts } = useMsal();


  const navigate = useNavigate();
  return (
    <>
      <a
        class="close-navbar-toggler collapsed"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      ></a>

      <nav class="navbar navbar-expand-lg fixed-top">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item active logo-screen">
            <a class="navbar-brand" href="#" onClick={() => navigate("/")}>
              <img className="navbar-logo" src={require("../navn.png")} />
            </a>
          </li>
          {token ? (
            <li class="nav-item logo-phone ml-2">
                <ProfileIn />
            </li>
          ) : (
            <li class="nav-item logo-phone ml-2">
              <ProfileOut />
            </li>
          )}
        </ul>
        <ul class="navbar-nav mx-auto nav-mid-logo">
          <a onClick={() => navigate("/")} href="#">
          <img
            className="navbar-logo"
            src={require("../symbol.png")}
          />
          </a>
        </ul>

        <button
          class="navbar-toggler mr-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="nav-dropdown">
            <ul class="navbar-nav mr-auto">

              {token ?
                              <>
                              <li class="nav-item active dropdown ml-2">
                                <a
                                  class="nav-link dropdown-toggle"
                                  href="#"
                                  id="dropdownInnlegg"
                                  role="button"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  Innlegg
                                </a>
                                <div class="dropdown-menu mr-2" aria-labelledby="dropdownInnlegg">
                                  <a
                                    class="dropdown-item"
                                    href="#"
                                    onClick={() => navigate("/posts")}
                                  >
                                    Alle innlegg
                                  </a>
                                  <a
                                    class="dropdown-item"
                                    href="#"
                                    onClick={() => navigate("/posts/mine")}
                                  >
                                    Mine innlegg
                                  </a>
                                  <a
                                    class="dropdown-item"
                                    href="#"
                                    onClick={() => navigate("/posts/favourites")}
                                  >
                                    Mine favoritter
                                  </a>
                                </div>
                              </li>
                            </>
                            :
                            "" 
              }
              {token ? (
                <li class="nav-item">
                  <a
                    class="nav-link ml-2"
                    href="#"
                    onClick={() => navigate("/posts/opprett")}
                  >
                    Registrer feedback
                  </a>
                </li>
              ) : (
                ""
              )}

              {admin ? (
                <>
                  <li class="nav-item dropdown ml-2">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Admin
                    </a>
                    <div class="dropdown-menu mr-2" aria-labelledby="navbarDropdown">
                      <a
                        class="dropdown-item"
                        href="#"
                        onClick={() => navigate("/admin")}
                      >
                        Innlegg
                      </a>
                      <a
                        class="dropdown-item"
                        href="#"
                        onClick={() => navigate("/admin/brukere")}
                      >
                        Brukere
                      </a>
                      <a
                        class="dropdown-item"
                        href="#"
                        onClick={() => navigate("/admin/category")}
                      >
                        Kategorier
                      </a>
                    </div>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
          </div>
          <ul class="navbar-nav ml-auto">
            {token ? (
              <li class="nav-item ml-2 login-logout">
                <ProfileIn />
              </li>
            ) : (
              <li class="nav-item ml-2 login-logout">
                <ProfileOut />
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
