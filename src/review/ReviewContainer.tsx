import * as React from 'react';
import { ReviewStore } from 'stores/reviewStore';
import { ReviewType } from 'type/Review';
import * as csstips from 'csstips';
import { style } from 'typestyle';
import { inject, observer } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';
import Review from './Review';

interface ReviewProps {
  routingStore: RouterStore;
  reviewStore: ReviewStore;
}

@inject('reviewStore')
@inject('routingStore')
@observer    
class ReviewContainer extends React.Component<ReviewProps, {}> {
  constructor(props: ReviewProps) {
    super(props);
    const { location, push, goBack } = this.props.routingStore;
    const pathname = !!location ? location.pathname : '';
    this.props.reviewStore.getReview(pathname.split('/')[2]);
  }
  
  render() {
    const { review, loaded } = this.props.reviewStore.state;
    return (
      <div>
        {loaded === false ? null : 
          <Review
            review={review}
          />
        }
      </div>
    );
  }
}

export default ReviewContainer;
