// src/utils/analytics.js
import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-XXXXXXXXXX");
};

export const trackPage = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};
