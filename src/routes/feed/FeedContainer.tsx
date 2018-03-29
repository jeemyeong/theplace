import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { FeedStore } from 'stores/feedStore';
import { AuthStore } from 'stores/authStore';
import Feeds from './Feeds';
import { ReviewType } from 'type/Review';
import { UserType } from 'type/User';
import withAppLayout from '../../layout/withAppLayout';
import { compose, withHandlers } from 'recompose';

export interface FeedContainerProps {
  feedStore: FeedStore;
  authStore: AuthStore;
}

const injectStores = compose(
  inject('feedStore'),
  inject('authStore'),
  observer
)

const enhance = compose<FeedContainerProps, {}>(
  withAppLayout,
  injectStores,
)

const FeedContainer = ({
  feedStore,
  authStore,
}: FeedContainerProps) => {
  const { feeds } = feedStore.state;
  const { userInfo } = authStore.state;
  const onSwipeLeft = (review: ReviewType.Review) => feedStore.passCard(review, authStore.state.userInfo as UserType);
  const onSwipeRight = (review: ReviewType.Review) => feedStore.likeCard(review, authStore.state.userInfo as UserType);
  return (
    <Feeds
      feeds={feeds}
      userInfo={userInfo as UserType}
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
    />
  )
}

export default enhance(FeedContainer);
