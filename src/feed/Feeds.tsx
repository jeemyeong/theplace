import * as React from 'react';
import { Loader, Image } from 'semantic-ui-react';
import { style } from 'typestyle';
import { FeedType } from 'type/Feed';
import Feed from './Feed';
import * as csstips from 'csstips';
import * as Scrollbar from 'react-smooth-scrollbar';
import SmoothScrollbar from 'smooth-scrollbar';
import * as PropTypes from 'prop-types';

interface FeedsProps {
  feeds: FeedType[];
}

const scrollBarStyle = style(csstips.fillParent, {
  overflowY: 'auto'
});

const Feeds = ({
  feeds,
}: FeedsProps) => (
  <Scrollbar
    speed={3}
    thumbMinSize={3}
    renderByPixels={true}
    className={scrollBarStyle}
  >
    <InfiniteScroll
      feeds={feeds}
    />
  </Scrollbar>
);

interface InfiniteScrollState {
  count: number;
  loading: boolean;
  feeds: FeedType[];
}

interface InfiniteScrollProps {
  feeds: FeedType[];
}

class InfiniteScroll extends React.Component<InfiniteScrollProps, InfiniteScrollState> {
  static contextTypes = {
    getScrollbar: PropTypes.func
  };

  constructor(props: InfiniteScrollProps) {
    super(props);
    this.state = {
      feeds: this.props.feeds,
      count: 4,
      loading: false
    };
  }

  componentDidMount() {
    this.context.getScrollbar((scrollbar: SmoothScrollbar) => {
      scrollbar.infiniteScroll(this.loadData);
    });
  }

  componentDidUpdate() {
    this.context.getScrollbar((scrollbar: SmoothScrollbar) => {
      scrollbar.update();
    });
  }

  render() {
    const list = [];
    const { feeds, count, loading } = this.state;

    return (
      <div>
        {feeds.slice(0, count).map( (feed, index) =>
          <Feed
            feed={feed}
            key={index}
          />
        )}
        <Loader
          inverted={false}
          inline="centered"
          active={loading}
        >
          Loading
        </Loader>  
      </div>
    );
  }

  public loadData = ()  => {
    const increaseOnce = 5;
    const increase = (this.state.feeds.length - this.state.count) < increaseOnce ? this.state.feeds.length - this.state.count : increaseOnce; 
    if ( increase === 0 ) {
      return;
    }
    this.setState({ loading: true });
    setTimeout(() => { this.setState(({ count: this.state.count + increase, loading: false })); }, 300);
  }
}

export default Feeds;
