import React, { useEffect } from "react";
import Logo from "react-app-images/logo.png";
import GOOGLEPLAY_IMAGE from "react-app-images/Google-Play.png";
import APPSTORE_IMAGE from "react-app-images/App-Store.png";
import { Link, useLocation, useParams } from "react-router-dom";
import env from "../../../config";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import APPSTORE_ES_IMAGE from "react-app-images/App-store-es.png";
import GOOGLEPLAY_ES_IMAGE from "react-app-images/Google-play-es.png";

const Download: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  console.log("useParams()", useParams());
  const { "*": lang } = useParams();
  console.log("lang", lang);
  useEffect(() => {
    if (pathname === "/download/appstore")
      window.location.replace(env.REACT_APP_IOS_URL || "");
    if (pathname === "/download/googleplay") {
      window.location.replace(env?.REACT_APP_ANDROID_URL || "");
    }
  }, [pathname]);
  useEffect(() => {
    if (lang) {
      i18next.changeLanguage(lang);
      localStorage.removeItem("i18nextLng");
    } else {
      i18next.changeLanguage("en");
      localStorage.removeItem("i18nextLng");
    }
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
          <div className="downloadAppTitle mb-4">
            {t("download_picnic_app")}
          </div>
          <p className="simpleText mt-0 mb-4 joinCommunitiesText">
            {t("download_component.content")}
            {/* Join local communities, chat with other members,
            <br /> Get out and be active. */}
          </p>

          <div className="googleAppButtonsOUter">
            <Link to="/download/googleplay">
              <img
                src={
                  lang === "en" || lang === ""
                    ? GOOGLEPLAY_IMAGE
                    : GOOGLEPLAY_ES_IMAGE
                }
                alt=""
              />
            </Link>
            <Link to="/download/appstore">
              <img
                src={
                  lang === "en" || lang === ""
                    ? APPSTORE_IMAGE
                    : APPSTORE_ES_IMAGE
                }
                alt=""
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Download;
