import React, { useEffect, useState } from 'react';

interface SearchProps {
  initialTerm: string;
  onSearch: (term: string) => void;
}

const Search: React.FC<SearchProps> = ({ initialTerm, onSearch }) => {
  const [inputValue, setInputValue] = useState(initialTerm);

  useEffect(() => {
    setInputValue(initialTerm);
  }, [initialTerm]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const processedTerm = inputValue.trim();
    onSearch(processedTerm);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  return (
    <form
      className="mb-8 flex flex-col items-stretch gap-2 sm:flex-row"
      onSubmit={handleFormSubmit}
    >
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search..."
        className="flex-1 rounded border border-gray-300 bg-white p-2"
      />
      <button
        type="submit"
        className="rounded border border-blue-600 px-4 py-2 text-blue-600 transition hover:bg-blue-600 hover:text-white"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
