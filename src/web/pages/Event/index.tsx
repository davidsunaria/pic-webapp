import React, { useEffect, useState, useCallback, useRef } from "react";
import Logo from "react-app-images/logo.png";
import Calender from "react-app-images/calendar.png";
import Location from "react-app-images/location.png";
import Clock from "react-app-images/clock.png";
import Ticket from "react-app-images/Ticket.png";
import User from "react-app-images/user.png";
import DEFAULT_IMAGE from "react-app-images/default.png";
import MOBILE_IMAGE from "react-app-images/mobile-default.png";
import PLAY_IMAGE from "react-app-images/play.png";
import GOOGLEPLAY_IMAGE from "react-app-images/Google-Play.png";
import APPSTORE_IMAGE from "react-app-images/App-Store.png";
import CLOSEVIDEO_IMAGE from "react-app-images/cross-video.png";
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
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [windowHeight, setWindowHeight] = useState<number>(0);
  const [mobileView, setMobileView] = useState<boolean>(true);

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

  useEffect(() => {
    if (windowWidth < 500) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  }, [windowWidth]);

  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

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
                placeholderSrc={mobileView ? MOBILE_IMAGE : DEFAULT_IMAGE}
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
                  placeholderSrc={mobileView ? MOBILE_IMAGE : DEFAULT_IMAGE}
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

  const getMinimumValue = (res: any) => {
    if (!res || Object.keys(res)?.length === 0) {
      return "N/A";
    }
    let price = parseFloat(res?.event_fees || "0");
    let currency = res?.event_currency?.toUpperCase();
    if (res?.ticket_type === "multiple") {
      price = parseFloat(minValue(res?.ticket_plans)?.amount || "0");
      currency = minValue(res?.ticket_plans)?.currency?.toUpperCase();
    }

    const formattedPrice = price?.toLocaleString("en", {
      currency: currency?.toUpperCase(),
      style: "currency",
    });

    return formattedPrice;
    // if (!res || Object.keys(res)?.length === 0) {
    //   return "N/A";
    // } else {
    //   return res?.ticket_type === "multiple"
    //     ? res?.event_currency !== "usd"
    //       ? `${minValue(
    //           res?.ticket_plans
    //         )?.currency?.toUpperCase()} ${parseFloat(
    //           minValue(res?.ticket_plans)?.amount
    //         )?.toFixed(2)}`
    //       : `$${parseFloat(minValue(res?.ticket_plans)?.amount)?.toFixed(2)}`
    //     : res?.event_currency === "usd"
    //     ? `$${parseFloat(res?.event_fees)?.toFixed(2)}` || ""
    //     : `${res?.event_currency?.toUpperCase() || ""} ${
    //         parseFloat(res?.event_fees)?.toFixed(2) || "N/A"
    //       }`;
    // }
  };

  useEffect(() => {
    if (pathname === "/event/appstore")
      window.location.replace(env.REACT_APP_IOS_URL || "");
    if (pathname === "/event/googleplay") {
      window.location.replace(env?.REACT_APP_ANDROID_URL || "");
    }
  }, [pathname]);

  const mapOpen = () => {
    window.location.href = `https://www.google.com/maps/search/?api=1&query=${response?.location?.coordinates[1]},%20${response?.location?.coordinates[0]}`;
  };

  return (
    <>
      <div className="BGColor"></div>

      <Modal show={isVideoPlaying} className="videoModal" onHide={handleClose}>
        <img
          src={CLOSEVIDEO_IMAGE}
          alt=""
          className="closeVideo"
          onClick={handleClose}
        />
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
                      {getMinimumValue(response)}
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
                      <p className="eventInfoP">Start Date </p>
                    ) : (
                      ""
                    )}
                    {response?.is_multi_day_event ? (
                      <>
                        {" "}
                        <label className="eventInfoLabel">
                          {response?.event_start_date_time
                            ? moment(response?.event_start_date_time).format(
                                "LL"
                              )
                            : "N/A"}
                        </label>{" "}
                        |&nbsp;
                        <label className="eventInfoLabel">
                          {response?.event_end_date_time
                            ? moment(response?.event_start_date_time).format(
                                "LT"
                              )
                            : "N/A"}
                        </label>
                      </>
                    ) : (
                      <label className="eventInfoLabel">
                        {response?.event_start_date_time
                          ? moment(response?.event_start_date_time).format("LL")
                          : "N/A"}
                      </label>
                    )}
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
                          ? moment(response?.event_start_date_time).format("LT")
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
                      <p className="eventInfoP">End Date </p>
                      <label className="eventInfoLabel">
                        {response?.event_end_date_time
                          ? moment(response?.event_end_date_time).format("LL")
                          : "N/A"}
                      </label>{" "}
                      |&nbsp;
                      <label className="eventInfoLabel">
                        {response?.event_end_date_time
                          ? moment(response?.event_end_date_time).format("LT")
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
                    {response?.address ? (
                      <label
                        className="eventInfoLabel linkColor"
                        onClick={mapOpen}
                      >
                        {response?.address}
                      </label>
                    ) : (
                      <label className="eventInfoLabel">{"N/A"}</label>
                    )}
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
            {response &&
            response?.is_free_event === 0 &&
            response?.ticket_plans?.length ? (
              <div className="subtitle">Ticket Plans</div>
            ) : (
              <></>
            )}
            <div className="priceList">
              {response &&
              response?.is_free_event === 0 &&
              response?.ticket_plans?.length ? (
                response?.ticket_plans.map((val: any, i: number) => {
                  return (
                    <div key={i} className="priceListSection">
                      <label>{val?.name}</label>
                      {/* <span>
                        {val?.currency === "usd"
                          ? `$${parseFloat(val?.amount)?.toFixed(2)}`
                          : `${val?.currency?.toUpperCase()} ${parseFloat(
                              val?.amount
                            )?.toFixed(2)}`}
                      </span> */}
                      <span>
                        {parseFloat(val?.amount || "0")?.toLocaleString("en", {
                          currency: val?.currency?.toUpperCase(),
                          style: "currency",
                        })}
                      </span>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>

            <div className="row mt-2">
              <div className="col-sm-6">
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
              <div className="col-sm-6">
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
                      {response?.event_group?.name ? (
                        <b>{response?.event_group?.name}</b>
                      ) : (
                        "N/A"
                      )}

                      {response?.event_group?.city ? (
                        <p>{response?.event_group?.city}</p>
                      ) : (
                        ""
                      )}
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
