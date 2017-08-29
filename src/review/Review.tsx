import * as React from 'react';
import { Divider, Image } from 'semantic-ui-react';
import { style, media } from 'typestyle';
import { ReviewType } from 'type/Review';
import Rating from '../modules/Rating';
import * as csstips from 'csstips';
import { RouterStore } from 'mobx-react-router';
import { inject, observer } from 'mobx-react';

const ReviewStyle = style({
  flexGrow: 1,
  paddingBottom: '100%',
  height: 0,
  width: '100%',
  backgroundColor: 'yellow',
  position: 'relative'
});

const cardImageStyle = (imgUrl: string) => style(
  /** Default */
  media({minWidth: 0, maxWidth: 999}, {backgroundSize: 'cover'}),
  /** Change for bigger screens */
  media({minWidth: 1000}, {backgroundSize: '50%'}), {
  backgroundImage: `url(${imgUrl})`,
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
  fontSize: '7vw',
  marginRight: '3%',
});

const evaluateStyle = style(
  csstips.flex, {
  fontSize: '4.5vw',
});

const reviewLineStyle = style({
  color: 'white',
  fontSize: '3.5vw',
  paddingLeft: '3%',
  paddingTop: '3%',
  paddingRight: '3%',
  paddingBottom: '1%',
});

const profileImageWrapper = style({
  float: 'left',
  display: 'inline-block',
  width: '5vw',
  marginRight: '1%'
});

const nicknameStyle = style({
  fontWeight: 'bold'
});

interface ReviewProps {
  review: ReviewType.Review;
  routingStore?: RouterStore;
}

@inject('routingStore')
@observer
class Review extends React.Component<ReviewProps, {}> {
  public render(): JSX.Element {
    const { review, routingStore } = this.props;
    const { push } = this.props.routingStore as RouterStore;
    return (
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
    );
  }
}

export default Review;
