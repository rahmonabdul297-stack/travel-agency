import { useTheme } from "@/context/ThemeContext";
import { Link } from "react-router-dom";

export const Logo = () => {
      const { theme } = useTheme();
  return (
    <div>
      {" "}
      <Link to="/" className="flex items-center gap-2 group mt-2">
        <img src={theme==="dark"?"/images/logo2.png":"/images/logo.png"} className="h-[80px] w-[150px]" />
      </Link>
    </div>
  );
};

export const Logo2 = () => {
      const { theme } = useTheme();
  return (
    <div>
      {" "}
      <Link to="/" className="flex items-center gap-2 group mt-2">
        <img src={theme==="dark"?"/images/logo2.png":"/images/logo2.png"} className="h-[80px] w-[150px]" />
      </Link>
    </div>
  );
};
