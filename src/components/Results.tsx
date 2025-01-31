import React from 'react';
import CardList from './CardList';

interface Person {
  name: string;
  birth_year: string;
}

interface ResultsProps {
  items: Person[];
  loading: boolean;
  error: string | null;
}

interface ResultsState {
  hasError: boolean;
}

class Results extends React.Component<ResultsProps, ResultsState> {
  constructor(props: ResultsProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  triggerError = (): void => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      throw new Error('Test error thrown by Results component.');
    }

    const { items, loading, error } = this.props;

    return (
      <div className="results-section">
        {loading ? (
          <div className="spinner">Loading...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <CardList items={items} />
        )}
        <button onClick={this.triggerError} className="error-button">
          Throw Error
        </button>
      </div>
    );
  }
}

export default Results;
