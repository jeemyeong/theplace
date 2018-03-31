import * as React from 'react';
import { Divider } from 'semantic-ui-react';
import { style, media } from 'typestyle';
import { ReviewType } from 'type/Review';
import Rating from '../../common/Rating';
import * as csstips from 'csstips';
import { RouterStore } from 'mobx-react-router';
import { inject, observer } from 'mobx-react';
import IronImage from '../../common/IronImage';
import Review from '../../common/Review';

const FeedStyle = style({
  paddingBottom: '100%',
  height: 0,
  width: '100%',
  backgroundColor: 'white',
  position: 'relative'
});

const cardImageStyle = style({
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

const reviewLineStyle = style({
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

interface FeedProps {
  feed: ReviewType.Review;
  routingStore?: RouterStore;
}

@inject('routingStore')
@observer
class Feed extends React.Component<FeedProps, {}> {
  public render(): JSX.Element {
    const { feed, routingStore } = this.props;
    const { push } = this.props.routingStore as RouterStore;
    return (
      <div className={FeedStyle}>
        <div className={cardImageStyle}>
          <IronImage
            src={feed.imgUrlArray[0]}
          >
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
                  onClick={() => push(`/reviews/${feed.reviewId}`)}
                >
                  {feed.restaurant}
                </div>
                <Rating rating={feed.evaluate} className={evaluateStyle}/>
              </div>
              <Review writter={feed.writter} reviewText={feed.reviewText}/>
            </div>
          </IronImage>
        </div>
      </div>      
    );
  }
}

export default Feed;
