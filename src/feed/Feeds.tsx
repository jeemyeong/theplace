import * as React from 'react';
import { Divider, Image } from 'semantic-ui-react';
import { style } from 'typestyle';
import { FeedType } from 'type/Feed';
import Feed from './Feed';

const FeedsStyle = style({
  backgroundColor: 'orange',
  overflowY: 'auto',
  height: '100%'
});

interface FeedsProps {
  feeds: FeedType[];
}

const Feeds = ({
  feeds,
}: FeedsProps) => (
  <div
    className={FeedsStyle}
  >
    {feeds.map( (feed, index) =>
      <Feed
        feed={feed}
        key={index}
      />
    )}
  </div>
);

export default Feeds;
