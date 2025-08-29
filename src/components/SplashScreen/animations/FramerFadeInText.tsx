import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

type PageProps = {
  text: string;
};

const FramerFadeInText: React.FC<PageProps> = ({ text }) => {
  const navigate = useNavigate();

  const letters = text.split("");

  const variant = {
    initial: {
      y: 100,
      opacity: 0,
    },

    show: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.2,
      },
    }),
  };

  const handleSplashScreenEnd = (i: number) => {
    setTimeout(() => {
      if (i === letters.length - 1) {
        navigate("/registration");
      }
    }, 1500);
  };

  return (
    <motion.div
      exit={{ opacity: 0, y: -50, transition: { duration: 0.5 } }} // 👈 global exit
      className="font-montserrat font-[600] flex flex-row justify-center items-center h-screen w-screen"
    >
      {letters.map((letter, i) => (
        <motion.h1
          key={i}
          initial="initial"
          custom={i}
          variants={variant}
          animate="show"
          onAnimationComplete={() => handleSplashScreenEnd(i)}
          className="text-center text-[rgba(0,0,0,0.5)] leading-tight tracking-wide md:tracking-widest h-screen flex items-center"
        >
          {letter === " " ? (
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          ) : (
            <span className="text-[2rem] md:text-[3.2rem] text-3xl md:text-4xl font-extrabold text-green-200 drop-shadow-md mb-6 inline-block [text-shadow:2px_2px_6px_rgba(0,0,0,0.5)]">
              {letter}
            </span>
          )}
        </motion.h1>
      ))}
    </motion.div>
  );
};

export default FramerFadeInText;
