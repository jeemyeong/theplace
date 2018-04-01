import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { FeedStore } from 'stores/feedStore';
import { AuthStore } from 'stores/authStore';
import { ReviewType } from 'type/Review';
import { UserType } from 'type/User';
import { compose } from 'recompose';
import CardContainer from './swipe-card/CardContainer';
import DraggableCard from './swipe-card/DraggableCard';
import Feed from './Feed';
import './Feed.css';
import { style } from 'typestyle';
import { CardStore } from '../../stores/cardStore';

export interface FeedContainerProps {
  feedStore: FeedStore;
  authStore: AuthStore;
}

const injectStores = compose(

);

const enhance = compose<FeedContainerProps, {}>(
  inject('feedStore'),
  inject('authStore'),
  observer
);

const onSwipeLeftWrapper = (review: ReviewType.Review, onSwipeLeft: (review: ReviewType.Review) => void) => () => onSwipeLeft(review);
const onSwipeRightWrapper = (review: ReviewType.Review, onSwipeRight: (review: ReviewType.Review) => void) => () => onSwipeRight(review);
const CustomAlertLeft = () => <span>Pass</span>;
const CustomAlertRight = () => <span>Like</span>;
const CustomGoBackJSXElement = (goBack: () => void) => (
  <div
    onClick={goBack}
  >
    취소
  </div>
);

const CardContainerStyle = style({
  margin: 'auto',
  position: 'relative',
  width: '375px',
  height: '375px',
  overflow: 'hidden',
  border: '1px solid #e5e5e5',
});

const FeedContainer = ({
  feedStore,
  authStore,
}: FeedContainerProps) => {
  const { currentFeed, containerSize, alert } = feedStore.state;
  const { passCard, likeCard } = feedStore;
  if (!currentFeed) {
    return null;
  }
  const { userInfo } = authStore.state;
  if (!userInfo) {
    return null;
  }
  return (
    <div className={CardContainerStyle}>
      {alert.left && <div className={`alert-visible alert-left alert`}>
        <CustomAlertLeft/>
      </div>}
      {alert.right && <div className={`alert-visible alert-right alert`}>
        <CustomAlertRight/>
      </div>}
      <DraggableCard
        containerSize={containerSize}
        onSwipeLeft={() => passCard(userInfo)}
        onSwipeRight={() => likeCard(userInfo)}
      >
        <Feed
          feed={currentFeed}
        />
      </DraggableCard>
    </div>
  )
};

export default enhance(FeedContainer);
