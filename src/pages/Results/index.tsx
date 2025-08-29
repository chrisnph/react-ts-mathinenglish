import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useState } from "react";
import { useUserInfo } from "../../context/userInfo/UserInfoContext";
import Ranking from "./Ranking";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const navigate = useNavigate();
  const { userInfo, getScore, getTotalQuestions } = useUserInfo();
  const [showConfetti, setShowConfetti] = useState<boolean>(true);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  if (!userInfo) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        No data available
      </div>
    );
  }

  return (
    <>
      {showConfetti && (
        <Confetti
          recycle={false}
          tweenDuration={2000}
          className="w-screen h-screen"
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}
      <div className="relative w-screen h-screen overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              opacity: { duration: 0.8, ease: "easeInOut" },
            },
          }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col justify-center items-center py-10"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            className="text-3xl md:text-4xl font-extrabold text-green-700 drop-shadow-lg mb-6"
          >
            Congratulations {userInfo.name}!
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.5 }}
            className="text-2xl font-extrabold text-gray-600 drop-shadow-md mb-6"
          >
            You ranked: #199
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 3 }}
            className="text-xl font-extrabold text-gray-400 drop-shadow-md mb-6"
          >
            Correct Answers: {getScore()} out of {getTotalQuestions()}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: -15 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 3.8 }}
          className="absolute h-[40px] top-[10px] left-1/2 transform -translate-x-1/2"
        >
          <button
            onClick={() => navigate("/")}
            className="text-white shadow-lg cursor-pointer relative px-6 py-4 bg-green-600 font-semibold rounded-b-xl hover:shadow-lg transition-shadow
              before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-green-600 before:border-t-2 before:border-gray-300 before:border-dashed
              after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-1 after:bg-gray-50 after:transform after:skew-x-12"
          >
            Home
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 3.8 }}
          className="absolute h-[40px] bottom-[10px] left-1/2 transform -translate-x-1/2"
        >
          <button
            onClick={() => setShowOverlay(true)}
            className="shadow-lg cursor-pointer relative px-6 py-4 bg-gray-50 text-gray-800 font-semibold rounded-t-xl hover:shadow-lg transition-shadow
              before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-full before:h-1 before:bg-gray-50 before:border-b-2 before:border-gray-300 before:border-dashed
              after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1 after:bg-gray-50 after:transform after:-skew-x-12"
          >
            Global Ranking
          </button>
        </motion.div>

        {showOverlay && <Ranking setShowOverlay={setShowOverlay} />}
      </div>
    </>
  );
};

export default Results;
