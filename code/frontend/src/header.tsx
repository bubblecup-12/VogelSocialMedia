import React, { Children, useState } from "react";
import "./header.css";
//import featherIcon from '/assets/icons/feather.svg';
//import menu from '../public/favicon.svg';


function BaseLayout() {

  return (
      <header className="base-header">
        <div className="base-header-icon"> <img src='/assets/icons/feather.svg' alt="featherIcon" /> </div>
        <p className="base-header-title">
          Feather Feed
        </p>
        <div className="base-header-icon"> <img src="/assets/icons/menu.svg" alt="menuIcon" /> </div>
      </header>
  );
}

export default BaseLayout;
