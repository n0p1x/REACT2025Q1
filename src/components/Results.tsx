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
      <div className="h-[calc(100vh-13rem)] overflow-y-auto border border-gray-300">
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-600">{error}</div>
        ) : (
          <CardList items={items} />
        )}
        <button
          onClick={this.triggerError}
          className="absolute right-8 bottom-8 rounded border border-red-600 px-4 py-2 text-red-600 transition hover:bg-red-600 hover:text-white"
        >
          Throw Error
        </button>
      </div>
    );
  }
}

export default Results;
