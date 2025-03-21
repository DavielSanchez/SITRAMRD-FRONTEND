
function Unauthorized() {
  return (
    <>
    <div className="bg-white flex justify-center items-center w-full min-h-screen">
      <div className="bg-white w-[1440px] flex flex-col items-center text-center">
        <h1 className="font-bold text-black text-5xl mb-4">
          No estas autorizado para entrar a SITRAMRD!
        </h1>
        
        <p className="font-normal text-black text-[28px] mb-10 mt-5">
          Si crees que esto es un error, contacta con soporte.
        </p>

        <a href="/login" className="bg-[var(--primary-purple-color)] w-[140px] h-9 rounded-[10px] flex items-center justify-center text-white text-base">
            Inicia Seccion
          </a>
      </div>
    </div>
  </>
  )
}

export default Unauthorized