import * as React from 'react';
import { Divider, Image } from 'semantic-ui-react';
import { style } from 'typestyle';
import { Feed } from 'type/Feed';

const FeedsStyle = (height: number) => style({
  height,
  backgroundColor: 'orange',
  overflowY: 'auto'
});

interface FeedsProps {
  feeds: Feed[];
  height: number;
}

const Feeds = ({
  feeds,
  height
}: FeedsProps) => (
  <div
    className={FeedsStyle(height)}
  >
    {feeds.map( (feed, index) => <Feed feed={feed} key={index}/>)}
  </div>
);

const FeedStyle = style({
});

const h2Style = style({
  zIndex: 100,
  position: 'absolute',
  color: 'white',
  left: 0,
  top: 200
});

const spanStyle = style({
  color: 'white',
  font: 'bold 24px/45px Helvetica, Sans-Serif',
  letterSpacing: '-1px',
  background: 'rgba(0, 0, 0, 0.7)',
  padding: '10px'
});

const cardImageStyle = (imgUrl: string) => style({
  backgroundImage: `url(${imgUrl})`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundColor: 'skyblue',
  width: '100%',
  height: 0,
  paddingTop: '66.64%'
});

interface FeedProps {
  feed: Feed;
}

const Feed = ({feed}: FeedProps) => (
  <div className={FeedStyle}>
    <div className={cardImageStyle(feed.imgUrlArray[0])}>
      {/* <h2 className={h2Style}>
        <span className={spanStyle}>
          {feed.review}
        </span>
        <div>
          <Image 
            src={feed.author.profileImgUrl}
            size="mini"
          />
          {feed.author.nickname}
          <div/>
          {feed.evaluate}
        </div>
      </h2> */}
    </div>
  </div>

);
export default Feeds;
