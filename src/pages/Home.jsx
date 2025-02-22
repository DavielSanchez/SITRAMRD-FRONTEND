import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import NavBar from "../components/NavBar";

function Home() {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const usertheme = decodedToken.theme;

  const [theme, setTheme] = useState(usertheme);

  return (
    <>
    <div className={`${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} h-200`}>
    <h1 className="">Hello</h1>
    <NavBar theme={theme}/>
    </div>
    </>
  )
}

export default Home