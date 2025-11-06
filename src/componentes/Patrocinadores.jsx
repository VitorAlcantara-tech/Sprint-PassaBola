import Titulo from "./Titulo.jsx";
import logoAdidas from "../assets/adidas.png";
import logoGE from "../assets/ge.png";
import logoBrasa from "../assets/brasa.png";

export default function Patrocinadores() {
  return (
    <section className="mb-10">
      <Titulo title="Patrocinadores" position="start" color="#300B74" />
      <div className="gap-8 flex justify-center flex-wrap lg:gap-30 ">
        <img
          src={logoAdidas}
          alt="Adidas"
          className="w-50 lg:w-70 duration-300 hover:scale-105"
        />
        <img
          src={logoGE}
          alt="GE"
          className="w-50 lg:w-70 duration-300 hover:scale-105"
        />
        <img
          src={logoBrasa}
          alt="Brasa"
          className="w-50 lg:w-90 duration-300 hover:scale-105"
        />
      </div>
    </section>
  );
}
