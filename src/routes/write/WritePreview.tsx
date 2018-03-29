import * as React from 'react';
import { Divider, Image } from 'semantic-ui-react';
import { style, media } from 'typestyle';
import { ReviewType } from 'type/Review';
import Rating from '../../common/Rating';
import * as csstips from 'csstips';
import { inject, observer } from 'mobx-react';
import { WriteStore } from 'stores/writeStore';

const ReviewStyle = style({
  paddingBottom: '100%',
  height: 0,
  width: '100%',
  backgroundColor: 'red',
  position: 'relative'
});

const cardImageStyle = (imgUrl: string) => style({
  backgroundSize: 'cover',
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

const nicknameStyle = style({
  fontWeight: 'bold'
});

interface WritePreviewProps {
  writeStore?: WriteStore;  
  index: number;
}

@inject('writeStore')
@observer
class WritePreview extends React.Component<WritePreviewProps, {}> {
  public render(): JSX.Element {
    const { index } = this.props;
    const { state } = this.props.writeStore as WriteStore;
    return (
      <div className={ReviewStyle}>
        <div className={!!state.photoFiles[0].preview ? cardImageStyle(state.photoFiles[index].preview as string) : ''}>
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
              >
                {state.restaurant}
              </div>
              <Rating rating={state.evaluate} className={evaluateStyle}/>
            </div>
            <div className={reviewLineStyle}>
              <span className={nicknameStyle}>
                {state.writter.displayName + ' '}
              </span>
              {state.reviewText.length + (state.writter.displayName || '').length > 52 ? state.reviewText.slice(0, 52 - (state.writter.displayName || '').length ) + '...' : state.reviewText}
            </div>
          </div> 
        </div>
      </div>      
    );
  }
}

export default WritePreview;
