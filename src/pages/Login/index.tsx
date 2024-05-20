import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const fetchData = async () => {
    const url = "https://api.homologation.cliqdrive.com.br/auth/profile/";

    try {
      const response = await axios.get(url);
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClick = async () => {
    const url = "https://api.homologation.cliqdrive.com.br/auth/login/";

    const data = {
      email: email,
      password: password,
    };

    const headers = {
      //'Authorization':`Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
      Accept: "application/json;version=v1_web",
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(url, data, { headers });
      console.log(response.data);
      if (response.status === 200) {
        localStorage.setItem("user_token", response.data.tokens.access);
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="grid h-screen place-items-center">
      <div className="bg-white h-5/6 w-96 rounded-2xl p-4 grid grid-rows-4 gap-4 shadow-[0_0px_24px_3px_rgba(0,0,0,0.3)] items-center">
        <h1 className="text-8xl font-bold text-[#02274F] text-center">
          B2B<span className="text-[#FDCF00]">IT</span>
        </h1>

        <div className="flex flex-col">
          <label className="font-bold my-4">E-mail</label>
          <input
            placeholder="@gmail.com"
            className="bg-[#F1F1F1] rounded-md h-14 px-4"
            type="Email"
            value={email}
            onChange={handleChangeEmail}
          />
        </div>

        <div className="flex flex-col">
          <label className="font-bold my-4">Password</label>
          <input
            placeholder="**************"
            className="bg-[#F1F1F1] rounded-md h-14 px-4"
            type="password"
            value={password}
            onChange={handleChangePassword}
          />
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
