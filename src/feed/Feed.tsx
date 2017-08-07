import * as React from 'react';
import { Divider, Image } from 'semantic-ui-react';
import { style, media } from 'typestyle';
import { FeedType } from 'type/Feed';
import * as csstips from 'csstips';

const FeedStyle = style({
  paddingBottom: '100%',
  width: '100%',
  backgroundColor: 'yellow',
  position: 'relative'
});

const cardImageStyle = (imgUrl: string) => style(
  {
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
  },
  /** Default */
  media({minWidth: 0, maxWidth: 499}, {backgroundSize: 'cover'}),
  /** Change for bigger screens */
  media({minWidth: 500}, {backgroundSize: '50%'})
);

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
  csstips.padding(10),
  csstips.content
);

const restaurantStyle = style(
  csstips.content, {
  fontWeight: 'bold',
  fontSize: '2em',
});

const evaluateStyle = style(
  csstips.flex, {
  fontWeight: 'bold',
  fontSize: '1.8em',
});

const reviewStyle = style(
  csstips.flex, {
  color: 'white',
  font: 'bold 1.2em Helvetica, Sans-Serif',
  letterSpacing: '-1px',
  padding: '10px'
});

const nicknameStyle = style({
  fontWeight: 'bold',
  fontSize: '1.2em'
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
          {feed.review}
        </span>
      </div> 
    </div>
  </div>

);
export default Feed;
