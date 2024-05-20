import react, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const userToken = localStorage.getItem("user_token");
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (!userToken) {
      navigate("/");
    }

    handleUser();
  }, []);

  const handleUser = async () => {
    const url = "https://api.homologation.cliqdrive.com.br/auth/profile/";

    const headers = {
      Authorization: `Bearer ${userToken}`,
      Accept: "application/json;version=v1_web",
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.get(url, { headers });

      setUserData({
        name: response.data.name,
        email: response.data.email,
        image: response.data.avatar.medium,
      });
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user_token");
    navigate("/");
  };

  return (
    <div className="bg-[#F1F5F9] h-screen grid place-items-center">
      <header className="bg-white w-screen h-20 flex items-center justify-end fixed top-0 left-0">
        <button
          onClick={handleLogout}
          className="bg-[#02274F] text-white py-2 w-80 h-12 rounded-md font-semibold m-12"
        >
          Logout
        </button>
      </header>
      <div className="bg-white p-12 flex justify-center items-center flex-col shadow-[0_0px_12px_0px_rgba(0,0,0,0.1)] rounded-xl">
        <h1 className="h-6 font-normal text-center m-4">profile picture</h1>
        <img
          src={userData.image}
          alt="Imagem b2bit"
          className="w-48 self-center justify-self-center"
        />
        <div className="m-4 flex flex-col">
          <label className="m-2">
            Your <span className="font-bold">Name</span>
          </label>
          <input
            placeholder={userData.name}
            className="bg-[#F1F1F1] rounded-md px-2 py-4 w-80 placeholder:text-black"
          />
        </div>
        <div className="m-4 flex flex-col">
          <label className="m-2">
            Your <span className="font-bold">E-mail</span>
          </label>
          <input
            placeholder={userData.email}
            className="bg-[#F1F1F1] rounded-md px-2 py-4 w-80 placeholder:text-black"
          />
        </div>
      </div>
    </div>
  );
}
