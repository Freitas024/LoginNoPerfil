import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { profileUrl } from "../../constants";
import client from "../../services/client";

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
    try {
      const response = await client.get(profileUrl);

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
          className="bg-[#731dd8] text-white py-2 w-80 h-12 rounded-md font-semibold m-12"
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
            Your <span className="font-bold text-black">Name</span>
          </label>
          <p className="bg-[#F1F1F1] rounded-md px-4 py-4 w-80">
            {userData.name}
          </p>
        </div>
        <div className="m-4 flex flex-col">
          <label className="m-2">
            Your <span className="font-bold">E-mail</span>
          </label>
          <p className="bg-[#F1F1F1] rounded-md px-4 py-4 w-80">
            {userData.email}
          </p>
        </div>
      </div>
    </div>
  );
}
