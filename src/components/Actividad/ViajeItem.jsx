import { useState } from 'react';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useBG, useText, useBGForButtons, useBorderColor, usePrimaryColor } from '../../ColorClass';

function ViajeItem({ theme }) {
  const bgColor = useBG(theme);
  const textColor = useText(theme);
  const bgPrimary = useBGForButtons(theme);
  const borderColor = useBorderColor(theme);
  const primaryColor = usePrimaryColor(theme);

  const [isImageVisible, setIsImageVisible] = useState(false);

  const toggleImageVisibility = () => {
    setIsImageVisible(!isImageVisible);
  };

  return (
    <div className="w-full">
      {/* Contenedor de la imagen con animación */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isImageVisible ? 'h-[193px] opacity-100 scale-y-100' : 'h-0 opacity-0 scale-y-0'
        }`}>
        <img
          className={`w-full h-[193px] border ${borderColor} object-cover rounded-t-md`}
          src="https://placehold.co/388x193"
          alt="Destino"
        />
      </div>

      <div
        className={`w-full h-15 relative mb-2 flex items-center ${bgColor} shadow-md border ${borderColor} px-6 transition-all duration-300 ease-in-out ${
          isImageVisible ? 'rounded-b-md' : 'rounded-md'
        }`}>
        <DirectionsBusIcon sx={{ color: `${primaryColor}` }} />

        <div className="flex flex-col flex-grow ml-4">
          <span className={`${textColor} text-md font-normal font-['Inter']`}>Destino</span>
          <span className={`${textColor} text-md font-normal font-['Inter']`}>
            1 enero • 2:35 p. m.
          </span>
        </div>

        <div className="ml-auto flex flex-col items-center rounded">
          <RemoveRedEyeIcon
            sx={{ color: `${primaryColor}`, cursor: 'pointer' }}
            onClick={toggleImageVisibility}
          />
        </div>
      </div>
    </div>
  );
}

export default ViajeItem;
