import * as React from 'react';
import { Loader, Image } from 'semantic-ui-react';
import { style } from 'typestyle';
import { ReviewType } from 'type/Review';
import { UserType } from 'type/User';
import Feed from './Feed';
import * as csstips from 'csstips';
import * as PropTypes from 'prop-types';
import CardContainer, { DraggableCard } from '../swipe-card';
import './Feeds.css';

const FeedsStyle = style({
});

interface FeedsProps {
  feeds: ReviewType.Review[]
  userInfo: UserType
  onSwipeLeft: (review: ReviewType.Review) => void
  onSwipeRight: (review: ReviewType.Review) => void
}

const onSwipeLeftWrapper = (review: ReviewType.Review, onSwipeLeft: (review: ReviewType.Review) => void) => () => onSwipeLeft(review)
const onSwipeRightWrapper = (review: ReviewType.Review, onSwipeRight: (review: ReviewType.Review) => void) => () => onSwipeRight(review)
const CustomAlertLeft = <span>Pass</span>
const CustomAlertRight = <span>Like</span>
const CustomGoBackJSXElement = (goBack: () => void) => (
  <button
    onClick={goBack}
  >
    취소
  </button>
)

const Feeds = ({
  feeds,
  userInfo,
  onSwipeLeft,
  onSwipeRight
}: FeedsProps) => (
  <div className={FeedsStyle}>
    <CardContainer
      onEnd={() => alert('끝났습니다!!!')}
      className={'master-root'}
      alertRight={CustomAlertRight} 
      alertLeft={CustomAlertLeft} 
      goBackJSXElement={CustomGoBackJSXElement} 
    >
      {feeds
        .filter((feed: ReviewType.Review) => ((!userInfo.like || !userInfo.like[feed.reviewId]) && (!userInfo.pass || !userInfo.pass[feed.reviewId])))
        .map((feed, key) => 
          <DraggableCard
            key={key}
            onSwipeLeft={onSwipeLeftWrapper(feed, onSwipeLeft)} 
            onSwipeRight={onSwipeRightWrapper(feed, onSwipeRight)}
          >
            <Feed
              feed={feed}
            />
          </DraggableCard>
        )}
    </CardContainer>
  </div>
);

export default Feeds;
