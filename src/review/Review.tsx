import * as React from 'react';
import { style, media } from 'typestyle';
import { ReviewType } from 'type/Review';
import Rating from '../modules/Rating';
import * as csstips from 'csstips';
import { RouterStore } from 'mobx-react-router';
import { inject, observer } from 'mobx-react';
import { Button, Form, TextArea, Icon, Image } from 'semantic-ui-react'
import { ReviewStore } from 'stores/reviewStore';

const ReviewStyle = style({
  paddingBottom: '100%',
  height: 0,
  width: '100%',
  backgroundColor: 'white',
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

const evaluateStyle = style(
  csstips.normalize, {
  fontSize: '80%',
});

const reviewLineStyle = style(
  csstips.normalize, {
  color: 'white',
  fontSize: '90%',
  paddingLeft: '3%',
  paddingTop: '3%',
  paddingRight: '3%',
  paddingBottom: '1%',
  textAlign: 'left'
});

const profileImageWrapper = style({
  float: 'left',
  display: 'inline-block',
  width: '10%',
  marginRight: '1%'
});

const nicknameStyle = style({
  fontWeight: 'bold'
});

const commentLinesStyle = style(csstips.vertical, {
});

const commentLineStyle = style(
  csstips.normalize, {
  color: 'black',
  fontSize: '90%',
  paddingLeft: '3%',
  paddingTop: '3%',
  paddingRight: '3%',
  paddingBottom: '1%',
  textAlign: 'left'
});

const commentFormStyle = style(
  csstips.horizontal,
  csstips.normalize, {
})

const IconButtonWrapperStyle = style({
  margin: 'auto'
})

interface ReviewProps {
  reviewStore?: ReviewStore
  routingStore?: RouterStore;
  // writeComment: (event: React.SyntheticEvent<HTMLInputElement>) => void;
  // addComment: () => void;
  // deleteComment: (comment: ReviewType.comment) => void;
}

@inject('reviewStore')
@inject('routingStore')
@observer
class Review extends React.Component<ReviewProps, {}> {
  public render(): JSX.Element {
    const { reviewStore, routingStore } = this.props;
    const { push } = this.props.routingStore as RouterStore;
    const { state, writeComment, addComment, deleteComment } = this.props.reviewStore as ReviewStore;
    const review = state.review as ReviewType.Review
    const { writtingComment } = state;
    return (
      <div className={`animated fadeIn`}>
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
              <div className={reviewLineStyle}>
                <div className={profileImageWrapper}>
                  <Image
                    src={review.writter.photoUrl}
                    shape={'circular'}
                  />
                </div>
                <span className={nicknameStyle}>
                  {review.writter.displayName + ' '}
                </span>
                {review.reviewText.length + review.writter.displayName.length > 52 ? review.reviewText.slice(0, 52 - review.writter.displayName.length ) + '...' : review.reviewText}
              </div>
            </div> 
          </div>
        </div>      
        <div className={commentLinesStyle}>
          {!!review.comments && review.comments.length > 0 && review.comments.map((comment, index) => (
            <div className={commentLineStyle} key={index}>
              <div className={profileImageWrapper}>
                <Image
                  src={comment.writter.photoUrl}
                  shape={'circular'}
                />
              </div>
              <span className={nicknameStyle}>
                {comment.writter.displayName + ' '}
              </span>
              {comment.commentText.length + comment.writter.displayName.length > 52 ? comment.commentText.slice(0, 52 - review.writter.displayName.length ) + '...' : comment.commentText}
              {comment.writter.uid === writtingComment.writter.uid ? 
                <Icon onClick={() => deleteComment(comment)} size="large" name="close"/> :
                null
              }
            </div>
          ))}
          <Form onSubmit={() => addComment()}>
            <div className={commentFormStyle}>
              <Form.Input
                onChange={writeComment}
                value={writtingComment.commentText}
                className={style(csstips.flex11)}
              />
              <div className={IconButtonWrapperStyle}>
                <Icon
                  name="conversation"
                  size="large"
                  onClick={() => addComment()}
                />
              </div>
            </div>      
          </Form>
        </div>
      </div>      
    );
  }
}

export default Review;
