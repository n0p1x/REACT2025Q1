import React from 'react';

interface SearchProps {
  initialTerm: string;
  onSearch: (term: string) => void;
}

interface SearchState {
  inputValue: string;
}

class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      inputValue: props.initialTerm,
    };
  }

  componentDidUpdate(prevProps: SearchProps) {
    if (prevProps.initialTerm !== this.props.initialTerm) {
      this.setState({ inputValue: this.props.initialTerm });
    }
  }

  handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.handleSearchClick();
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ inputValue: e.target.value });
  };

  handleSearchClick = (): void => {
    const processedTerm = this.state.inputValue.trim();
    this.props.onSearch(processedTerm);
  };

  render() {
    return (
      <form
        className="mb-8 flex flex-col items-stretch gap-2 sm:flex-row"
        onSubmit={this.handleFormSubmit}
      >
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          placeholder="Search..."
          className="flex-1 rounded border border-gray-300 p-2"
        />
        <button
          type="submit"
          className="rounded border border-blue-600 px-4 py-2 text-blue-600 transition hover:bg-blue-600 hover:text-white"
        >
          Search
        </button>
      </form>
    );
  }
}

export default Search;
