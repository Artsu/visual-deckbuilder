import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { AppState } from '../stores/AppState';
import CardDropTarget from './CardDropTarget';
import DeckContainer from './DeckContainer';

import './styles/DeckBuilder.css';

@inject('appState')
@observer
@DragDropContext(HTML5Backend)
class DeckBuilder extends React.Component<{appState?: AppState}, {}> {

  render(): JSX.Element | null {
    return (
      <div className="deck-builder">
        <CardDropTarget>
          <DeckContainer deckContainer={this.props.appState!.deckContainers[0]} />
        </CardDropTarget>
        <CardDropTarget>
          <DeckContainer deckContainer={this.props.appState!.deckContainers[1]} />
        </CardDropTarget>
      </div>
    );
  }

}

export default DeckBuilder;