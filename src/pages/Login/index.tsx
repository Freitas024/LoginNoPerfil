import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMensage, setErrorMensage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
      if (response.status === 200) {
        localStorage.setItem("user_token", response.data.tokens.access);
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(email)) {
      const alert = "Email ou senha incorretos.";
      setErrorMensage(alert);
      return;
    }
  };

  return (
    <div className="grid h-screen place-items-center">
      <div className="bg-white h-4/6 w-96 rounded-2xl p-4 grid grid-rows-4 gap-4 shadow-[0_0px_24px_3px_rgba(0,0,0,0.3)] items-center">
        <h1 className="text-8xl font-bold text-[#02274F] text-center">
          B2B<span className="text-[#FDCF00]">IT</span>
        </h1>
        <div className="flex flex-col">
          {errorMensage && (
            <div className="flex flex-col items-center justify-center">
              <img
                src={
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%23ff4848' d='m12 1l11.951 20.7H.05zM3.513 19.7h16.974L12 5zM13 9.5V15h-2V9.5zm-2 7h2.004v2.004H11z'/%3E%3C/svg%3E"
                }
                alt="Erro"
                className="w-6 h-6"
              />
              <p className="text-[#ff4848] text-xs">{errorMensage}</p>
            </div>
          )}
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
            type={showPassword ? "text" : "password"}
            placeholder="**************"
            className="bg-[#F1F1F1] rounded-md h-14 px-4"
            value={password}
            onChange={handleChangePassword}
          />
          <p
            className="text-[#02274f] cursor-pointer my-2 p-2 hover:text-[#FFFFFF] hover:bg-[#02274f] hover:duration-700 w-36 rounded-lg"
            onClick={() => {
              if (!showPassword) {
                setShowPassword(true);
              } else {
                setShowPassword(false);
              }
            }}
          >
            Visualizar senha
          </p>
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
