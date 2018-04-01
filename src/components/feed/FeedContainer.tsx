import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { FeedStore } from 'stores/feedStore';
import { AuthStore } from 'stores/authStore';
import { compose } from 'recompose';
import DraggableCard from './swipe-card/DraggableCard';
import Feed from './Feed';
import './Feed.css';
import { style } from 'typestyle';

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

const CustomAlertLeft = () => <span>Pass</span>;
const CustomAlertRight = () => <span>Like</span>;
const CustomGoBackJSXElement = ({goBack}: {goBack: () => void}) => (
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
  const { passCard, likeCard, unDo } = feedStore;
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
      <div>
        <CustomGoBackJSXElement goBack={() => unDo(userInfo)}/>
      </div>

    </div>
  )
};

export default enhance(FeedContainer);
