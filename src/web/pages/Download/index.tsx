import React from "react";
import Logo from "react-app-images/logo.png";
import GoolePay from "react-app-images/Google-Play.png";
import AppStore from "react-app-images/App-Store.png";

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
            Join local communities, chat with other members,<br/> Get out and be
            active.
          </p>

          <div className="googleAppButtonsOUter">
            <a href="#">
              <img src={GoolePay} alt="" />
            </a>
            <a href="#">
              <img src={AppStore} alt="" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default Download;
