import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import "./App.css";
import SplashScreen from "./components/SplashScreen";
import { AnimatePresence } from "framer-motion";
import Registration from "./pages/Registration";
import DefaultLayout from "./pages/layouts/DefaultLayout";
import Questionaire from "./pages/Questionaire";
import Footer from "./components/Footer";
import Results from "./pages/Results";
import { UserInfoProvider } from "./context/userInfo/UserInfoProvider";

const App = () => {
  const location = useLocation();

  const userInfo = localStorage.getItem("userInfo");

  return (
    <AnimatePresence mode="wait">
      {!userInfo ? (
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<SplashScreen />} />
          <Route element={<DefaultLayout />}>
            <Route path="/registration" element={<Registration />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <Routes location={location} key={location.pathname}>
          <Route
            path="/questionaire"
            element={
              <>
                <Questionaire />
                <Footer />
              </>
            }
          />
          <Route path="/results" element={<Results />} />
          <Route path="/" element={<Navigate to="/questionaire" replace />} />
        </Routes>
      )}
    </AnimatePresence>
  );
};

const AppWrapper = () => (
  <Router>
    <UserInfoProvider>
      <App />
    </UserInfoProvider>
  </Router>
);

export default AppWrapper;
