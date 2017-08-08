import * as React from 'react';
import { Divider, Image } from 'semantic-ui-react';
import { style } from 'typestyle';
import { FeedType } from 'type/Feed';
import Feed from './Feed';
import * as csstips from 'csstips';

const FeedsStyle = style(csstips.fillParent, csstips.horizontal, {
  backgroundColor: 'orange',
  overflowY: 'auto',
  flexWrap: 'wrap'
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
