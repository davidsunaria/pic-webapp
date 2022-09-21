import React,{useEffect} from "react";
import Logo from "react-app-images/logo.png";
import GOOGLEPLAY_IMAGE from "react-app-images/Google-Play.png";
import APPSTORE_IMAGE from "react-app-images/App-Store.png";
import { Link ,useLocation} from "react-router-dom";
import env from "../../../config";
import { useTranslation } from 'react-i18next';
import i18next from "i18next";

const Download: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === "/download/appstore")
      window.location.replace(env.REACT_APP_IOS_URL || "");
    if (pathname === "/download/googleplay") {
      window.location.replace(env?.REACT_APP_ANDROID_URL || "");
    }
  }, [pathname]);
  useEffect(() => {
    //i18next.changeLanguage('en');
   // localStorage.removeItem("i18nextLng");
  }, []);

  



  return (
    <>
      <div className="BGColor"></div>
      <div className="mobileDetailWrapper">
        <div className="logoHeader text-center">
          <img src={Logo} alt="" />
        </div>
{/* <>
    <button  className="btn btn-primary" onClick={() => i18next.changeLanguage('en')}>En</button>
    <button className="btn btn-primary" onClick={() => i18next.changeLanguage('es')}>Es</button>
</> */}
        <div className="mobileContent  downloadAppOuter">
          <div className="downloadAppTitle mb-4">{t('download_picnic_app')}</div>
          <p className="simpleText mt-0 mb-4 joinCommunitiesText">
            Join local communities, chat with other members,
            <br /> Get out and be active.
          </p>

          <div className="googleAppButtonsOUter">
          <Link to="/download/googleplay">
              <img src={GOOGLEPLAY_IMAGE} alt="" />
            </Link>
            <Link to="/download/appstore">
              <img src={APPSTORE_IMAGE} alt="" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Download;
