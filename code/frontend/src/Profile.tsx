import "./profile.css";
import "./loginAndSignUpPage.css";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import QuiltedImageList from "./QuiltedImageList";
import { deepOrange } from "@mui/material/colors";

function Profile() {
  return (
    <div className="profile-display">
      <div className="user-info">
        <div className="user">
          <Avatar
            alt="Username"
            src="./assets/images/OwlSignUp.png"
            sx={{ width: 56, height: 56, bgcolor: deepOrange[500] }}
          >
            U
          </Avatar>
          <span className="profile-username body-m">Username</span>
          {/* Bio */}
        </div>
        <span className="post-number">50 Posts</span>
      </div>
        <QuiltedImageList />
      <div className="image-list">
      </div>
    </div>
  );
}

export default Profile;
