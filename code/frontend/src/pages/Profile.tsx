import "./profile.css";
import "../components/bio.css";
import "./loginAndSignUpPage.css";
import "../styles/sizes.css";
import "../styles/fonts.css";
import QuiltedImageList from "../components/QuiltedImageList";
import { StyledEngineProvider, Divider } from "@mui/material";
import ChangeAvatarDialog from "../components/ChangeAvatarDialog";
import Bio from "../components/Bio";
import RotkehlchenButton from "../components/ButtonRotkehlchen";
import api from "../api/axios";
import { useAuth } from "../api/Auth";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserProfile } from "../types/UserProfile";

function Profile() {
  const { user } = useAuth();
  const { username } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState<UserProfile | null>({
    id: "",
    username: "",
    bio: "",
    profilePictureUrl: null,
    followers: 0,
    following: 0,
    posts: 0,
  });

  const userProfile = async () => {
    try {
      const response = await api.get(`/profile/get/${username}`);
      setUserData(response.data.data);
      return;
    } catch (error) {
      navigate("/", { replace: true }); /* replace to 404 page */
      console.error("Error fetching user profile:", error);
      return null;
    }
  };

  const ownAccount = username === user?.username;
  useEffect(() => {
    userProfile();
  }, []);

  const setBio = (bio: string) => {
    setUserData((prevData) => {
      if (prevData) {
        return { ...prevData, bio: bio };
      }
      return prevData;
    });
  };
  function handleFollowUser() {
    // TODO: implement follow user functionality
    if (user) {
      api.post(`follower/follow/${username}`)
    }
  }

  return (
    <StyledEngineProvider injectFirst>
      <div className="profile-display">
        <div className="user-info blue-background">
          <ChangeAvatarDialog
            ownAccount={ownAccount}
            username={userData?.username || ""}
            setUserData={setUserData}
            imageUrl={userData?.profilePictureUrl}
          />
          <Bio
            ownAccount={ownAccount}
            bioText={userData?.bio}
            setBio={setBio}
          />
          <Divider variant="middle" className="divider" />
          {/* TODO: Change data to data from Database */}
          <div className="numeral-data body-bold">
            <div className="data">
              <span aria-label="current-post-number">{userData?.posts}</span>
              <span className="data-label title-h1">Posts</span>
            </div>
            <div className="data">
              <span aria-label="current-follower-number">
                {userData?.followers}
              </span>
              <span className="data-label title-h1">Followers</span>
            </div>
            <div className="data">
              <span aria-label="current-following-number">
                {userData?.following}
              </span>
              <span className="data-label title-h1">Following</span>
            </div>
          </div>
          {!ownAccount && (
            <RotkehlchenButton style="primary" label="Follow" type="button" onClick={handleFollowUser} />
          )}
        </div>
        {userData && <QuiltedImageList user={userData} />}
      </div>
    </StyledEngineProvider>
  );
}

export default Profile;
