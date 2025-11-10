import CardAtleta from "../componentes/componentesAtletas/CardAtleta.jsx";
import Titulo from "../componentes/Titulo.jsx";
import { useEffect, useState, useContext } from "react";
import { LoginContext } from "@/contexts/LoginContext.jsx";

export default function Atletas() {
    const { user } = useContext(LoginContext);
    const [featuredAthletes, setFeaturedAthletes] = useState([]);

    useEffect(() => {
        try {
            const stored = JSON.parse(localStorage.getItem("featuredAthletes") || "[]");
            setFeaturedAthletes(stored);
        } catch (e) {
            setFeaturedAthletes([]);
        }
    }, []);

    return (
        <>
            <Titulo
                title="Atletas Destaque"
                position="start"
                color="#300B74"
            />
            <div className="m-10">
                {featuredAthletes.length === 0 ? (
                    <p className="text-[#300B74]">Nenhuma atleta em destaque cadastrada.</p>
                ) : (
                    featuredAthletes.map((a) => (
                        <CardAtleta
                            key={a.id}
                            image={a.image || undefined}
                            nome={a.name}
                            idade={a.idade || ""}
                            posicao={a.position}
                            gols={a.gols || ""}
                            clube={a.team}
                        />
                    ))
                )}
            </div>
        </>
    );
}