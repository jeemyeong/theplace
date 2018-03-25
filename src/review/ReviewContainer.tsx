import * as React from 'react';
import { ReviewStore } from 'stores/reviewStore';
import { ReviewType } from 'type/Review';
import * as csstips from 'csstips';
import { style } from 'typestyle';
import { inject, observer } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';
import Review from './Review';
import { Icon } from 'semantic-ui-react';
import AppLayout from '../AppLayout';

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
    const { writeComment, state, addComment, deleteComment } = this.props.reviewStore;
    const { review, loading } = this.props.reviewStore.state;
    return (
      <AppLayout>
        <div>
          {loading === true || !review ?
            <div className={loadingWrapperStyle}>
              <Icon loading={true} name="spinner" size="big" />
            </div> :
            <Review/>
          }
        </div>
      </AppLayout>
    );
  }
}

export default ReviewContainer;
