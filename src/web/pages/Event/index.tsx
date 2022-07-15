import React, { useEffect, useState, useCallback, useRef } from "react";
import Logo from "react-app-images/logo.png";
import Calender from "react-app-images/calendar.png";
import Location from "react-app-images/location.png";
import Clock from "react-app-images/clock.png";
import Ticket from "react-app-images/Ticket.png";
import User from "react-app-images/user.png";
import DEFAULT_IMAGE from "react-app-images/default.png";
import PLAY_IMAGE from "react-app-images/play.png";
import GOOGLEPLAY_IMAGE from "react-app-images/Google-Play.png";
import APPSTORE_IMAGE from "react-app-images/App-Store.png";
import { useStoreActions, useStoreState } from "react-app-store";
import { LazyLoadImage } from "react-lazy-load-image-component";
import moment from "moment";
import { Link, useLocation } from "react-router-dom";
import env from "../../../config";
import { useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Modal from "react-bootstrap/Modal";

const Event: React.FC = (): JSX.Element => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const response = useStoreState((state) => state.detail.eventResponse);
  const getEvent = useStoreActions((action) => action.detail.getEvent);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [videoAddress, setVideoAddress] = useState<any>("");

  //  const [show, setShow] = useState(false);

  const handleClose = () => setIsVideoPlaying(false);
  const handleShow = () => setIsVideoPlaying(true);

  const getEventDetail = useCallback(async (payload) => {
    await getEvent({
      url: "common/get-resource-detail",
      payload,
    });
  }, []);

  useEffect(() => {
    getEventDetail({ _id: id });
  }, [id]);

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

  const minValue = (data: any) => {
    let min = data.reduce(function (res: any, obj: any) {
      return obj.amount < res.amount ? obj : res;
    });
    return min;
  };

  let coverImage = {
    name: response?.image,
  };
  let eventImages: any = response?.event_images?.length
    ? response?.image
      ? [coverImage, ...response?.event_images]
      : [...response?.event_images]
    : response?.image
    ? [coverImage]
    : false;
  // Carousel Item Data

  const getVideoAddress = (src: any) => {
    setVideoAddress(src);
  };

  const carouselItemData =
    eventImages?.length &&
    eventImages?.map((item: any, i: number) => {
      return (
        <Carousel.Item key={i}>
          {item?.type === "video" ? (
            <>
              <img
                src={PLAY_IMAGE}
                alt=""
                className="playIcon"
                onClick={() => {
                  setIsVideoPlaying(true);
                  getVideoAddress(item?.name);
                }}
              />
              <LazyLoadImage
                wrapperClassName={"overideImageCircle"}
                effect={item?.name ? "blur" : undefined}
                style={{
                  position: "absolute",
                }}
                src={
                  item?.name
                    ? env?.REACT_APP_VIDEO_URL +
                      item?.name?.substring(0, item?.name?.lastIndexOf(".")) +
                      "-00001.png"
                    : DEFAULT_IMAGE
                }
                className="d-block w-100 blurImage"
                alt="..."
              />
              <LazyLoadImage
                wrapperClassName={"overideImageCircle"}
                placeholderSrc={DEFAULT_IMAGE}
                effect={item?.name ? "blur" : undefined}
                src={
                  item?.name
                    ? env?.REACT_APP_VIDEO_URL +
                      item?.name?.substring(0, item?.name?.lastIndexOf(".")) +
                      "-00001.png"
                    : DEFAULT_IMAGE
                }
                className="d-block w-100"
                alt="..."
              />
            </>
          ) : (
            item?.name && (
              <>
                <LazyLoadImage
                  wrapperClassName={"overideImageCircle"}
                  effect={item?.name ? "blur" : undefined}
                  style={{
                    position: "absolute",
                  }}
                  src={
                    item?.name
                      ? getImageUrl(item?.name, {
                          type: "events",
                          width: 800,
                        })
                      : DEFAULT_IMAGE
                  }
                  className="d-block w-100 blurImage"
                  alt="..."
                />
                <LazyLoadImage
                  wrapperClassName={"overideImageCircle"}
                  placeholderSrc={DEFAULT_IMAGE}
                  effect={item?.name ? "blur" : undefined}
                  src={
                    item?.name
                      ? getImageUrl(item?.name, {
                          type: "events",
                          width: 800,
                        })
                      : DEFAULT_IMAGE
                  }
                  className="d-block w-100"
                  alt="..."
                />
              </>
            )
          )}
        </Carousel.Item>
      );
    });

  useEffect(() => {
    if (pathname === "/event/appstore")
      window.location.replace(env.REACT_APP_IOS_URL || "");
    if (pathname === "/event/googleplay") {
      window.location.replace(env?.REACT_APP_ANDROID_URL || "");
    }
  }, [pathname]);
  return (
    <>
      <div className="BGColor"></div>

      <Modal show={isVideoPlaying} className="videoModal" onHide={handleClose}>
        <video controls={true} autoPlay={true} className="videoControl">
          <source
            src={env?.REACT_APP_VIDEO_URL + videoAddress}
            type="video/mp4"
          />
        </video>
      </Modal>

      <div className="mobileDetailWrapper">
        <div className="logoHeader">
          <img src={Logo} alt="..." />
        </div>
        <div className="mobileContent picnicEventSlider">
          {carouselItemData?.length > 0 && (
            <Carousel interval={3000}>{carouselItemData}</Carousel>
          )}
          {!carouselItemData?.length && (
            <div className="defaultImgOuter">
              <img src={DEFAULT_IMAGE} alt="Logo" />
            </div>
          )}
          <div className="p-4">
            <div className="eventTitle">
              <section className="eventSection flex-grow-1">
                <span className="eventSectionSpan">
                  {response?.name || "N/A"}
                </span>
                <label className="eventSectionLabel">
                  {response?.city ? response?.city : ""}
                </label>
              </section>
              <section className="eventSection">
                {response?.is_free_event === 1 ? (
                  <span className="eventSectionSpan"> Free</span>
                ) : (
                  <>
                    <span className="eventSectionSpan">
                      {response?.ticket_type === "multiple"
                        ? response?.event_currency !== "usd"
                          ? `${minValue(
                              response?.ticket_plans
                            )?.currency?.toUpperCase()} ${
                              minValue(response?.ticket_plans)?.amount
                            }`
                          : `$${minValue(response?.ticket_plans)?.amount}`
                        : response?.event_currency === "usd"
                        ? `$${response?.event_fees}` || ""
                        : `${response?.event_currency?.toUpperCase() || ""} ${
                            response?.event_fees || "N/A"
                          }`}
                    </span>
                    <label className="eventSectionLabel eventPrice">
                      Per person
                    </label>
                  </>
                )}
              </section>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <div className="eventInfo">
                  {" "}
                  <i>
                    <img src={Calender} alt="..." />
                  </i>
                  <div className="eventInfoLabelOuter">
                    {moment(response?.event_start_date_time)
                      .format("LL")
                      .toString() !==
                    moment(response?.event_end_date_time).format("LL") ? (
                      <p className="eventInfoP">Start Date</p>
                    ) : (
                      ""
                    )}
                    <label className="eventInfoLabel">
                      {response?.event_start_date_time
                        ? moment(response?.event_start_date_time).format("LL")
                        : "N/A"}
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                {moment(response?.event_start_date_time)
                  .format("LL")
                  .toString() ===
                moment(response?.event_end_date_time).format("LL") ? (
                  <div className="eventInfo">
                    <i>
                      <img src={Clock} alt="..." />
                    </i>
                    <div className="eventInfoLabelOuter">
                      <label className="eventInfoLabel">
                        {response?.event_end_date_time
                          ? moment(response?.event_end_date_time).format("LT")
                          : "N/A"}
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="eventInfo">
                    <i>
                      <img src={Calender} alt="..." />
                    </i>
                    <div className="eventInfoLabelOuter">
                      <p className="eventInfoP">End Date</p>
                      <label className="eventInfoLabel">
                        {response?.event_end_date_time
                          ? moment(response?.event_end_date_time).format("LL")
                          : "N/A"}
                      </label>
                    </div>
                  </div>
                )}
              </div>
              <div className="col-sm-6">
                <div className="eventInfo">
                  <i>
                    <img src={Location} alt="..." />
                  </i>
                  <div className="eventInfoLabelOuter">
                    <label className="eventInfoLabel">
                      {response?.address ? response?.address : "N/A"}
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="eventInfo">
                  <i>
                    <img src={Ticket} alt="..." />
                  </i>
                  <div className="eventInfoLabelOuter">
                    <label className="eventInfoLabel">
                      {response?.capacity_type === "limited"
                        ? `${
                            response?.capacity - response?.total_sold_tickets
                          } Tickets Available`
                        : response?.capacity_type === "unlimited"
                        ? "Unlimited"
                        : "N/A"}
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <p className="simpleText py-3">
              {response?.short_description ? response?.short_description : ""}
            </p>
            {response?.ticket_plans?.length ? (
              <div className="subtitle">Ticket Plans</div>
            ) : (
              <></>
            )}
            <div className="priceList">
              {response && response?.ticket_plans?.length ? (
                response?.ticket_plans.map((val: any, i: number) => {
                  return (
                    <div key={i} className="priceListSection">
                      <label>{val?.name}</label>
                      <span>
                        {val?.currency === "usd"
                          ? `$${val?.amount}`
                          : `${val?.currency?.toUpperCase()} ${val?.amount}`}
                      </span>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>

            <div className="row mt-2">
              <div className="col-sm-4">
                <div className="hostedBy">
                  <label className="hostedByLabel subtitle">
                    Event hosted by
                  </label>
                  <div>
                    <LazyLoadImage
                      wrapperClassName={"overideImageCircle"}
                      placeholderSrc={DEFAULT_IMAGE}
                      effect={
                        response?.creator_of_group?.image ? "blur" : undefined
                      }
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
                      {" "}
                      {response?.creator_of_group?.first_name
                        ? `${response?.creator_of_group?.first_name} ${response?.creator_of_group?.last_name}`
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="hostedBy">
                  <label className="hostedByLabel subtitle">Group</label>
                  <div>
                    <LazyLoadImage
                      wrapperClassName={"overideImageCircle"}
                      placeholderSrc={DEFAULT_IMAGE}
                      effect={response?.event_group?.image ? "blur" : undefined}
                      src={
                        response?.event_group?.image
                          ? getImageUrl(response?.event_group?.image, {
                              type: "groups",
                              width: 60,
                            })
                          : DEFAULT_IMAGE
                      }
                      alt="..."
                      width={60}
                      className="hostedByLabelImg"
                    />
                    <span className="hostedBySpan">
                      <b>
                        {response?.event_group?.name
                          ? response?.event_group?.name
                          : "N/A"}
                      </b>
                      <p>
                        {response?.event_group?.city
                          ? response?.event_group?.city
                          : ""}
                      </p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="subtitle">About event</div>
            <p className="simpleText py-2">
              {response?.details ? response?.details : "N/A"}
            </p>
          </div>
        </div>
        <div className="googleAppButtonsOUter picnicEventDownloadButton">
          <Link to="/event/googleplay">
            <img src={GOOGLEPLAY_IMAGE} alt="" />
          </Link>
          <Link to="/event/appstore">
            <img src={APPSTORE_IMAGE} alt="" />
          </Link>
        </div>
      </div>
    </>
  );
};
export default Event;
