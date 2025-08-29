import type { NavigateFunction } from "react-router-dom";

type ScoreResultType = {
  you: {
    score: number;
    rank: number;
  };
  communnity: {
    rank: number;
    name: string;
    score: number;
  }[];
};

const submitQuestionaire = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: NavigateFunction
) => {
  try {
    setIsLoading(true);

    return new Promise<ScoreResultType>((resolve) => {
      resolve({
        you: {
          score: 1,
          rank: 199,
        },
        communnity: [
          {
            rank: 1,
            name: "stringnumber",
            score: 100,
          },
        ],
      });
    });
  } catch (error) {
    console.error(error);
  } finally {
    setTimeout(() => {
      setIsLoading(false);

      navigate('/results')
    }, 2000);
  }
};

export default submitQuestionaire;
