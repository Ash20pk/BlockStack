import Link from "next/link";
import { useContext } from "react";
import { Web3Context } from "../../context/Web3Context";

const QuestionCard = ({ answers, isAnswered, questionId, question, upvotes, downvotes }) => {
  const { upvoteQuestion, downvoteQuestion } = useContext(Web3Context);

  const handleUpvote = async (e) => {
    e.preventDefault();
    await upvoteQuestion(questionId);
  };

  const handleDownvote = async (e) => {
    e.preventDefault();
    await downvoteQuestion(questionId);
  };

  return (
    <Link href={`/${questionId}`}>
      <a className="p-[30px] shadow rounded-[10px]">
        <h2 className="font-medium text-[18px]">{question}</h2>
        <p className="text-gray-600 text-base mt-[16px]">
          {isAnswered
            ? answers?.[0]?.length > 110
              ? `${answers?.[0]?.slice(0, 107)}...`
              : answers?.[0]
            : "No answers yet"}
        </p>
        <div className="flex items-center mt-[20px]">
          <button onClick={handleUpvote} className="flex items-center mr-[10px]">
            {/* Placeholder for upvote icon */}
            <span>⬆️</span> Upvote ({upvotes})
          </button>
          {upvotes > 0 && (
            <button onClick={handleDownvote} className="flex items-center">
              {/* Placeholder for downvote icon */}
              <span>⬇️ </span> Downvote ({downvotes})
            </button>
          )}
        </div>
        <Link href={`/${questionId}`}>
          <a className="inline-block text-white font-bold bg-blue-500 px-[20px] py-[10px] rounded mt-[20px]">
            {isAnswered ? "Checkout the answer" : "Write an Answer"}
          </a>
        </Link>
      </a>
    </Link>
  );
};

export default QuestionCard;
