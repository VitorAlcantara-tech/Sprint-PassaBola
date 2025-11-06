import InfoUsers from "./InfoUsers";

const Player = ({ index, onChange }) => {
  // se não existir onChange (só pra evitar erro durante teste)
  if (!onChange) return null;

  return (
    <div className="border rounded-lg p-4 grid grid-cols-2 gap-3">
      <InfoUsers campo={`Nome da Jogadora ${index + 1}`} type="input" change={(e) => onChange("name", e.target.value)} />
      <InfoUsers campo="Documento (RG/CPF)" type="input" change={(e) => onChange("doc", e.target.value)} />
      <InfoUsers campo="Data de Nascimento" type="input" change={(e) => onChange("birth", e.target.value)} />
      <InfoUsers campo="Posição" type="input" change={(e) => onChange("position", e.target.value)} />
      <InfoUsers campo="Telefone" type="input" change={(e) => onChange("phone", e.target.value)} />
    </div>
  );
};

export default Player;
