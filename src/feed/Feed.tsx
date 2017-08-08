import * as React from 'react';
import { Divider, Image } from 'semantic-ui-react';
import { style, media } from 'typestyle';
import { FeedType } from 'type/Feed';
import * as csstips from 'csstips';

const FeedStyle = style({
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
  backgroundColor: 'skyblue',
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
  fontSize: '7vw',
  paddingRight: '3%',
});

const evaluateStyle = style(
  csstips.flex, {
  fontSize: '6vw',
});

const reviewLineStyle = style({
  color: 'white',
  fontSize: '3vw',
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

interface FeedProps {
  feed: FeedType;
}
interface FeedState {
  hover: boolean;
}

class Feed extends React.Component<FeedProps, FeedState> {
  constructor (props: FeedProps) {
    super(props);
    this.state = {
      hover: false
    };
  }
  public hover = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    return this.setState({hover: true});
  }
  public unhover = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    return this.setState({hover: false});
  }
  
  public render(): JSX.Element {
    const { feed } = this.props;
    return (
      <div className={FeedStyle}>
        <div className={cardImageStyle(feed.imgUrlArray[0])}>
          <div
            className={backgroundImageWithoutReviewBoxStyle}
            onClick={this.unhover}  
          >
            {null}
          </div>
          <div
            className={reviewBoxStyle}
            onClick={this.hover}
          >
            <div className={restaurantAndEvaluateBoxStyle}>
              <div className={restaurantStyle}>
                {feed.restaurant}
              </div>
              <div className={evaluateStyle}>
                {feed.evaluate}
              </div>
            </div>
            <div className={reviewLineStyle}>
              <div className={profileImageWrapper}>
                <Image
                  src={feed.author.profileImgUrl}
                  shape={'circular'}
                />
              </div>
              <span className={nicknameStyle}>
                {feed.author.nickname + ' '}
              </span>
              {!this.state.hover && feed.review.length > 22 ? feed.review.slice(0, 22) + '...' : feed.review}
            </div>
          </div> 
        </div>
      </div>      
    );
  }
}

export default Feed;
