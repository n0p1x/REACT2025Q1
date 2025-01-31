import React from 'react';

interface CardProps {
  name: string;
  description: string;
}

class Card extends React.Component<CardProps> {
  render() {
    return (
      <div className="card">
        <h3>{this.props.name}</h3>
        <p>{this.props.description}</p>
      </div>
    );
  }
}

export default Card;
