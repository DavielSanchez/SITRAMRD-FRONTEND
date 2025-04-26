import { useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ForkLeftIcon from '@mui/icons-material/ForkLeft';
import { useBG, useText, useBGForButtons, useBorderColor, usePrimaryColor } from '../../ColorClass';

function LastViaje({ theme }) {
  const [isImageVisible, setIsImageVisible] = useState(true);
  const bgColor = useBG(theme);
  const textColor = useText(theme);
  const bgPrimary = useBGForButtons(theme);
  const borderColor = useBorderColor(theme);
  const primaryColor = usePrimaryColor(theme);

  const toggleImageVisibility = () => {
    setIsImageVisible(!isImageVisible);
  };

  return (
    <>
      <div className="w-full mt-2 mb-5 sm:px-40">
        {/* Contenedor de la imagen con animación fluida */}
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

        {/* Contenedor de información con bordes dinámicos */}
        <div
          className={`bottom-0 left-0 w-full h-15 ${bgColor} shadow-md border ${borderColor} flex items-center px-6 transition-all duration-300 ease-in-out ${
            isImageVisible ? 'rounded-b-md' : 'rounded-md'
          }`}>
          <ForkLeftIcon sx={{ color: `${primaryColor}` }} />

          <div className="ml-4">
            <p className={`${textColor} text-md font-normal`}>Destino</p>
            <p className={`${textColor} text-md font-normal`}>1 enero • 2:35 p. m.</p>
          </div>

          <div className="ml-auto flex flex-col items-center rounded">
            <RemoveRedEyeIcon
              sx={{ color: `${primaryColor}`, cursor: 'pointer' }}
              onClick={toggleImageVisibility}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default LastViaje;
