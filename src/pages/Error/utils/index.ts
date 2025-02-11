import { useNavigate } from "react-router-dom";
const base = import.meta.env.VITE_BASE;
/** 出现异常返回主页，返回/,自动定位到主页 */
export const useNavigateToHome = (baseUrl: string = base) => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate(`${baseUrl}/`);
  };

  return handleBackToHome;
};
