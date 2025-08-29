import FramerFadeInText from "./animations/FramerFadeInText";

const SplashScreen = () => {
  return (
    <div className="text-center w-screen bg-gradient-to-br from-slate-50 to-green-50">
      <FramerFadeInText text="Math in English" />
    </div>
  );
};

export default SplashScreen;
