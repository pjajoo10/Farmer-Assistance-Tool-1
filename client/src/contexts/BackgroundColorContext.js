import { createContext } from "react";

export const backgroundColors = {
  primary: "green",
  blue: "blue",
  green: "green",
};

export const BackgroundColorContext = createContext({
  color: backgroundColors.blue,
  changeColor: (color) => {},
});
