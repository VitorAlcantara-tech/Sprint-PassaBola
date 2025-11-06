import InfoUsers from "../../componentes/InfoUsers.jsx";
import Acesso from "../../componentes/Acesso.jsx";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


const InscricaoTime = () => {
    const [nameTeam, setNameTeam] = useState('')
    const [category, setCategory] = useState('')
    const [obs, setObs] = useState('')

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [doc, setDoc] = useState('')
    const [phone, setPhone] = useState('')
    const navigate = useNavigate();

    function handleSubscribe(route){
    if (!name || !category || !doc || !nameTeam || !phone || !name || !email) {
      alert("Preencha todos os campos do necessários do formulário.");
      return;
    }

    const teamSub = JSON.parse(localStorage.getItem("team-sub") || "[]");
    teamSub.push({ nameTeam, category, obs, 'responsavel': {name, email, doc, phone}});
    localStorage.setItem("team-sub", JSON.stringify(teamSub));
    navigate(route);
    }

    return (
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(to_bottom,#300B74_38%,#5A15DA_100%)] md:bg-[url('/mosaic-bg.png')] bg-cover bg-center md:bg-cover md:bg-center">
      <div className="flex flex-col p-10 gap-10 mx-4 my-20 bg-[#F9F9F9] rounded-4xl h-[759px] md:w-6xl md:h-[759px] md:items-center">
        <Link to="/" className="flex self-start">
          <FaArrowLeft size={30} />
        </Link>

        <h1 className="font-Jockey text-[#300B74] text-[64px] md:mt-10 md:text-[96px]">
          Inscrição de Time – Copa Passa a Bola
        </h1>

        <div className="flex flex-col gap-6 border-2 rounded-sm p-8 md:grid grid-cols-2">
          <InfoUsers 
            campo="Nome do Time" 
            type="input" 
            change={(e) => setNameTeam(e.target.value)}
          />
          <InfoUsers 
            campo="Categoria" 
            type="input"
            change={(e) => setCategory(e.target.value)}
          />
            <InfoUsers 
            campo="Logo/Escudo do time" 
            type="input"
            change={(e) => null}
          />
            <InfoUsers 
            campo="Observações (opcional)" 
            type="input"
            change={(e) => setObs(e.target.value)}
          />
        </div>

        {/*parte do tecnico (Primeiro comentário da vida, ass Thiago)*/} 
        <div className="flex flex-col gap-6 md:grid grid-cols-2">
          <InfoUsers 
            campo="Nome" 
            type="input" 
            change={(e) => setName(e.target.value)}
          />
          <InfoUsers 
            campo="Email" 
            type="input"
            change={(e) => setEmail(e.target.value)}
          />
            <InfoUsers 
            campo="Documento (RG/CPF)" 
            type="input"
            change={(e) => setDoc(e.target.value)}
          />
            <InfoUsers 
            campo="Telefone para contato" 
            type="input"
            change={(e) => setPhone(e.target.value)}
          />
        </div>

        <Acesso btn2="Formulário Individual" handle={() => {navigate('/individual')}}/>
        <Acesso btn2="Inscrever-se" handle={() => handleSubscribe('/')} />
      </div>
    </div>
    )
}

export default InscricaoTime