import { observable } from 'mobx';

export default class DeckContainerStore {
  @observable hoverIndex = -1;
  @observable cards = Array(10).fill(null);

  // @computed get completedTodosCount() {
  //   return this.todos.filter(
  //     todo => todo.completed === true
  //   ).length;
  // }

}
