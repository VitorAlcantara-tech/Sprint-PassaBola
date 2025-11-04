// src/components/Layout.jsx
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { LoginContext } from "@/contexts/LoginContext.jsx";

export default function Layout() {
  const [menuAberto, setMenuAberto] = useState(false);
  const {user, login} = useContext(LoginContext)

  return (
    <div className="flex flex-col min-h-screen">
      <Header menuAberto={menuAberto} setMenuAberto={setMenuAberto} />{" "}
      {/* Agora o Header cuida do seu próprio menu */}
      <main className="flex-1">
        <Outlet /> {/* Aqui as páginas serão renderizadas */}
      </main>
      <Footer />
    </div>
  );
}
