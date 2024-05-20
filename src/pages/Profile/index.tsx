import react, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const userToken = localStorage.getItem("user_token");
  const navigate = useNavigate();

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
      localStorage.setItem("user_Data", response.data);
      console.log(response.data);
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  return (
    <div className="bg-[#F1F5F9] h-screen grid place-items-center">
      <header className="bg-white w-screen h-20 flex items-center justify-end fixed top-0 left-0">
        <button className="bg-[#02274F] text-white py-2 w-80 h-12 rounded-md font-semibold m-12">
          Logout
        </button>
      </header>
      <div className="bg-white w-1/5 h-3/6 p-12 grid grid-rows-4 shadow-[0_0px_12px_0px_rgba(0,0,0,0.1)] rounded-xl">
        <h1 className="font-normal text-center text-center">profile picture</h1>
        <h3 className="text-center"></h3>
        <label className="m-4">
          Your <span className="font-bold">Name</span>
        </label>
        <h2 className="bg-[#F1F1F1] rounded-md px-2 h-8">name</h2>
        <label className="m-4">
          Your<span className="font-bold">E-mail</span>
        </label>
        <h2 className="bg-[#F1F1F1] rounded-md px-2 h-8">Email</h2>
      </div>
    </div>
  );
}
