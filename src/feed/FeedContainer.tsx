import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { FeedStore } from 'stores/feedStore';
import Feeds from './Feeds';
import { ReviewType } from 'type/Review';
import * as csstips from 'csstips';
import { style } from 'typestyle';

export interface FeedContainerProps {
  feedStore: FeedStore;
}

@inject('feedStore')
@observer
class FeedContainer extends React.Component<FeedContainerProps, {}> {
  render() {
    const { feeds } = this.props.feedStore.state;
    return (
      <Feeds
        feeds={feeds}
      />
    );
  }
}

export default FeedContainer;
