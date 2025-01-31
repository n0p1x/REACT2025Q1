import React from 'react';
import Card from './Card';

interface Person {
  name: string;
  birth_year: string;
}

interface CardListProps {
  items: Person[];
}

class CardList extends React.Component<CardListProps> {
  render() {
    const { items } = this.props;

    return (
      <div className="card-list">
        {items.map((item) => (
          <Card
            key={item.name}
            name={item.name}
            description={`Born in ${item.birth_year}`}
          />
        ))}
      </div>
    );
  }
}

export default CardList;
