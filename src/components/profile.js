import React from "react";
import { useMsal } from "@azure/msal-react";
import {
  UseAuth,
  SignOutHandler,
  SignInHandler,
} from "../functions/authentication";
import { useNavigate } from "react-router-dom";
import "./../styling/navbar.css"
import defaultImg from "../default.jpg"

export function ProfileIn() {
  const { token, admin, userName, onLogin, onLogout, profilePicture } = UseAuth();
  const { instance, accounts } = useMsal();
  const navigate = useNavigate()
  return (
    <>
      <div class="btn-grou dropleft mr-2">
        <img
          class="logout-img dropdown-toggle"
          src={profilePicture ?? defaultImg}
          alt="Mitt Bildet"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        ></img>
        <div class="dropdown-menu dropdown-menu-right">
          <span class="dropdown-item-text">{userName}</span>
          <hr></hr>
          <a
            class="dropdown-item"
            href="#"
            onClick={() => navigate("/profile")}
          >
            Rediger Profil
          </a>
          <a
            class="dropdown-item"
            href="#"
            onClick={() => SignOutHandler(instance, onLogout)}
          >
            Logg ut
          </a>
        </div>
      </div>
    </>
  );
}

export function ProfileOut() {
  const { token, admin, userName, onLogin, onLogout } = UseAuth();
  const { instance, accounts } = useMsal();
  return (
    <>
      <button
        class="azure-btn btn btn-sm btn-outline-secondary mr-2"
        type="button"
        onClick={() => SignInHandler(instance, onLogin)}
      >
        Logg inn med Azure AD
      </button>
    </>
  );
}
