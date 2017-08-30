import * as React from 'react';
import { Divider, Image } from 'semantic-ui-react';
import { style, media } from 'typestyle';
import { ReviewType } from 'type/Review';
import Rating from '../modules/Rating';
import * as csstips from 'csstips';
import { RouterStore } from 'mobx-react-router';
import { inject, observer } from 'mobx-react';

const WriteStyle = style({
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

interface WriteProps {
  like: ReviewType.Review;
  routingStore?: RouterStore;
}

@inject('routingStore')
@observer
class Write extends React.Component<WriteProps, {}> {
  public render(): JSX.Element {
    const { like, routingStore } = this.props;
    const { push } = this.props.routingStore as RouterStore;
    return (
      <div className={WriteStyle}>
        <div
          className={cardImageStyle(like.imgUrlArray[0])}
          onClick={() => push(`/reviews/${like.reviewId}`)}
        />
      </div>      
    );
  }
}

export default Write;