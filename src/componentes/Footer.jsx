import logo from "../assets/Logotipo-PassaBola-Branco.png"
import { FaInstagram, FaXTwitter, FaYoutube, FaTiktok } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="bg-[#540FD4] text-white mt-0">
            {/* topo decorativo opcional */}
            <div className="h-[3px] bg-[linear-gradient(90deg,_#2C086E_0%,_#540FD4_50%,_#300B74_100%)]" />

            <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-2">
                {/* Marca + redes */}
                <div>
                    <img src={logo} alt="Logotipo Passa a Bola" className="w-40" />
                    <p className="mt-4 text-sm text-white/80">
                        Notícias, tabelas e cobertura dos campeonatos de futebol feminino.
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                        <a href="#" aria-label="Instagram" className="p-2 rounded-full bg-white/10 hover:bg-white/20">
                            <FaInstagram />
                        </a>
                        <a href="#" aria-label="X/Twitter" className="p-2 rounded-full bg-white/10 hover:bg-white/20">
                            <FaXTwitter />
                        </a>
                        <a href="#" aria-label="YouTube" className="p-2 rounded-full bg-white/10 hover:bg-white/20">
                            <FaYoutube />
                        </a>
                        <a href="#" aria-label="TikTok" className="p-2 rounded-full bg-white/10 hover:bg-white/20">
                            <FaTiktok />
                        </a>
                    </div>
                </div>

                
                <nav className="text-sm">
                    <h4 className="font-semibold uppercase tracking-wide">Links</h4>
                    <ul className="mt-3 space-y-2">
                        <li><a href="/home" className="hover:underline">Home</a></li>
                        <li><a href="/campeonatos" className="hover:underline">Campeonatos</a></li>
                        <li><a href="/jogos" className="hover:underline">Jogos</a></li>
                        <li><a href="/atletas" className="hover:underline">Atletas</a></li>
                        <li><a href="/noticias" className="hover:underline">Notícias</a></li>
                    </ul>
                </nav>

              
                <nav className="text-sm">
                    <h4 className="font-semibold uppercase tracking-wide">Campeonatos</h4>
                    <ul className="mt-3 space-y-2">
                        <li><a href="#" className="hover:underline">Brasileirão Feminino</a></li>
                        <li><a href="#" className="hover:underline">Copa do Brasil</a></li>
                        <li><a href="#" className="hover:underline">Libertadores Feminina</a></li>
                        <li><a href="#" className="hover:underline">Copa América</a></li>
                        <li><a href="#" className="hover:underline">Amistosos</a></li>
                    </ul>
                </nav>

                
                <div className="text-sm">
                    <h4 className="font-semibold uppercase tracking-wide">Assine a newsletter</h4>
                    <p className="mt-3 text-white/80">
                        Receba gols, resultados e destaques no seu e-mail.
                    </p>
                    <form className="mt-4 flex flex-col gap-2">
                        <input
                            type="email"
                            required
                            placeholder="Seu e-mail"
                            className="flex-1 rounded-md px-2 py-2 bg-white/10 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                        />
                        <button className="w-3/6 rounded-md px-2 py-2 md:text-[12px] bg-white text-[#540FD4] font-semibold hover:bg-white/90">
                            Assinar
                        </button>
                    </form>
                    <p className="mt-2 text-xs text-white/60">
                        Ao assinar, você concorda com nossos <a href="#" className="underline">Termos</a> e <a href="#" className="underline">Privacidade</a>.
                    </p>
                </div>
            </div>

            {/* barra inferior */}
            <div className="border-t border-white/15">
                <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col md:flex-row items-center justify-between text-xs text-white/70">
                    <p>© {new Date().getFullYear()} Passa a Bola. Todos os direitos reservados.</p>
                    <div className="flex gap-6 mt-2 md:mt-0">
                        <a href="#" className="hover:text-white">Contato</a>
                        <a href="#" className="hover:text-white">Termos</a>
                        <a href="#" className="hover:text-white">Privacidade</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}