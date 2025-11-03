export default function InfoUsers({ campo, type, change }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-Jockey text-[#300B74] text-[25px] md:text-[24px] ml-2">
        {campo}
      </h3>
      {type === "select" ? (
        <select onChange={change} className="font-Raleway text-[#736B81] border-[0.5px] rounded-2xl p-2 border-[#A7A7A7] md:text-[25px]">
          <option value="" disabled selected>
            Selecione...
          </option>
          <option value="sim">Sim</option>
          <option value="nao">Não</option>
        </select>
      ) : (
        <input
          onChange={change}
          className="font-Raleway text-[16px] text-[#736B81] border-[0.5px] rounded-2xl p-2 border-[#A7A7A7] placeholder:text-[16px] md:text-[25px] md:placeholder:text-xl md:w-2xl"
          type="text"
          placeholder={`Digite seu ${campo.toLowerCase()}`}
        />
      )}
    </div>
  );
}
