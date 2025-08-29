import { useState, type ReactNode } from "react";
import { UserInfoContext, type UserInfoType } from "./UserInfoContext";
import { roundedOffQuestionaire } from "../../questionaire";

export const UserInfoProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(() => {
    const stored = localStorage.getItem("userInfo");
    return stored ? JSON.parse(stored) : null;
  });

  const getScore = () => {
    if (!userInfo?.questionaire) return 0;
    return userInfo.questionaire.filter((entry) => entry.isCorrectAnswer)
      .length;
  };

  const getTotalQuestions = () => {
    return roundedOffQuestionaire()?.length;
  };

  return (
    <UserInfoContext.Provider
      value={{ userInfo, setUserInfo, getScore, getTotalQuestions }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};
