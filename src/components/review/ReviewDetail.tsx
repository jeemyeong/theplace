import * as React from 'react';
import { style, media } from 'typestyle';
import { ReviewType } from 'type/Review';
import Rating from '../../common/Rating';
import * as csstips from 'csstips';
import { RouterStore } from 'mobx-react-router';
import { inject, observer } from 'mobx-react';
import { Button, Form, TextArea, Icon, Image } from 'semantic-ui-react'
import { ReviewStore } from 'stores/reviewStore';
import Review from '../../common/Review';
import { compose } from 'recompose';
import withAppLayout from '../../layout/withAppLayout';

const ReviewStyle = style({
  paddingBottom: '100%',
  height: 0,
  width: '100%',
  backgroundColor: 'red',
  position: 'relative'
});

const cardImageStyle = (imgUrl: string) => style({
  backgroundSize: 'cover',
  backgroundImage: `url("${imgUrl}")`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  position: 'absolute'
});

const backgroundImageWithoutReviewBoxStyle = style(
  csstips.flex, {
    width: '100%'
  }
);

const reviewBoxStyle = style(
  csstips.vertical, {
  margin: 'auto',
  marginBottom: '0%',
  width: '100%',
  bottom: 0,
  position: 'relative',
  color: 'white',
  background: 'rgba(0, 0, 0, 0.2)',
  left: 0,
});

const restaurantAndEvaluateBoxStyle = style(
  csstips.horizontal,
  csstips.content, {
    paddingTop: '3%',
    paddingLeft: '3%'
  }
);

const restaurantStyle = style(
  csstips.content, {
  fontWeight: 'bold',
  fontSize: '150%',
  marginRight: '3%',
});

const evaluateStyle = style({
  fontSize: '80%',
});

const nicknameStyle = style({
  fontWeight: 'bold'
});

const commentLinesStyle = style(csstips.vertical, {
});

const commentLineStyle = style({
  color: 'black',
  fontSize: '90%',
  paddingLeft: '3%',
  paddingTop: '3%',
  paddingRight: '3%',
  paddingBottom: '1%',
  textAlign: 'left'
});

const commentFormStyle = style(csstips.horizontal, {

})

interface ReviewProps {
  reviewStore: ReviewStore
  routingStore: RouterStore;
}
const injectStores = compose(
  inject('reviewStore'),
  inject('routingStore'),
  observer
)
const enhance = compose<ReviewProps, {}>(
  injectStores,
)

const ReviewDetail = ({
  reviewStore,
  routingStore
}: ReviewProps) => {
  const { push } = routingStore;
  const { state, writeComment, addComment, deleteComment } = reviewStore;
  const review = state.review as ReviewType.Review
  const { writtingComment } = state;
  return (
    <div>
      <div className={ReviewStyle}>
        <div className={cardImageStyle(review.imgUrlArray[0])}>
          <div
            className={backgroundImageWithoutReviewBoxStyle}
          >
            {null}
          </div>
          <div
            className={reviewBoxStyle}
          >
            <div className={restaurantAndEvaluateBoxStyle}>
              <div
                className={restaurantStyle}
                onClick={() => push(`/reviews/${review.reviewId}`)}
              >
                {review.restaurant}
              </div>
              <Rating rating={review.evaluate} className={evaluateStyle}/>
            </div>
            <Review writter={review.writter} reviewText={review.reviewText}/>
          </div>
        </div>
      </div>
      <div className={commentLinesStyle}>
        {!!review.comments && review.comments.length > 0 && review.comments.map((comment, index) => (
          <div className={commentLineStyle} key={index}>
            <span className={nicknameStyle}>
              {comment.writter.displayName + ' '}
            </span>
            {comment.commentText.length + (comment.writter.displayName || '').length > 52 ? comment.commentText.slice(0, 52 - (comment.writter.displayName || '').length ) + '...' : comment.commentText}
            {comment.writter.uid === writtingComment.writter.uid ?
              <Button onClick={() => deleteComment(comment)} size="mini">
                Delete
              </Button> :
              null
            }
          </div>
        ))}
      </div>
      <Form onSubmit={() => addComment()}>
        <div className={commentFormStyle}>
          <Form.Input
            onChange={writeComment}
            value={writtingComment.commentText}
            className={style(csstips.flex11)}
          />
          <Form.Button
            type="submit"
            size="mini"
            content="작성"
            className={style(csstips.flex2)}
          />
        </div>
      </Form>
    </div>
  );
}

export default enhance(ReviewDetail);
