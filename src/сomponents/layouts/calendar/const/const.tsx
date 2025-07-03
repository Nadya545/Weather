import { weatherIconsKey } from "../type/type";
import { JSX } from "react";
import PartlyCloudIcon from "../../../../icons/PartlyCloudIcon";
import CloudyIcon from "../../../../icons/CloudyIcon";
import ClearIcon from "../../../../icons/ClearIcon";
import RainIcon from "../../../../icons/RainIcon";
import React from "react";

export const weatherIcons: Record<weatherIconsKey, JSX.Element> = {
  "partly-cloudy-day": <PartlyCloudIcon />,
  "cloudy-day": <CloudyIcon />,
  "clear-day": <ClearIcon />,
  rain: <RainIcon />,
  cloudy: <CloudyIcon />,
  clear: <ClearIcon />,
  "partly-cloudy": <PartlyCloudIcon />,
};
