import Head from "next/head";
import Link from "next/link";
import { useState, useContext } from "react";
import { Web3Context } from "../../context/Web3Context";
import Logo from "../Logo";
import QuestionPopup from "../QuestionPopup";
import Identicon from "react-identicons";
import { FaTwitter } from "react-icons/fa";

const Header = () => {
  const [questionPopupVisible, setQuestionPopupVisible] = useState(false);
  const { address } = useContext(Web3Context);

  return (
    <>
      <Head>
        <title>BlockStack</title>
        <meta name="description" content="BlockStack" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <header className="flex items-center justify-between max-w-[1440px] mx-auto py-[10px] px-[32px] md:px-[64px] lg:px-[120px]">
        <h1 className="flex-1 flex items-center justify-start">
          <Link href="/">
            <a className="flex items-center">
              <Logo />
              <span className="pl-[15px] font-bold text-[20px]">BlockStack</span>
            </a>
          </Link>
        </h1>
        <nav className="flex items-center flex-1">
          <ul className="flex items-center justify-between w-full">
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/questions">
                <a>Question</a>
              </Link>
            </li>
            <li onClick={() => setQuestionPopupVisible(true)}>
              Ask a Question
            </li>
            <ul className="flex space-x-4">
              <li>
                <Link href={`/${address ? "profile" : ""}`}>
                  <a>
                    {address ? (
                      <Identicon
                        string={address}
                        size={30}
                        className="rounded-full"
                      />
                    ) : (
                      "Login"
                    )}
                  </a>
                </Link>
              </li>
              <li>
                {/* Sign in with Twitter button */}
                <button
                  onClick={() => alert("Sign in with Twitter")}
                  className="flex items-center border border-black px-2 py-1 rounded"
                >
                  <FaTwitter className="mr-1" />
                  Sign in with Twitter
                </button>
              </li>
            </ul>
          </ul>
        </nav>
      </header>
      <QuestionPopup
        visible={questionPopupVisible}
        setVisible={setQuestionPopupVisible}
      />
    </>
  );
};

export default Header;
