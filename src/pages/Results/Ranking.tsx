import { motion } from "framer-motion";

type PageProps = {
  setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>;
};

const leaderboardData = [
  { rank: 1, name: "Alice", score: "12 / 12" },
  { rank: 2, name: "Bob", score: "11 / 12" },
  { rank: 3, name: "Charlie", score: "9 / 12" },
  { rank: 4, name: "Diana", score: "8 / 12" },
  { rank: 5, name: "Eve", score: "5 / 12" },
  { rank: 6, name: "Frank", score: "4 / 12" },
  { rank: 7, name: "Grace", score: "4 / 12" },
  { rank: 8, name: "Henry", score: "3 / 12" },
  { rank: 9, name: "Isabel", score: "2 / 12" },
  { rank: 10, name: "Jean", score: "1 / 12" },
];

const Ranking: React.FC<PageProps> = ({ setShowOverlay }) => {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="absolute top-0 left-0 w-screen h-screen flex flex-col justify-center items-center bg-[rgba(160, 49, 106, 0.1)] rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10"
    >
      <h2 className="text-3xl font-extrabold text-green-600 drop-shadow-md mb-6">
        Top 10
      </h2>
      <div className="grid grid-cols-3 gap-4 w-3/4 max-w-2xl bg-[rgba(255,255,255,0.8)] bg-opacity-90 rounded-lg p-4 shadow-lg">
        <div className="text-lg font-bold text-gray-800 text-center">Rank</div>
        <div className="text-lg font-bold text-gray-800 text-center">Name</div>
        <div className="text-lg font-bold text-gray-800 text-center">Score</div>
        {leaderboardData.map((player) => (
          <>
            <div className="text-center text-gray-600">{player.rank}</div>
            <div className="text-center text-gray-600">{player.name}</div>
            <div className="text-center text-gray-600">{player.score}</div>
          </>
        ))}
      </div>
      <button
        onClick={() => setShowOverlay(false)}
        className="mt-6 px-4 py-2 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-transparent hover:outline-1 hover:outline-green-600 transition-colors hover:text-green-600 hover:cursor-pointer"
      >
        Close
      </button>
    </motion.div>
  );
};

export default Ranking;
