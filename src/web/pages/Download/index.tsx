import React from "react";
import Logo from "react-app-images/logo.png";
import GOOGLEPLAY_IMAGE from "react-app-images/Google-Play.png";
import APPSTORE_IMAGE from "react-app-images/App-Store.png";
import { Link } from "react-router-dom";

const Download: React.FC = (): JSX.Element => {
  return (
    <>
      <div className="BGColor"></div>
      <div className="mobileDetailWrapper">
        <div className="logoHeader text-center">
          <img src={Logo} alt="" />
        </div>
        <div className="mobileContent  downloadAppOuter">
          <div className="downloadAppTitle mb-4">Download Picnic App</div>

          <p className="simpleText mt-0 mb-4 joinCommunitiesText">
            Join local communities, chat with other members,
            <br /> Get out and be active.
          </p>

          <div className="googleAppButtonsOUter">
          <Link to={process.env.REACT_APP_ANDROID_URL || "#"}>
              <img src={GOOGLEPLAY_IMAGE} alt="" />
            </Link>
            <Link to={process.env.REACT_APP_IOS_URL || "#"}>
              <img src={APPSTORE_IMAGE} alt="" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Download;
