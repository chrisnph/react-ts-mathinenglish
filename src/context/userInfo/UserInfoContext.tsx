import { createContext, useContext } from "react";

export type UserInfoEntry = {
  questionId: number;
  choiceId: number;
  isCorrectAnswer: boolean;
};

export type UserInfoType = {
  name: string;
  questionaire: UserInfoEntry[];
};

export interface UserInfoContextType {
  userInfo: UserInfoType | null;
  setUserInfo: (userInfo: UserInfoType | null) => void;
  getScore: () => number;
  getTotalQuestions: () => number;
}

export const UserInfoContext = createContext<UserInfoContextType | undefined>(
  undefined
);

export const useUserInfo = (): UserInfoContextType => {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error("useUserInfo must be used within a UserInfoProvider");
  }
  return context;
};
