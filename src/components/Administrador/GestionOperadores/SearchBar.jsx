import React, { useState } from "react";

const SearchBar = ({ onAddUser, onSearch, usuarios }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      onSearch("");
    } else {
      const filteredSuggestions = usuarios.filter(
        (user) =>
          (user.nombre &&
            user.nombre.toLowerCase().includes(value.toLowerCase())) ||
          (user.email &&
            user.email.toLowerCase().includes(value.toLowerCase()))
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setQuery(suggestion.nombre);
    setShowSuggestions(false);
    onSearch(suggestion.nombre);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setShowSuggestions(false);
      onSearch(query);
    }
  };

  return (
    <div className="relative flex items-center justify-between w-full mt-8 px-4">
      {/* Contenedor del input y sugerencias */}
      <div className="relative w-[392px]">
        {/* Input de búsqueda */}
        <div className="relative w-full h-8">
          <div className="absolute w-[31px] h-8">
            <div className="w-[31px] h-8 bg-[#FF5353] rounded-md shadow-md"></div>
            <div className="w-[13px] h-[13px] left-[7px] top-[8px] absolute bg-transparent rounded-full border border-white"></div>
            <div className="w-[9.22px] h-0 left-[18px] top-[19px] absolute origin-top-left rotate-[40.60deg] border border-white"></div>
          </div>

          <input
            type="text"
            placeholder="Buscar"
            className="w-full h-8 bg-white rounded-md shadow-md pl-10 text-black outline-none"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>

        {/* Lista de sugerencias */}
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute w-full bg-white mt-1 rounded-md max-h-[120px] overflow-y-auto z-50 border border-gray-300 shadow-lg">
            {suggestions.slice(0, 3).map((sug) => (
              <li
                key={sug._id}
                className="p-2 font-bold text-black cursor-pointer hover:bg-gray-200"
                onClick={() => handleSelectSuggestion(sug)}
              >
                {sug.nombre} {sug.email && `- ${sug.email}`}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Botón para agregar usuario */}
      <button
        className="bg-[#6A62DC] text-white px-4 py-2 rounded shadow-md"
        onClick={onAddUser}
      >
        Agregar Usuario
      </button>
    </div>
  );
};

export default SearchBar;
