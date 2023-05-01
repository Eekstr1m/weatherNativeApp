import "./common/_prototypes.js";
import ContextProvider from "./common/context.js";
import Navigation from "./components/Navigation";

export default function App() {
  return (
    <ContextProvider>
      <Navigation />
    </ContextProvider>
  );
}

const theme = {
  light: {
    first: "#FFBC7C",
    second: "#FF52A7",
    avg: "#ff8792",
    bg: "#fff",
    lightBg: "#f2f2f2",
    textColor: "#081b25",
  },
  dark: {
    first: "#21B2FE",
    second: "#C65AE9",
    avg: "#7287f4",
    bg: "#081b25",
    lightBg: "#353361",
    textColor: "#fff",
  },
};
