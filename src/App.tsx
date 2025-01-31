import React from 'react';
import Search from './components/Search';
import Results from './components/Results';

interface Person {
  name: string;
  birth_year: string;
}

interface AppState {
  searchTerm: string;
  items: Person[];
  loading: boolean;
  error: string | null;
}

class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: '',
      items: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount(): void {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    this.setState({ searchTerm: savedSearchTerm }, () => {
      this.fetchData();
    });
  }

  fetchData = (): void => {
    const { searchTerm } = this.state;
    const processedTerm = searchTerm.trim();
    const url = `https://swapi.dev/api/people/?search=${processedTerm}`;

    this.setState({ loading: true, error: null });

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          items: data.results,
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message,
          loading: false,
        });
      });
  };

  handleSearch = (newTerm: string): void => {
    const processedTerm = newTerm.trim();
    localStorage.setItem('searchTerm', processedTerm);
    this.setState({ searchTerm: processedTerm }, () => {
      this.fetchData();
    });
  };

  render() {
    const { items, loading, error } = this.state;

    return (
      <div className="app">
        <Search
          initialTerm={this.state.searchTerm}
          onSearch={this.handleSearch}
        />
        <Results items={items} loading={loading} error={error} />
      </div>
    );
  }
}

export default App;
