import * as React from 'react';
import { ReviewStore } from 'stores/reviewStore';
import { style } from 'typestyle';
import { inject, observer } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';
import Review from './ReviewDetail';
import { Icon } from 'semantic-ui-react';
import withAppLayout from '../../layout/withAppLayout';
import { compose, lifecycle } from 'recompose';

interface ReviewProps {
  routingStore: RouterStore;
  reviewStore: ReviewStore;
}
const loadingWrapperStyle = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 10
})

const injectStores = compose(
  inject('reviewStore'),
  inject('routingStore'),
  observer
)
const enhance = compose<ReviewProps, {}>(
  withAppLayout,
  injectStores,
  lifecycle<ReviewProps, {}>({
    componentDidMount() {
      const { location } = this.props.routingStore as RouterStore;
      const pathname = !!location ? location.pathname : '';
      this.props.reviewStore.getReview(pathname.split('/')[2]);
    }
  }),
  injectStores,
)

const ReviewContainer = ({
  reviewStore
}: ReviewProps) => {
  const { review, loading } = reviewStore.state;
  return (
    <div>
      {loading === true || !review ?
        <div className={loadingWrapperStyle}>
          <Icon loading={true} name="spinner" size="big" />
        </div> :
        <Review/>
      }
    </div>
  )
}

export default enhance(ReviewContainer);
