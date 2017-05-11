import * as React from 'react';
import {Component, ReactElement, ReactNode} from 'react';
import { DragSource, ConnectDragSource, DragSourceMonitor, DragSourceConnector} from 'react-dnd';
import * as _ from 'lodash';

import Card from './Card';
import { CardProps } from './Card';

const dragSource = {
  beginDrag() { //props: {}
    return {};
  }
};

function collect(connect: DragSourceConnector, monitor: DragSourceMonitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

interface Props extends CardProps {
  connectDragSource?: ConnectDragSource;
  isDragging?: boolean;
  children?: ReactNode;
  context?: {};
}

@DragSource('CARD', dragSource, collect)
export default class DraggableCard extends Component<Props, ReactElement<any>> {

  render(): JSX.Element | null {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource!(
      <div style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move'
      }}>
        <Card {..._.omit(this.props, ['connectDragSource', 'isDragging'])} />
      </div>
    );
  }

}