import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { FeedStore } from 'stores/feedStore';
import Feeds from './Feeds';
import { Feed } from 'type/Feed';

export interface FeedContainerProps {
  feedStore?: FeedStore;
}

@inject('feedStore')
@observer
class FeedContainer extends React.Component<FeedContainerProps, {}> {
  render() {
    const { state } = this.props.feedStore as FeedStore;
    const feeds: Feed[] = !!state ? state.feeds : [];
    return (
      <Feeds
        feeds={feeds}
      />
    );
  }
}

export default FeedContainer;
