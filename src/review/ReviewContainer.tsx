import * as React from 'react';
import { FeedStore } from 'stores/feedStore';
import { FeedType } from 'type/Feed';
import * as csstips from 'csstips';
import { style } from 'typestyle';
import { inject } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';

interface ReviewProps {
    routing: RouterStore;
  }
  
@inject('routing')
class ReviewContainer extends React.Component<ReviewProps, {}> {
    render() {
    const { location, push, goBack } = this.props.routing;
    const pathname = !!location ? location.pathname : null;
    return (
        <div>
            Hello! Here is {pathname}
        </div>
    );
  }
}

export default ReviewContainer;
