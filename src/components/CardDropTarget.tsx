import * as React from 'react';
import { ReactElement, ReactNode } from 'react';
import { DropTarget } from 'react-dnd';
import { ConnectDropTarget, DropTargetMonitor, DropTargetConnector} from 'react-dnd';

const dropTarget = {
  hover( props: any, monitor: any, component: any) { //
    console.log('props', props);
    console.log('monitor', monitor);
    console.log('component', component);
    // console.log('Document.elementsFromPoint()', Document.elementFromPoint());
  },
  // drop(props, monitor, component) {
};

const collect = (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
  // Call this function inside render()
  // to let React DnD handle the drag events:
  connectDropTarget: connect.dropTarget(),
  // You can ask the monitor about the current drag state:
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType()
});

type Props = {
  connectDropTarget?: ConnectDropTarget;
  isDragging?: boolean;
  children?: ReactNode;
  context?: {};
};

@DropTarget('CARD', dropTarget, collect)
class CardDropTarget extends React.Component<Props, ReactElement<{}>> {

  render(): JSX.Element | null  {
    const { connectDropTarget } = this.props;
    return connectDropTarget!(
      <div>
        {this.props.children}
      </div>
    );
  }

}

export default CardDropTarget;