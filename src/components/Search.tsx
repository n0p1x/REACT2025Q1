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
      <form className="search-section" onSubmit={this.handleFormSubmit}>
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default Search;
