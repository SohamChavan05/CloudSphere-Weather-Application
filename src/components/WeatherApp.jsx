import LeftContainer from "./LeftContainer";
import RightContainer from "./RightContainer";
import "../styles/WeatherApp.css";
import { useState } from "react";

export default function WeatherApp() {
  return (
    <div className="mainContainer">
      <LeftContainer />
      <RightContainer />
    </div>
  );
}
