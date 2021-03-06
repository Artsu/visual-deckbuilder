import * as React from 'react';
import { Component } from 'react';
import Paper from 'material-ui/Paper';
import { observer } from 'mobx-react';
import '../styles/Card.css';

// import DeckContainerStore from '../stores/DeckContainerStore';

export type CardProps = {
  style?: {},
  width?: number,
  height?: number,
  onMouseOver?: () => void,
  onMouseOut?: () => void,
  // deckContainer?: DeckContainerStore,
};

@observer
class Card extends Component<CardProps, {}> {

  private cardStyles: React.CSSProperties;

  constructor(props: CardProps) {
    super(props);

    this.cardStyles = {
      width: `${this.props.width! + 10}px`,
      height: `${this.props.height! + 10}px`,
      borderRadius: '10px',
      padding: '5px',
      backgroundColor: 'transparent',
    };
  }

  render() {
    return (
      <Paper
        className="card"
        style={{...this.cardStyles, ...this.props.style}}
        zDepth={1}
        onMouseOver={this.props.onMouseOver}
        onMouseOut={this.props.onMouseOut}
        onDragOver={this.props.onMouseOver}
        onDragLeave={this.props.onMouseOut}
      >
        <img
          width={this.props.width}
          height={this.props.height}
          style={{margin: 'auto'}}
          src="/placeholder_card.jpeg"
        />
      </Paper>
    );
  }

}

export default Card;