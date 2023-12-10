import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { Web3Context } from "../context/Web3Context";

const Question = () => {
  const {
    address,
    CryptoStack,
    questions,
    getAnswersForQuestion,
    loading,
    answerQuestion,
    upvoteAnswer,
    downvoteAnswer,
  } = useContext(Web3Context);
  const [answer, setAnswer] = useState();
  const [answers, setAnswers] = useState([]);
  const [questionData, setQuestionData] = useState();
  const router = useRouter();

  useEffect(() => {
    if (CryptoStack) getQuestionDetails(router.query?.questionId);
  }, [CryptoStack, router.query?.questionId, answers, upvoteAnswer, downvoteAnswer]);

  const getQuestionDetails = async (questionId) => {
    const questionDetails = questions.find((data) => {
      console.log(data);
      return data.id === questionId;
    });
    setQuestionData(questionDetails);
    const answers = await getAnswersForQuestion(questionId);
    console.log(answers);
    setAnswers(answers ?? []);
  };

  const handleAddAnswer = (e) => {
    e.preventDefault();
    answerQuestion(router.query.questionId, answer);
  };

  const handleUpvoteAnswer = (answerId) => {
    upvoteAnswer(answerId);
  };

  const handleDownvoteAnswer = (answerId) => {
    downvoteAnswer(answerId);
  };

  return (
    <>
      <Header />
      <main className="max-w-[1440px] mx-auto px-[32px] md:px-[64px] lg:px-[120px] pt-[54px]">
        {questionData ? (
          <div>
            <h1 className="font-bold text-[32px]">
              {questionData.questionString}
            </h1>
            {answers ? (
              <div className="flex flex-col">
                {answers?.map(({ answerString, replierUsername, id, upvotes, downvotes }, i) => (
                  <div
                    className="shadow p-[30px] text-base text-gray-600 mt-[20px] flex flex-col items-start"
                    key={`answer-${i}`}
                  >
                    <h4 className="text-sm mb-[10px] border-b-[1px] pb-[10px] flex items-center">
                      <span>Answered by:</span>
                      <span className="font-bold">{replierUsername}</span>
                    </h4>
                    <p className="">{answerString}</p>
                    <div className="flex mt-[20px]">
                      <button onClick={() => handleUpvoteAnswer(id)} className="mr-[10px]">
                      <span>⬆️</span> Upvote ({upvotes})
                      </button>
                      {upvotes > 0 && (
                        <button onClick={() => handleDownvoteAnswer(id)}>
                         <span>⬇️ </span> Downvote ({downvotes})
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <div className="flex flex-col items-start mt-[20px]">
                  <p>
                    Not satisfied with the given answer? Write your answer{" "}
                  </p>
                  <a
                    href="#answer"
                    className="inline-block text-white font-bold bg-blue-500 px-[20px] py-[10px] rounded mt-[20px]"
                  >
                    Write an answer now
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-start">
                <p>
                  Question not answered yet. Write an answer and get a chance to
                  win CELO tokens!{" "}
                  <Link href="/nft">
                    <a className="text-blue-500 font-semibold">Learn more</a>
                  </Link>
                </p>
                <a
                  href="#answer"
                  className="inline-block text-white font-bold bg-blue-500 px-[20px] py-[10px] rounded mt-[20px]"
                >
                  Write an answer now
                </a>
              </div>
            )}
          </div>
        ) : (
          <Loading />
        )}
        <section id="answersection" className="flex items-center justify-center">
          <form
            onSubmit={handleAddAnswer}
            className="flex flex-col items-start mt-[30px] w-full border-t-[1px] pt-[20px]"
          >
            <label htmlFor="answer" className="font-semibold">
              Write an answer
            </label>
            <textarea
              type="text"
              id="answer"
              required
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter your answer here"
              className="w-full mt-[20px] p-[20px] bg-gray-100 resize-none rounded outline-none"
              rows={5}
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 px-[20px] py-[10px] rounded text-white mt-[20px] font-semibold"
            >
              Add answer
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default Question;
