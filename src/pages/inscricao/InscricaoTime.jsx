import InfoUsers from "../../componentes/InfoUsers.jsx";
import Acesso from "../../componentes/Acesso.jsx";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import TeamPlayers from "@/componentes/TeamPlayers.jsx";

const InscricaoTime = () => {
  const [nameTeam, setNameTeam] = useState("");
  const [category, setCategory] = useState("");
  const [obs, setObs] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [doc, setDoc] = useState("");
  const [phone, setPhone] = useState("");

  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  function handleSubscribe(route) {
    if (!nameTeam || !category || !doc || !name || !email || !phone) {
      alert("Preencha todos os campos necessários do formulário.");
      return;
    }

    const teamSub = JSON.parse(localStorage.getItem("team-sub") || "[]");
    teamSub.push({
      nameTeam,
      category,
      obs,
      responsavel: { name, email, doc, phone },
      jogadoras: players,
    });
    localStorage.setItem("team-sub", JSON.stringify(teamSub));

    const playersSub = JSON.parse(localStorage.getItem("players-sub") || "[]");
    const updatedPlayersSub = [...playersSub, ...players];
    localStorage.setItem("players-sub", JSON.stringify(updatedPlayersSub));

    navigate(route);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(to_bottom,#300B74_38%,#5A15DA_100%)] md:bg-[url('/mosaic-bg.png')] bg-cover bg-center md:bg-cover md:bg-center">
      <div className="flex flex-col p-10 gap-10 mx-4 my-20 bg-[#F9F9F9] rounded-4xl md:w-6xl md:items-center">
        <Link to="/" className="flex self-start">
          <FaArrowLeft size={30} />
        </Link>

        <h1 className="font-Jockey text-[#300B74] text-[64px] md:mt-10 md:text-[96px]">
          Inscrição de Time – Copa Passa a Bola
        </h1>

        <div className="flex flex-col gap-6 border border-[#000000] rounded-sm p-8">
          <h3 className="font-Jockey text-[#300B74] text-[32px] md:mt-10 md:text-[52px]">Dados do Time</h3>
          <InfoUsers campo="Nome do Time" type="input" change={(e) => setNameTeam(e.target.value)} />
          <InfoUsers campo="Categoria" type="input" change={(e) => setCategory(e.target.value)} />
          <InfoUsers campo="Logo/Escudo do time" type="input" change={() => null} />
          <InfoUsers campo="Observações (opcional)" type="input" change={(e) => setObs(e.target.value)} />
        </div>

        <div className="flex flex-col gap-6 border border-[#000000] rounded-sm p-8">
          <h3 className="font-Jockey text-[#300B74] text-[32px] md:mt-10 md:text-[52px]">Responsável/Técnico</h3>
          <InfoUsers campo="Nome" type="input" change={(e) => setName(e.target.value)} />
          <InfoUsers campo="Email" type="input" change={(e) => setEmail(e.target.value)} />
          <InfoUsers campo="Documento (RG/CPF)" type="input" change={(e) => setDoc(e.target.value)} />
          <InfoUsers campo="Telefone para contato" type="input" change={(e) => setPhone(e.target.value)} />
        </div>

        <TeamPlayers onPlayersChange={setPlayers} />
        <div className="flex justify-around min-w-[80%] mb-10">
          <button
            onClick={() => navigate("/individual")}
            className="flex items-center justify-center bg-[#44159a] duration-200 cursor-pointer hover:bg-[#300B74] text-white font-Rambla w-[220px] h-[62px] text-[20px] rounded-full hover:shadow-xl transform hover:scale-105 transition"
          >
            Formulário Individual
          </button>
          <button
            onClick={() => handleSubscribe("/")}
            className="flex items-center justify-center bg-[#44159a] duration-200 cursor-pointer hover:bg-[#300B74] text-white font-Rambla w-[220px] h-[62px] text-[20px] rounded-full hover:shadow-xl transform hover:scale-105 transition"
          >
            Inscrever-se
          </button>
        </div>
      </div>
    </div>
  );
};

export default InscricaoTime;
