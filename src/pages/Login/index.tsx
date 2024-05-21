import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { MESSAGES, loginUrl } from "../../constants";
import client from "../../services/client";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleClick = async () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(email)) {
      setErrorMessage(MESSAGES.incorrect);
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await client.post(loginUrl, data);
      if (response.status === 200) {
        localStorage.setItem("user_token", response.data.tokens.access);
        navigate("/profile");
      }
    } catch (error) {
      setErrorMessage(MESSAGES.generic);
    }
  };

  return (
    <div className="grid w-screen place-items-center">
      <div className="bg-white h-[550px] mt-16 w-96 rounded-2xl p-4 grid grid-rows-4 gap-4 shadow-[0_0px_24px_3px_rgba(0,0,0,0.3)] items-center">
        <h1 className="text-8xl font-bold text-[#02274F] text-center">
          B2B<span className="text-[#FDCF00]">IT</span>
        </h1>
        <div className="flex flex-col">
          {errorMessage && (
            <div className="flex flex-col items-center justify-center">
              <p className="text-[#ff4848] text-xs">{errorMessage}</p>
            </div>
          )}
          <label className="font-bold mt-12 mb-2">E-mail</label>
          <input
            placeholder="@gmail.com"
            className="bg-[#F1F1F1] rounded-md h-14 px-4"
            type="Email"
            value={email}
            onChange={handleChangeEmail}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-bold mt-12 mb-2">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="**************"
            className="bg-[#F1F1F1] rounded-md h-14 px-4"
            value={password}
            onChange={handleChangePassword}
          />
          <button
            className="flex flex-row items-center justify-center text-[#02274f] cursor-pointer my-2 p-2 hover:text-[#FFFFFF] hover:bg-[#02274f] hover:duration-700 w-36 rounded-lg"
            onClick={() => {
              if (!showPassword) {
                setShowPassword(true);
              } else {
                setShowPassword(false);
              }
            }}
          >
            Visualizar senha
          </button>
        </div>
        <button
          disabled={!email || !password}
          onClick={handleClick}
          className="bg-[#02274F] text-white py-2 h-12 rounded-md font-semibold"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
