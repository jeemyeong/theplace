import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { FeedStore } from 'stores/feedStore';
import { AuthStore } from 'stores/authStore';
import Feeds from './Feeds';
import { ReviewType } from 'type/Review';
import { UserType } from 'type/User';
import withAppLayout from '../hoc/withAppLayout';

export interface FeedContainerProps {
  feedStore: FeedStore;
  authStore: AuthStore;
}

@inject('feedStore')
@inject('authStore')
@observer
class FeedContainer extends React.Component<FeedContainerProps, {}> {
  onSwipeLeft = (review: ReviewType.Review) => this.props.feedStore.passCard(review, this.props.authStore.state.userInfo as UserType)
  onSwipeRight = (review: ReviewType.Review) => this.props.feedStore.likeCard(review, this.props.authStore.state.userInfo as UserType)
  render() {
    const { feeds } = this.props.feedStore.state;
    const { userInfo } = this.props.authStore.state;
    return (
        <Feeds
          feeds={feeds}
          userInfo={userInfo as UserType}
          onSwipeLeft={this.onSwipeLeft}
          onSwipeRight={this.onSwipeRight}
        />
    );
  }
}

export default withAppLayout(FeedContainer);
