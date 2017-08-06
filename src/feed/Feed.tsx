import * as React from 'react';
import { Divider, Image } from 'semantic-ui-react';
import { style, media } from 'typestyle';
import { FeedType } from 'type/Feed';

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

const authorStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const reviewBoxStyle = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
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

const reviewStyle = style({
  color: 'white',
  font: 'bold 24px/45px Helvetica, Sans-Serif',
  letterSpacing: '-1px',
  padding: '10px'
});

interface FeedProps {
  feed: FeedType;
}

const Feed = ({feed}: FeedProps) => (
  <div className={FeedStyle}>
    <div className={cardImageStyle(feed.imgUrlArray[0])}>
      <div className={reviewBoxStyle}>
        <div className={authorStyle}>
          <div>
            <Image 
              src={feed.author.profileImgUrl}
              size="mini"
              shape="circular"
            />
          </div>
          <div>
            {feed.author.nickname}
          </div>
          {feed.evaluate}
        </div>
        <span className={reviewStyle}>
          {feed.review}
        </span>
      </div> 
    </div>
  </div>

);
export default Feed;
