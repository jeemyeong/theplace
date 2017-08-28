import * as React from 'react';
import { Loader, Image } from 'semantic-ui-react';
import { style } from 'typestyle';
import { ReviewType } from 'type/Review';
import Feed from './Feed';
import * as csstips from 'csstips';
import * as PropTypes from 'prop-types';
import Cards, { DraggableCard } from '../card';
import './Feeds.css';

const FeedsStyle = style({
});

interface FeedsProps {
  feeds: ReviewType.Review[];
}
// tslint:disable-next-line:no-console
const action = (msg: string) => () => console.log(msg)

const Feeds = ({
  feeds,
}: FeedsProps) => (
  <div className={FeedsStyle}>
    <Cards
      onEnd={action('end')}
      className={'master-root'}
    >
      {feeds.map((feed, key) => 
        <DraggableCard
          key={key}
          onSwipeLeft={action('swipe left')} 
          onSwipeRight={action('swipe right')}
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
