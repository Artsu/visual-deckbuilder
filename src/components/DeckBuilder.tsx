import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { AppState } from '../stores/AppState';
import DeckContainer from './DeckContainer';

import './styles/DeckBuilder.css';

@inject('appState')
@observer
@DragDropContext(HTML5Backend)
class DeckBuilder extends React.Component<{appState?: AppState}, {}> {

  render(): JSX.Element | null {
    return (
      <div className="deck-builder">
        <DeckContainer deckContainer={this.props.appState!.deckContainers[0]} />
        <DeckContainer deckContainer={this.props.appState!.deckContainers[1]} />
      </div>
    );
  }

}

export default DeckBuilder;