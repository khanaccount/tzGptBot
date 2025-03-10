import { useNavigate } from "react-router";

export const useAuth = () => {
  const navigate = useNavigate();

  const handleExit = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    navigate("/auth");
  };

  return { handleExit };
};
