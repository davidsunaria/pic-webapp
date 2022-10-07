import React from "react";
import GOOGLEPLAY_ES_IMAGE from "react-app-images/Google-play-es.png";
import APPSTORE_ES_IMAGE from "react-app-images/App-store-es.png";
import GOOGLEPLAY_IMAGE from "react-app-images/Google-Play.png";
import APPSTORE_IMAGE from "react-app-images/App-Store.png";
interface IDownLoadButton {
  lang: string;
  buttonType: string;
}
const DownLoadButton = (props: IDownLoadButton) => {
  const { lang, buttonType } = props;
  const renderButton = () => {
    if (lang === "en" && buttonType === "googlePlay") {
      return <img src={GOOGLEPLAY_IMAGE} alt="" />;
    } else if (lang === "es" && buttonType === "googlePlay") {
      return <img src={GOOGLEPLAY_ES_IMAGE} alt="" />;
    } else if (lang === "en" && buttonType === "appStore") {
      return <img src={APPSTORE_IMAGE} alt="" />;
    } else if (lang === "es" && buttonType === "appStore") {
      return <img src={APPSTORE_ES_IMAGE} alt="" />;
    } else if (lang === "" && buttonType === "appStore") {
      return <img src={APPSTORE_IMAGE} alt="" />;
    } else if (lang === "" && buttonType === "googlePlay") {
      return <img src={GOOGLEPLAY_IMAGE} alt="" />;
    }
  };

  return <>{renderButton()}</>;
};

export default DownLoadButton;
