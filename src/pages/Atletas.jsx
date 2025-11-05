import CardAtleta from "../componentes/componentesAtletas/CardAtleta.jsx";
import Titulo from "../componentes/Titulo.jsx";
import imagemJogadora from "../assets/imagemJogadora.png"
import imagemJogadora2 from "../assets/imagemJogadora2.jpg"
import imagemJogadora3 from "../assets/imagemJogadora3.jpg"
import imagemJogadora4 from "../assets/imagemJogadora4.jpg"
import { useContext } from "react";
import { LoginContext } from "@/contexts/LoginContext.jsx";

export default function Atletas() {

    const {user, login} = useContext(LoginContext)

    return (
        <>
            {user === null? console.log('FOI'): <></>}
            <Titulo
                title="Atletas Destaque"
                position="start"
                color="#300B74"
            />
            <div className="m-10">
                <CardAtleta
                    image={imagemJogadora}
                    nome="Camila Dantas"
                    idade="22"
                    posicao="Volante"
                    gols="10"
                    clube="Time A"
                />
                <CardAtleta
                    image={imagemJogadora2}
                    nome="Alexia Putellas"
                    idade="28"
                    posicao="Meia"
                    gols="20"
                    clube="Time B"
                />
                <CardAtleta
                    image={imagemJogadora3}
                    nome="Debinha"
                    idade="27"
                    posicao="Atacante"
                    gols="17"
                    clube="Time C"
                />
                <CardAtleta
                    image={imagemJogadora4}
                    nome="Racheal Kundananji"
                    idade="23"
                    posicao="Atacante"
                    gols="11"
                    clube="Time D"
                />
            </div>
        </>
    )
}