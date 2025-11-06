import InfoUsers from "../../componentes/InfoUsers.jsx";
import Acesso from "../../componentes/Acesso.jsx";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


const InscricaoIndividual = () => {
    const [name, setName] = useState('')
    const [birth, setBirth] = useState('')
    const [doc, setDoc] = useState('')
    const [position, setPosition] = useState('')
    const [phone, setPhone] = useState('')
    const navigate = useNavigate();

    function handleSubscribe(route){
    if (!name || !birth || !doc || !position || !phone) {
      alert("Preencha todos os campos do formulário.");
      return;
    }

    const playersSub = JSON.parse(localStorage.getItem("players-sub") || "[]");
    playersSub.push({ name, birth, doc, position, phone });
    localStorage.setItem("players-sub", JSON.stringify(playersSub));
    navigate(route);
    }

    return (
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(to_bottom,#300B74_38%,#5A15DA_100%)] md:bg-[url('/mosaic-bg.png')] bg-cover bg-center md:bg-cover md:bg-center">
      <div className="flex flex-col p-10 gap-10 mx-4 my-20 bg-[#F9F9F9] rounded-4xl md:w-6xl md:items-center">
        <Link to="/" className="flex self-start">
          <FaArrowLeft size={30} />
        </Link>

        <h1 className="font-Jockey text-[#300B74] text-[64px] md:mt-10 md:text-[96px]">
          Formulário de Inscrição
        </h1>

        <div className="flex flex-col gap-6">
          <InfoUsers 
            campo="Nome" 
            type="input" 
            change={(e) => setName(e.target.value)}
          />
          <InfoUsers 
            campo="Data de Nascimento" 
            type="input"
            change={(e) => setBirth(e.target.value)}
          />
            <InfoUsers 
            campo="Documento (RG/CPF)" 
            type="input"
            change={(e) => setDoc(e.target.value)}
          />
            <InfoUsers 
            campo="Posição em Campo" 
            type="input"
            change={(e) => setPosition(e.target.value)}
          />
            <InfoUsers 
            campo="Telefone para contato" 
            type="input"
            change={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="flex justify-around min-w-[80%] mb-10">
          <button
            onClick={() => {navigate('/time')}}
            className="flex items-center justify-center bg-[#44159a] duration-200 cursor-pointer hover:bg-[#300B74] text-white font-Rambla w-[220px] h-[62px] text-[20px] rounded-full hover:shadow-xl transform hover:scale-105 transition"
          >
            Formulário para times
          </button>
          <button
            onClick={() => handleSubscribe('/')}
            className="flex items-center justify-center bg-[#44159a] duration-200 cursor-pointer hover:bg-[#300B74] text-white font-Rambla w-[220px] h-[62px] text-[20px] rounded-full hover:shadow-xl transform hover:scale-105 transition"
          >
            Inscrever-se
          </button>
        </div>
      </div>
    </div>
    )
}

export default InscricaoIndividual