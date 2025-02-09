import React from 'react';

interface CardProps {
  name: string;
  description: string;
}

class Card extends React.Component<CardProps> {
  render() {
    return (
      <div className="rounded border-t border-b border-gray-300 bg-white p-4">
        <h3 className="text-xl font-semibold text-gray-800">
          {this.props.name}
        </h3>
        <p className="text-gray-600">{this.props.description}</p>
      </div>
    );
  }
}

export default Card;
