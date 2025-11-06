import React, { useState } from "react";
import { FaUserFriends, FaFutbol, FaStar } from "react-icons/fa";

export default function Dashboard() {
  // Mock inicial – depois você pode trocar por dados da API
  const [athletesCount, setAthletesCount] = useState(128);

  const [games, setGames] = useState([
    { id: 1, date: "10/08", time: "19:00", teamA: "Time A", teamB: "Time B", round: "Quartas" },
    { id: 2, date: "12/08", time: "21:00", teamA: "Time C", teamB: "Time D", round: "Semifinal" },
  ]);

  const [featuredAthletes, setFeaturedAthletes] = useState([
    { id: 1, name: "Maria Silva", team: "Time A", position: "Atacante" },
    { id: 2, name: "Ana Souza", team: "Time B", position: "Goleira" },
  ]);

  const [newGame, setNewGame] = useState({
    date: "",
    time: "",
    teamA: "",
    teamB: "",
    round: "",
  });

  const [newAthlete, setNewAthlete] = useState({
    name: "",
    team: "",
    position: "",
  });

  function handleAddGame(e) {
    e.preventDefault();
    if (!newGame.date || !newGame.time || !newGame.teamA || !newGame.teamB) return;

    setGames((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        ...newGame,
      },
    ]);

    setNewGame({ date: "", time: "", teamA: "", teamB: "", round: "" });
  }

  function handleAddAthlete(e) {
    e.preventDefault();
    if (!newAthlete.name || !newAthlete.team) return;

    setFeaturedAthletes((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        ...newAthlete,
      },
    ]);

    setFeaturedAthletes((prev) => prev);
    setAthletesCount((prev) => prev + 1);
    setNewAthlete({ name: "", team: "", position: "" });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#561EBD] to-[#240675] text-white px-6 py-10">
      {/* Título */}
      <header className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl md:text-4xl font-Jockey uppercase tracking-widest">
          Dashboard da Copa
        </h1>
        <p className="mt-2 text-sm md:text-base text-white/80">
          Área exclusiva para administração dos campeonatos, jogos e atletas em destaque.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-10">
        {/* Cards de métricas */}
        <section className="grid gap-5 md:grid-cols-3">
          <div className="bg-white/10 backdrop-blur rounded-xl p-5 flex items-center gap-4 shadow-lg">
            <div className="p-3 rounded-full bg-pink-500/80">
              <FaUserFriends size={24} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-white/70">
                Atletas inscritas na Copa
              </p>
              <p className="text-2xl font-bold">{athletesCount}</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-xl p-5 flex items-center gap-4 shadow-lg">
            <div className="p-3 rounded-full bg-green-500/80">
              <FaFutbol size={24} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-white/70">
                Jogos cadastrados
              </p>
              <p className="text-2xl font-bold">{games.length}</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-xl p-5 flex items-center gap-4 shadow-lg">
            <div className="p-3 rounded-full bg-yellow-400/80">
              <FaStar size={24} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-white/70">
                Atletas em destaque
              </p>
              <p className="text-2xl font-bold">{featuredAthletes.length}</p>
            </div>
          </div>
        </section>

        {/* Grid principal: jogos + atletas em destaque */}
        <section className="grid gap-8 lg:grid-cols-2">
          {/* Jogos */}
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-Jockey uppercase tracking-widest mb-4">
              Jogos da Copa
            </h2>

            <div className="max-h-60 overflow-y-auto rounded-md border border-white/10 mb-4">
              <table className="w-full text-sm">
                <thead className="bg-white/10 text-left text-xs uppercase tracking-widest">
                  <tr>
                    <th className="px-3 py-2">Data</th>
                    <th className="px-3 py-2">Hora</th>
                    <th className="px-3 py-2">Times</th>
                    <th className="px-3 py-2">Fase</th>
                  </tr>
                </thead>
                <tbody>
                  {games.map((game) => (
                    <tr
                      key={game.id}
                      className="odd:bg-white/5 even:bg-white/0"
                    >
                      <td className="px-3 py-2">{game.date}</td>
                      <td className="px-3 py-2">{game.time}</td>
                      <td className="px-3 py-2">
                        {game.teamA} x {game.teamB}
                      </td>
                      <td className="px-3 py-2">{game.round || "-"}</td>
                    </tr>
                  ))}
                  {games.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-3 py-4 text-center text-white/70"
                      >
                        Nenhum jogo cadastrado ainda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Formulário para adicionar jogo */}
            <form
              onSubmit={handleAddGame}
              className="grid gap-3 md:grid-cols-2 mt-4"
            >
              <input
                type="text"
                placeholder="Data (ex: 10/08)"
                value={newGame.date}
                onChange={(e) =>
                  setNewGame((g) => ({ ...g, date: e.target.value }))
                }
                className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm outline-none focus:border-white"
              />
              <input
                type="text"
                placeholder="Hora (ex: 19:00)"
                value={newGame.time}
                onChange={(e) =>
                  setNewGame((g) => ({ ...g, time: e.target.value }))
                }
                className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm outline-none focus:border-white"
              />
              <input
                type="text"
                placeholder="Time A"
                value={newGame.teamA}
                onChange={(e) =>
                  setNewGame((g) => ({ ...g, teamA: e.target.value }))
                }
                className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm outline-none focus:border-white"
              />
              <input
                type="text"
                placeholder="Time B"
                value={newGame.teamB}
                onChange={(e) =>
                  setNewGame((g) => ({ ...g, teamB: e.target.value }))
                }
                className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm outline-none focus:border-white"
              />
              <input
                type="text"
                placeholder="Fase (ex: Quartas, Final...)"
                value={newGame.round}
                onChange={(e) =>
                  setNewGame((g) => ({ ...g, round: e.target.value }))
                }
                className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm outline-none focus:border-white md:col-span-2"
              />
              <button
                type="submit"
                className="md:col-span-2 bg-white text-[#561EBD] font-semibold rounded-md py-2 text-sm hover:bg-gray-100 transition-colors"
              >
                Adicionar jogo
              </button>
            </form>
          </div>

          {/* Atletas em destaque */}
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-Jockey uppercase tracking-widest mb-4">
              Atletas em Destaque
            </h2>

            <ul className="space-y-2 max-h-60 overflow-y-auto mb-4">
              {featuredAthletes.map((athlete) => (
                <li
                  key={athlete.id}
                  className="flex items-center gap-3 bg-white/5 rounded-md px-3 py-2"
                >
                  <div className="w-8 h-8 rounded-full bg-yellow-400/80 flex items-center justify-center text-[#561EBD] font-bold text-sm">
                    <FaStar />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{athlete.name}</p>
                    <p className="text-xs text-white/70">
                      {athlete.team} • {athlete.position || "Posição não informada"}
                    </p>
                  </div>
                </li>
              ))}
              {featuredAthletes.length === 0 && (
                <p className="text-white/70 text-sm">
                  Nenhuma atleta em destaque ainda.
                </p>
              )}
            </ul>

            {/* Formulário para adicionar atleta destaque */}
            <form onSubmit={handleAddAthlete} className="grid gap-3">
              <input
                type="text"
                placeholder="Nome da atleta"
                value={newAthlete.name}
                onChange={(e) =>
                  setNewAthlete((a) => ({ ...a, name: e.target.value }))
                }
                className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm outline-none focus:border-white"
              />
              <input
                type="text"
                placeholder="Time"
                value={newAthlete.team}
                onChange={(e) =>
                  setNewAthlete((a) => ({ ...a, team: e.target.value }))
                }
                className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm outline-none focus:border-white"
              />
              <input
                type="text"
                placeholder="Posição (ex: Atacante)"
                value={newAthlete.position}
                onChange={(e) =>
                  setNewAthlete((a) => ({ ...a, position: e.target.value }))
                }
                className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm outline-none focus:border-white"
              />
              <button
                type="submit"
                className="bg-white text-[#561EBD] font-semibold rounded-md py-2 text-sm hover:bg-gray-100 transition-colors"
              >
                Adicionar atleta em destaque
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
