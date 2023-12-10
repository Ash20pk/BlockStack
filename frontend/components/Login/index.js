import { useContext, useState } from "react";
import { Web3Context } from "../../context/Web3Context";

const Login = ({ visible, setVisible }) => {
  const { loading, registerNewUser } = useContext(Web3Context);
  const [username, setUsername] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerNewUser(username);
    // Assuming registerNewUser resolves when login is successful
    setLoginSuccess(true);
  };

  const handleModalClose = () => {
    setVisible(false);
    setLoginSuccess(false); // Reset login status when closing the modal
  };

  if (!visible) return null;

  return (
    <>
      <div className="absolute top-0 left-0 h-full w-full bg-[#00000052]"></div>
      <div className="flex flex-col pb-[35px] px-[25px] pt-[14px] md:pb-[70px] md:px-[50px] md:pt-[30px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white max-w-[400px] w-full rounded-[10px]">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="w-full flex justify-end items-center">
              <span
                className="text-[32px] cursor-pointer"
                onClick={handleModalClose}
              >
                &times;
              </span>
            </div>
            {loginSuccess ? (
              <div className="text-green-500 text-lg mb-4">
                Login successful! {/* Display your success message here */}
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="h-full flex flex-col items-start justify-center"
              >
                <label htmlFor="username" className="text-lg font-semibold">
                  Enter username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-100 px-[20px] py-[10px] mt-[15px] w-full outline-none"
                  placeholder="Enter a username"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-bold text-base px-[20px] py-[10px] rounded w-full mt-[15px]"
                >
                  Login
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Login;
