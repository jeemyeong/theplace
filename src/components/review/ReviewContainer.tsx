import * as React from 'react';
import { ReviewStore } from 'stores/reviewStore';
import { style } from 'typestyle';
import { inject, observer } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';
import Review from './ReviewDetail';
import { compose, lifecycle } from 'recompose';
import { Spinner } from '../../layout/Loading';

interface ReviewProps {
  routingStore: RouterStore;
  reviewStore: ReviewStore;
}

const injectStores = compose(
  inject('reviewStore'),
  inject('routingStore'),
  observer
);

const enhance = compose<ReviewProps, {}>(
  injectStores,
  lifecycle<ReviewProps, {}>({
    componentDidMount() {
      const { location } = this.props.routingStore as RouterStore;
      const pathname = !!location ? location.pathname : '';
      this.props.reviewStore.getReview(pathname.split('/')[2]);
    }
  }),
  injectStores,
);

const ReviewContainer = ({
  reviewStore
}: ReviewProps) => {
  const { review, loading } = reviewStore.state;
  return (
    <div>
      {loading === true || !review ?
        <Spinner/> :
        <Review/>
      }
    </div>
  )
};

export default enhance(ReviewContainer);
