// src/pages/Cadastro.jsx
import InfoUsers from "../componentes/InfoUsers.jsx";
import Acesso from "../componentes/Acesso.jsx";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [atleta, setAtleta] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  function handleNewProfile(route) {
    if (!nome || !email || !senha) {
      alert("Preencha nome, e-mail e senha.");
      return;
    }

    const profiles = JSON.parse(localStorage.getItem("profiles") || "[]");
    profiles.push({ nome, atleta, email, senha });
    localStorage.setItem("profiles", JSON.stringify(profiles));
    navigate(route);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(to_bottom,#300B74_38%,#5A15DA_100%)] md:bg-[url('/mosaic-bg.png')] bg-cover bg-center md:bg-cover md:bg-center">
      <div className="flex flex-col p-8 gap-4 mx-4 my-16 bg-white/85 backdrop-blur rounded-3xl shadow-lg w-full max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-700 hover:opacity-80">
          <FaArrowLeft size={20} />
          <span>Voltar</span>
        </Link>

        <h1 className="font-Jockey text-[#300B74] text-4xl md:text-6xl mt-2">
          Faça o seu cadastro
        </h1>
        <p className="text-gray-600 -mt-2">Crie sua conta para continuar.</p>

        <div className="flex flex-col gap-5 mt-4">
          <InfoUsers campo="Nome" type="input" change={(e) => setNome(e.target.value)} />
          <InfoUsers campo="É atleta?" type="select" change={(e) => setAtleta(e.target.value)} />
          <InfoUsers campo="Email" type="input" change={(e) => setEmail(e.target.value)} />
          <InfoUsers campo="Senha" type="input" change={(e) => setSenha(e.target.value)} />
        </div>

        <div className="mt-4">
          <Acesso
            btn2="CADASTRAR"
            handle={() => handleNewProfile("/")}
          />
        </div>
      </div>
    </div>
  );
}
 