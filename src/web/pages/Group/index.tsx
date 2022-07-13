import React, { useEffect, useCallback } from "react";
import Logo from "react-app-images/logo.png";
import User from "react-app-images/user.png";
import { useStoreActions, useStoreState } from "react-app-store";
import env from "../../../config";
import { useParams } from "react-router-dom";
import DEFAULT_IMAGE from "react-app-images/default.png";
import LOADER_IMAGE from "react-app-images/gif-loader.gif";
import { LazyLoadImage } from "react-lazy-load-image-component";
const Group: React.FC = (): JSX.Element => {
  const { id } = useParams();
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

  return (
    <>
      <div className="BGColor"></div>
      <div className="mobileDetailWrapper">
        <div className="logoHeader">
          <img src={Logo} alt="" />
        </div>
        <div className="mobileContent">
          <div className="picnicEventSlider singleImgPreview">
            <div className="carousel-item">
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
                wrapperClassName={"overideImageCircle"}
                placeholderSrc={LOADER_IMAGE}
               
                effect={response?.image ? "blur" : undefined}
                src={
                  response?.image
                    ? getImageUrl(response?.image, {
                        type: "groups",
                        width: 800,
                      })
                    : DEFAULT_IMAGE
                }
                className="d-block w-100"
                alt="..."
              />

              {/* <img
                style={{
                  position: "absolute",
                }}
                src={
                  response?.image
                    ? getImageUrl(response?.image, {
                        type: "groups",
                        width: 800,
                      })
                    : DEFAULT_IMAGE
                }
                className="d-block w-100 blurImage"
                alt="..."
              /> */}

              {/* <img
                src={
                  response?.image
                    ? getImageUrl(response?.image, {
                        type: "groups",
                        width: 800,
                      })
                    : DEFAULT_IMAGE
                }
                className="d-block w-100"
                alt="..."
              /> */}
            </div>
          </div>

          <div className="p-4">
            <div className="eventTitle">
              <section className="eventSection flex-grow-1">
                <span className="eventSectionSpan">{response?.name}</span>
                <label className="eventSectionLabel">{response?.city}</label>
              </section>
              <section className="eventSection">
                <div className="groupTag">{response?.category}</div>
                <label className="eventSectionLabel eventPrice">
                  FM frequency: {response?.radio_frequency}
                </label>
              </section>
            </div>

            <p className="simpleText mt-0 mb-4">
              {response?.short_description}
            </p>

            <div className="row mt-2">
              <div className="col-sm-4">
                <div className="hostedBy">
                  <label className="hostedByLabel subtitle">Group Admin</label>
                  <div>
                    <img
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
                        : ""}
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
