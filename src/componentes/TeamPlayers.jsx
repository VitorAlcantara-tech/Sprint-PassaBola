import { useState } from "react";
import Player from "./Player";

const TeamPlayers = ({ onPlayersChange }) => {
  const [players, setPlayers] = useState([{ id: 1 }]);

  function handleNew() {
    setPlayers([...players, { id: Date.now() }]);
  }

  function handlePlayerChange(index, field, value) {
    const updated = players.map((p, i) =>
      i === index ? { ...p, [field]: value } : p
    );
    setPlayers(updated);
    if (onPlayersChange) onPlayersChange(updated);
  }

  function handleRemove(index) {
    const updated = players.filter((_, i) => i !== index);
    setPlayers(updated);
    if (onPlayersChange) onPlayersChange(updated);
  }

  return (
    <div className="flex flex-col gap-6 mt-10 min-w-2xl">
        <div className="flex items-center justify-between border-b-2 border-[#300B74] pb-3">
            <h3 className="font-Jockey text-[#300B74] text-[32px] md:text-[52px] leading-none">
            Jogadoras
            </h3>
            <button
            onClick={handleNew}
            className="bg-[#5A15DA] text-white font-medium rounded-xl px-5 py-3 hover:bg-[#4b11b8] transition-all duration-200"
            >
            + Adicionar Jogadora
            </button>
        </div>
    
        {players.map((player, index) => (
            <Player
            key={player.id}
            index={index}
            onChange={(field, value) => handlePlayerChange(index, field, value)}
            onRemove={handleRemove}
            />
        ))}
    </div>
  );
};

export default TeamPlayers;
