import React, { useEffect, useCallback } from "react";
import Logo from "react-app-images/logo.png";
import User from "react-app-images/user.png";
import { useStoreActions, useStoreState } from "react-app-store";
import env from "../../../config";
import { useParams } from "react-router-dom";
import DEFAULT_IMAGE from "react-app-images/default.png";
import GROUPDEFAULT_IMAGE from "react-app-images/Group-default.png";
import GOOGLEPLAY_IMAGE from "react-app-images/Google-Play.png";
import APPSTORE_IMAGE from "react-app-images/App-Store.png";
import CATEGORIES_IMAGE from "react-app-images/ic_briefcase.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link ,useLocation} from "react-router-dom";
import { t } from "i18next";
import { useTranslation } from 'react-i18next';
import i18next from "i18next";
const Group: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const {  id, '*': lang } = useParams();
  const { pathname } = useLocation();
  const response = useStoreState((state) => state.detail.groupResponse);
  const getGroup = useStoreActions((action) => action.detail.getGroup);
  const getGroupDetail = useCallback(async (payload) => {
    await getGroup({
      url: "common/get-resource-detail",
      payload,
    });
  }, []);

  useEffect(() => {
    getGroupDetail({ _id: id });
    if(lang){
      i18next.changeLanguage(lang);
    }
    else{
      i18next.changeLanguage("en");
    }
  }, []);

  const getImageUrl = (url: string, options: any) => {
    return (
      `${env?.REACT_APP_MEDIA_URL}` +
      options?.type +
      "/" +
      url +
      "?width=" +
      options?.width +
      "&height=" +
      (options?.height || "")
    );
  };

  useEffect(() => {
    if (pathname === "/group/appstore")
      window.location.replace(env.REACT_APP_IOS_URL || "");
    if (pathname === "/group/googleplay") {
      window.location.replace(env?.REACT_APP_ANDROID_URL || "");
    }
  }, [pathname]);

  const groupCategory = (data:string) =>{
    if(data==="professional"){
      return t("professional")
    }
    else if(data==="personal"){
      return t("personal")
    }
    else if(data==="charitable"){
      return t("charitable")
    }

  }
  return (
    <>
      <div className="BGColor"></div>
      <div className="mobileDetailWrapper">
        <div className="headerWrapper">
          <div className="logoHeader">
            <img src={Logo} alt="" />
          </div>
          <div className="googleAppButtonsOUter picnicEventDownloadButton">
            <Link to="/group/googleplay">
              <img src={GOOGLEPLAY_IMAGE} alt="" />
            </Link>
            <Link to="/group/appstore">
              <img src={APPSTORE_IMAGE} alt="" />
            </Link>
          </div>
        </div>

        <p className="topThankyouText mb-4">
        {t("header_content_group")}
        </p>
        
        <div className="mobileContent">
          <div className="picnicEventSlider singleImgPreview">
            <div className="carousel-item">
              {response?.image ? (
                <>
                  <LazyLoadImage
                    wrapperClassName={"overideImageCircle"}
                    effect={response?.image ? "blur" : undefined}
                    style={{
                      position: "absolute",
                    }}
                    src={
                      response?.image
                        ? getImageUrl(response?.image, {
                            type: "groups",
                            width: 800,
                          })
                        : ""
                    }
                    className="d-block w-100 blurImage"
                    alt="..."
                  />

                  <LazyLoadImage
                    wrapperClassName={"overideGroupImageCircle"}
                    placeholderSrc={GROUPDEFAULT_IMAGE}
                    effect={response?.image ? "blur" : undefined}
                    src={
                      response?.image
                        ? getImageUrl(response?.image, {
                            type: "groups",
                            width: 800,
                          })
                        : GROUPDEFAULT_IMAGE
                    }
                    className="d-block w-100"
                    alt="..."
                  />
                </>
              ) : (
                <img src={GROUPDEFAULT_IMAGE} alt="" />
              )}
            </div>
          </div>

          <div className="p-4">
            <div className="eventTitle">
              <section className="eventSection flex-grow-1">
                <span className="eventSectionSpan">
                  {response?.name || "N/A"}
                </span>
                <label className="eventSectionLabel">{response?.city}</label>
              </section>
              <section className="eventSection">
                <div className="groupTag">
                  <img
                    src={CATEGORIES_IMAGE}
                    width="20"
                    className="me-2 img-fluid"
                    alt=""
                  />
                  {groupCategory(response?.category) || "N/A"}
                </div>
                {/* <label className="eventSectionLabel eventPrice">
                  FM frequency: {response?.radio_frequency || "N/A"}
                </label> */}
              </section>
            </div>
           
            <p className="simpleText mt-0 mb-4">
              {response?.short_description}
            </p>
            <div className="row mt-2">
              <div className="col-sm-4">
                <div className="hostedBy">
                  <label className="hostedByLabel subtitle">{t("leader")}</label>
                  {/* <label className="hostedByLabel subtitle">{t("footer.group_admin")}</label> */}
                  <div>
                    <LazyLoadImage
                      wrapperClassName={"overideImageCircle"}
                      placeholderSrc={DEFAULT_IMAGE}
                      effect={response?.image ? "blur" : undefined}
                      src={
                        response?.creator_of_group?.image
                          ? getImageUrl(response?.creator_of_group?.image, {
                              type: "users",
                              width: 60,
                            })
                          : User
                      }
                      alt="..."
                      width={60}
                      className="hostedByLabelImg"
                    />
                    <span className="hostedBySpan">
                      {response?.creator_of_group?.first_name
                        ? `${response?.creator_of_group?.first_name} ${response?.creator_of_group?.last_name}`
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Group;
