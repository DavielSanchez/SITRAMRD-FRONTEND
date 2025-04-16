import React from 'react';
import ViajeItem from './ViajeItem';
import { useBG, useText, useBGForButtons, useBorderColor, usePrimaryColor } from '../../ColorClass';

function HistorialViajes({ theme }) {
  const bgColor = useBG(theme);
  const textColor = useText(theme);
  const bgPrimary = useBGForButtons(theme);
  const borderColor = useBorderColor(theme);
  const primaryColor = usePrimaryColor(theme);

  return (
    <>
      <div className="flex justify-start w-full mt-5 sm:px-40">
        <p className={`${textColor} font-medium text-3xl`}>Historial de viajes</p>
      </div>
      <div className="flex justify-start w-full mt-2 mb-5 sm:px-40">
        <div className="w-[173px] h-[18px] relative">
          <div className={`w-[60px] h-4 left-0 top-[1px] absolute ${bgPrimary} rounded-[3px]`} />
          <div className="left-[1px] top-0 absolute justify-start text-white text-sm font-normal font-['Inter']">
            1/1/2001
          </div>
          <div
            className={`left-[64px] top-0 absolute justify-start ${textColor} text-sm font-normal font-['Inter']`}>
            hasta
          </div>
          <div
            className={`w-[65px] h-4 left-[108px] top-[2px] absolute ${bgPrimary} rounded-[3px]`}
          />
          <div className="left-[110px] top-[1px] absolute justify-start text-white text-sm font-normal font-['Inter']">
            2/2/2002
          </div>
        </div>
      </div>
      <div className=" w-full mt-2 mb-5 sm:px-40">
        <ViajeItem theme={theme} />
        <ViajeItem theme={theme} />
        <ViajeItem theme={theme} />
        <ViajeItem theme={theme} />
        <ViajeItem theme={theme} />
        <ViajeItem theme={theme} />
        <ViajeItem theme={theme} />
        <ViajeItem theme={theme} />
        <ViajeItem theme={theme} />
        <ViajeItem theme={theme} />
      </div>
    </>
  );
}

export default HistorialViajes;
