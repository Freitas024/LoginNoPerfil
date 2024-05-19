import react, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const userToken = localStorage.getItem("user_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <h1>Perfil</h1>
    </div>
  );
}
