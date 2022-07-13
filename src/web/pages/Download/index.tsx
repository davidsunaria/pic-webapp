import React from "react";
import Logo from 'react-app-images/logo.png';
import GoolePay from 'react-app-images/Google-Play.png';
import AppStore from 'react-app-images/App-Store.png';



const Download: React.FC = (): JSX.Element => {


 
  return (
    <>
      <div className="BGColor"></div>
        <div className="mobileDetailWrapper">
            <div className="logoHeader text-center">
                <img src={Logo} alt=""/>
            </div>
            <div className="mobileContent  downloadAppOuter">

                <div className="downloadAppTitle mb-4">Download Your App</div>

                <p className="simpleText mt-0 mb-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>

                <div className="googleAppButtonsOUter">
                  <a href="#"><img src={GoolePay} alt=""/></a>
                  <a href="#"><img src={AppStore} alt=""/></a>
                </div>

            </div>
        </div>

    </>
  );
};
export default Download;
