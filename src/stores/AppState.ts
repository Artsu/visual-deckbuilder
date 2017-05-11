import { observable } from 'mobx';

import DeckContainerStore from './DeckContainerStore';

export class AppState {
  @observable deckContainers: DeckContainerStore[] = [new DeckContainerStore(), new DeckContainerStore()];

}

export default new AppState();