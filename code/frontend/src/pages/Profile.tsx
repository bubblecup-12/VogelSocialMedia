import "./profile.css";
import "../components/bio.css";
import "./loginAndSignUpPage.css";
import "../styles/sizes.css";
import "../styles/fonts.css";
import QuiltedImageList from "../components/QuiltedImageList";
import {
  StyledEngineProvider,
  Divider,
} from "@mui/material";
import ChangeAvatarDialog from "../components/ChangeAvatarDialog";
import Bio from "../components/Bio";
import RotkehlchenButton from "../components/ButtonRotkehlchen";

function Profile() {
  const username = "Username12345678"; /* Get username from database */
  const ownAccount = true;

  return (
    <StyledEngineProvider injectFirst>
      <div className="profile-display">
        <div className="user-info blue-background">
            <ChangeAvatarDialog ownAccount={ownAccount} username={username} />
          <Bio ownAccount={ownAccount} />
          <Divider variant="middle" className="divider" />
          {/* TODO: Change data to data from Database */}
          <div className="numeral-data body-bold">
            <div className="data">
              <span aria-label="current-post-number">50</span>
              <span className="data-label title-h1">Posts</span>
            </div>
            <div className="data">
              <span aria-label="current-follower-number">100</span>
              <span className="data-label title-h1">Followers</span>
            </div>
            <div className="data">
              <span aria-label="current-following-number">50</span>
              <span className="data-label title-h1">Following</span>
            </div>
          </div>
          <RotkehlchenButton style="primary" label="Follow" type="button" />
        </div>
        <QuiltedImageList />
      </div>
    </StyledEngineProvider>
  );
}

export default Profile;
