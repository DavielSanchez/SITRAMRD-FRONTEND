import { useNavigate } from "react-router-dom";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'; 



function TopBar({nombre, ruta, theme}) {
    const navigate = useNavigate();

    function getIconColor(variant, theme) {
        if (theme === "dark") {
          if (variant === "chevronRight") return "white";
          return "#ff5353";
        } else {
          if (variant === "chevron") return "black";
          if (variant === "chevronRight") return "black";
          if (variant === "gray") return "gray";
          return "#6a62dc";
        }
      }


  return (
    <div
        className={`w-full md:max-w-full h-[45px] shadow-md flex justify-center items-center relative border-b ${
          theme === "dark" ? "bg-[#000000] border-[#333]" : "bg-white border-gray-300"
        }`}
      >
      <div
          className="absolute left-[10px] cursor-pointer hover:opacity-75 active:opacity-50"
          onClick={() => navigate(`${ruta}`)}
        >
          <ChevronLeftIcon sx={{ color: getIconColor("chevron", theme), fontSize: 32 }} />
        </div>
        <h1
          className={`text-xl font-normal font-['Roboto'] ${
            theme === "dark" ? "text-[#ff5353]" : "text-[#6a62dc]"
          }`}
        >
          {nombre}
        </h1>
      </div>
  )
}

export default TopBar