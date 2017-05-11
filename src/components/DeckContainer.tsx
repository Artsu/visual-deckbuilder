import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import DeckContainerStore from '../stores/DeckContainerStore';
import { observer } from 'mobx-react';

import './styles/DeckContainer.css';

import DraggableCard from './card/DraggableCard';

const ORIGINAL_CARD_DIMENSIONS = {
  width: 223,
  height: 311,
};

const CARD_SIZE_ADJUSTMENT = 0.8;

const cardDimensions = {
  width: ORIGINAL_CARD_DIMENSIONS.width * CARD_SIZE_ADJUSTMENT,
  height: ORIGINAL_CARD_DIMENSIONS.height * CARD_SIZE_ADJUSTMENT,
};

interface DeckContainerState {
  containerWidth: number;
}

const CONTAINER_MARGIN = 20;
const HOVER_CARD_LEFT_MARGIN = 40;
const SPACE_BETWEEN_HOVER_CARD_AND_NEXT = 10;

@observer
class DeckContainer extends React.Component<{deckContainer: DeckContainerStore}, DeckContainerState> {

  container: Paper;

  constructor(props: {deckContainer: DeckContainerStore}) {
    super(props);

    this.state = {
      containerWidth: 0,
    };
  }

  componentDidMount() {
    const containerWidth: number = ReactDOM.findDOMNode<HTMLElement>(this.container).offsetWidth;
    this.setState({
      containerWidth,
    });
  }

  onCardHover(index: number) {
    return () => {
      this.props.deckContainer.hoverIndex = index;
    };
  }

  onCardHoverOut() {
    this.props.deckContainer.hoverIndex = -1;
  }

  adjustContainerWidthForHoveredCards(containerWidthForCards: number) {
    const cardCount = this.props.deckContainer.cards.length;
    const hoverIndex = this.props.deckContainer.hoverIndex;

    /*
     * Last card stays in place while hovering any card, so while any other card is hovered,
     * we remove the last card width from the container width. This is to avoid cards pushing
     * through the right border.
     */
    if (hoverIndex !== (cardCount - 1)) {
      containerWidthForCards -= (cardDimensions.width - (HOVER_CARD_LEFT_MARGIN - SPACE_BETWEEN_HOVER_CARD_AND_NEXT));
    }

    /*
     * Previous card from the hovered one is shown a bit more than the rest so we need to remove
     * that margin from the container width.
     */
    if (hoverIndex !== 0) {
      containerWidthForCards -= HOVER_CARD_LEFT_MARGIN;
    }

    return containerWidthForCards;
  }

  adjustVisibleCardSizeForHoveredCards(containerWidthForCards: number) {
    /*
     * Last card stays in place while hovering any card, so while some other card is hovered,
     * we adjust the visible card size to be calculated without the last card.
     */
    return (containerWidthForCards) / (this.props.deckContainer.cards.length - 1);
  }

  calculateAfterHoverMargin(cardsFitArea: boolean, index: number) {
    const hoverIndex = this.props.deckContainer.hoverIndex;
    const cardIsHovered = hoverIndex >= 0;

    let afterHoverMargin = 0;
    if (cardIsHovered && !cardsFitArea) {

      /*
       * Previous card from the hovered one is shown a bit more than the rest so pushing
       * all cards from hover onwards a bit.
       */
      if (hoverIndex === index && hoverIndex !== 0) {
        afterHoverMargin += HOVER_CARD_LEFT_MARGIN;
      }

      /*
       * Hovered card is fully visible so pushing the ones after with card width amount.
       */
      if (hoverIndex < index) {
        afterHoverMargin += (cardDimensions.width + SPACE_BETWEEN_HOVER_CARD_AND_NEXT);
        if (hoverIndex === 0) {
          afterHoverMargin -= HOVER_CARD_LEFT_MARGIN;
        }
      }
    }

    return afterHoverMargin;
  }

  renderPlaceholderCards() {
    const hoverIndex = this.props.deckContainer.hoverIndex;
    const cardIsHovered = hoverIndex >= 0;
    let cardsFitArea = true;

    let containerWidthForCards = this.state.containerWidth - (CONTAINER_MARGIN * 2) - cardDimensions.width;
    let visibleCardSize = containerWidthForCards / (this.props.deckContainer.cards.length - 1);

    cardsFitArea = visibleCardSize > cardDimensions.width;

    if (cardIsHovered && !cardsFitArea) {
      containerWidthForCards = this.adjustContainerWidthForHoveredCards(containerWidthForCards);
      visibleCardSize = this.adjustVisibleCardSizeForHoveredCards(containerWidthForCards);
    }

    return this.props.deckContainer.cards.map((card, index) => {
      const afterHoverMargin = this.calculateAfterHoverMargin(cardsFitArea, index);

      const push = visibleCardSize < cardDimensions.width
        ? visibleCardSize * index
        : cardDimensions.width * index;

      return (
        <DraggableCard
          key={index}
          style={{
            position: 'absolute',
            left: `${CONTAINER_MARGIN + push + afterHoverMargin}px`,
          }}
          width={cardDimensions.width}
          height={cardDimensions.height}
          onMouseOver={this.onCardHover(index)}
          onMouseOut={() => { this.onCardHoverOut(); }}
        />
      );
    });
  }

  render() {
    return (
      <Paper className="deck-container" zDepth={1} ref={(container) => { this.container = container; }}>
        {this.renderPlaceholderCards()}
      </Paper>
    );
  }

}

export default DeckContainer;