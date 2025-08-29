import { motion } from "framer-motion";
import { roundedOffQuestionaire } from "../../questionaire";
import { useEffect, useState } from "react";
import submitQuestionaire from "./apis/submitQuestionaire";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../context/userInfo/UserInfoContext";

type QuestionaireIDType = {
  questionId?: number;
  choiceId?: number;
};

const Questionaire = () => {
  const navigate = useNavigate();

  const questions = roundedOffQuestionaire();

  const [isLoading, setIsLoading] = useState(false);

  const { userInfo, setUserInfo, getTotalQuestions } = useUserInfo();

  const handleReset = () => {
    const storedUserInfo = localStorage.getItem("userInfo");

    if (!storedUserInfo) return;

    const updatedStorageUserInfo = {
      name: JSON.parse(storedUserInfo).name,
      questionaire: [],
    };

    localStorage.setItem("userInfo", JSON.stringify(updatedStorageUserInfo));
    setUserInfo(updatedStorageUserInfo);
  };

  const handleSetUserInfo = ({ questionId, choiceId }: QuestionaireIDType) => {
    const storedUserInfo = localStorage.getItem("userInfo");

    if (!storedUserInfo) return;

    const isCorrectAnswer =
      questions.find((q) => q.id === questionId)?.answer === choiceId;

    const updatedQuestionaire = JSON?.parse(
      storedUserInfo
    )?.questionaire?.filter(
      (q: { questionId: number }) => q.questionId !== questionId
    );

    const newAnswer = {
      questionId,
      choiceId,
      isCorrectAnswer,
    };

    const updatedStorageUserInfo = {
      name: JSON.parse(storedUserInfo).name,
      questionaire: updatedQuestionaire?.length
        ? [...updatedQuestionaire, newAnswer]
        : [newAnswer],
    };

    localStorage.setItem("userInfo", JSON.stringify(updatedStorageUserInfo));
    setUserInfo(updatedStorageUserInfo);
  };

  const handleSelect = (questionId: number, choiceId: number) => {
    handleSetUserInfo({ questionId, choiceId });
  };

  useEffect(() => {
    if (!userInfo) handleSetUserInfo({});
  }, [userInfo]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateX: -30 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotateX: 0,
        transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
        y: 50,
        transition: { duration: 0.8, ease: "easeInOut" },
      }}
      className="w-full min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col justify-start items-center py-10"
    >
      <h1 className="px-[24px] md:px-0 text-2xl md:text-4xl font-extrabold text-green-700 drop-shadow-md mb-6">
        Rounding Off to Nearest 10
      </h1>

      <div className="pt-[50px] relative w-[90%] md:w-2/3 bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <div className="absolute top-2 right-3">
          <button
            type="button"
            className="cursor-pointer text-red-300 text-[14px] underline underline-offset-3"
            onClick={() => handleReset()}
          >
            Clear Answers
          </button>
        </div>

        {questions.map(({ id: questionId, question, choices }, index) => (
          <motion.div
            key={questionId}
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: index * 0.1, duration: 0.6 },
            }}
            className="border-b border-gray-200 pb-4"
          >
            <p className="font-semibold text-gray-800 mb-2">
              {questionId + 1}. {question}
            </p>
            <ul className="space-y-2 pl-4">
              {choices.map((choice, choiceId) => {
                const selected = userInfo?.questionaire?.find(
                  (q) => q.questionId === questionId && q.choiceId === choiceId
                );
                return (
                  <li
                    key={choiceId}
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleSelect(questionId, choiceId)}
                  >
                    <div className="relative w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center">
                      {selected && (
                        <motion.div
                          layoutId={`radio-${questionId}`}
                          className="absolute w-3 h-3 rounded-full bg-green-500"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                        />
                      )}
                    </div>
                    <span className="text-gray-700">{choice}</span>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ))}

        {roundedOffQuestionaire && (
          <div className="flex justify-end">
            <button
              type="submit"
              onClick={() => submitQuestionaire(setIsLoading, navigate)}
              disabled={
                isLoading ||
                getTotalQuestions() < roundedOffQuestionaire()?.length
              }
              className="shadow-lg sm:mt-[10px] md:mt-0 ml-0 md:ml-[5px] min-h-[40px] rounded-lg min-w-[190px] w-full md:w-auto flex justify-center items-center outline-none hover:border-2 hover:border-green-600 hover:text-green-600 bg-green-600 hover:bg-white text-white disabled:cursor-not-allowed cursor-pointer disabled:bg-gray-50 disabled:text-gray-500 disabled:border-none"
            >
              {isLoading ? <div>Submitting ... </div> : "Submit"}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Questionaire;
