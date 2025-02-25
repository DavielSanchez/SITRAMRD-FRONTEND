import CustomSwitch from "./Switch";
import ChevronRightIcon from '@mui/icons-material/ChevronRight'; 

export default function renderSection(title, items, theme) {

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
      <div className="mt-6">
        <h2
          className={`ml-4 text-2xl font-normal ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          {title}
        </h2>
        <div
          className={`w-full min-w-[280px] md:max-w-full mx-auto mt-3 rounded-xl p-4 flex flex-col gap-4 ${
            theme === "dark" ? "bg-[#1E1E1E] text-[#E0E0E0]" : "bg-gray-100 text-black"
          }`}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 rounded-lg cursor-pointer hover:shadow-md"
              onClick={item.onClick}
            >
              <div className="flex items-center gap-3">
                <item.icon sx={{ color: getIconColor(item.variant, theme), fontSize: 24 }} />
                <span className={theme === "dark" ? "text-white" : "text-black"}>
                  {item.label}
                </span>
              </div>
              {item.isSwitch ? (
                <CustomSwitch enabled={item.switchState} onToggle={item.onClick} />
              ) : (
                // Se reemplaza la imagen por ChevronRightIcon con fontSize aumentado a 28
                <ChevronRightIcon sx={{ color: getIconColor("chevronRight", theme), fontSize: 28 }} />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }