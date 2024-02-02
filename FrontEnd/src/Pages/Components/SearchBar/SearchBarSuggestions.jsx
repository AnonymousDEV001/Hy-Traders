import React, { useEffect, useState } from "react";

function SearchBarSuggestions({ search, onChange }) {
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const getSuggestions = async () => {
      const url = `http://127.0.0.1:8000/api/suggestions/?keyword=${search}`;
      let response = await fetch(url);
      response = await response.json();
      setSuggestions(response);
    };

    if (suggestions.length === 1 && suggestions[0].keyword === search) {
      setSuggestions([]);
    } else if (search.length === 0) {
      setSuggestions([]);
    } else if (search.length !== 0) {
      getSuggestions();
    }
  }, [search]);
  return (
    <div>
      <div
        className={`${
          suggestions.length == 0 && "hidden"
        } absolute w-full my-1 shadow-sm shadow-slate-400 rounded-md bg-white`}
      >
        <div className="flex flex-col gap-2 p-2">
          {suggestions.map((suggestion) => {
            return (
              <div
                onClick={() => {
                  onChange(suggestion.keyword);
                  setSuggestions([suggestion]);
                }}
                className="p-2 hover:text-cyan-400 rounded-md cursor-pointer"
              >
                <span>{suggestion.keyword}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SearchBarSuggestions;
