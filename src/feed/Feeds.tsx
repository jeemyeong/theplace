import * as React from 'react';
import { Loader, Image } from 'semantic-ui-react';
import { style } from 'typestyle';
import { ReviewType } from 'type/Review';
import Feed from './Feed';
import * as csstips from 'csstips';
import * as PropTypes from 'prop-types';
import Cards, { DraggableCard } from '../swipe-card';
import './Feeds.css';

const FeedsStyle = style({
});

interface FeedsProps {
  feeds: ReviewType.Review[];
}

const onSwipeLeft = (reviewId: ReviewType.reviewId) => () => console.log(reviewId)
const onSwipeRight = (reviewId: ReviewType.reviewId) => () => console.log(reviewId)
const CustomAlertLeft = <span>Pass</span>
const CustomAlertRight = <span>Save</span>
const CustomGoBackJSXElement = (goBack: () => void) => (
  <button
    onClick={goBack}
  >
    이전카드보기
  </button>
)

const Feeds = ({
  feeds,
}: FeedsProps) => (
  <div className={FeedsStyle}>
    <Cards
      onEnd={() => alert('끝났습니다!!!')}
      className={'master-root'}
      alertRight={CustomAlertRight} 
      alertLeft={CustomAlertLeft} 
      goBackJSXElement={CustomGoBackJSXElement} 
    >
      {feeds.map((feed, key) => 
        <DraggableCard
          key={key}
          onSwipeLeft={onSwipeLeft(feed.reviewId)} 
          onSwipeRight={onSwipeRight(feed.reviewId)}
        >
          <Feed
            feed={feed}
          />
        </DraggableCard>
      )}
    </Cards>
  </div>
);

export default Feeds;
