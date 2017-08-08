import * as React from 'react';
import { Divider, Image } from 'semantic-ui-react';
import { style, media } from 'typestyle';
import { FeedType } from 'type/Feed';
import * as csstips from 'csstips';

const FeedStyle = style({
  flexGrow: 1,
  paddingBottom: '50%',
  height: 0,
  width: '50%',
  backgroundColor: 'yellow',
  position: 'relative'
});

const cardImageStyle = (imgUrl: string) => style(
  /** Default */
  media({minWidth: 0, maxWidth: 499}, {backgroundSize: 'cover'}),
  /** Change for bigger screens */
  media({minWidth: 500}, {backgroundSize: '50%'}), {
  backgroundImage: `url(${imgUrl})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundColor: 'skyblue',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  position: 'absolute'
});

const reviewBoxStyle = style(
  csstips.vertical, {
  margin: 'auto',
  marginBottom: '0%',
  width: '100%',
  height: '40%',
  bottom: 0,
  position: 'relative',
  color: 'white',
  background: 'rgba(0, 0, 0, 0.2)',
  left: 0,
});

const restaurantAndEvaluateBoxStyle = style(
  csstips.horizontal,
  csstips.content, {
    paddingTop: '3%',
    paddingLeft: '3%'
  }
);

const restaurantStyle = style(
  csstips.content, {
  fontSize: '1.3em',
});

const evaluateStyle = style(
  csstips.flex, {
  fontSize: '1.2em',
});

const reviewStyle = style(
  csstips.flex, {
  color: 'white',
  font: '0.8em',
  letterSpacing: '-1px',
  paddingLeft: '3%',
  paddingTop: '3%',
});

const nicknameStyle = style({
  fontSize: '0.9em'
});

interface FeedProps {
  feed: FeedType;
}

const Feed = ({feed}: FeedProps) => (
  <div className={FeedStyle}>
    <div className={cardImageStyle(feed.imgUrlArray[0])}>
      <div className={reviewBoxStyle}>
        <div className={restaurantAndEvaluateBoxStyle}>
          <div className={restaurantStyle}>
            {feed.restaurant}
          </div>
          <div className={evaluateStyle}>
            {feed.evaluate}
          </div>
        </div>
        <span className={reviewStyle}>
          <span className={nicknameStyle}>
            {feed.author.nickname}:
          </span>
          {feed.review.length > 20 ? feed.review.slice(0, 20) + '...' : feed.review}
        </span>
      </div> 
    </div>
  </div>

);
export default Feed;
