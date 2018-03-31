import * as React from 'react';
import { Divider } from 'semantic-ui-react';
import { style, media } from 'typestyle';
import { ReviewType } from 'type/Review';
import Rating from '../../common/Rating';
import * as csstips from 'csstips';
import { RouterStore } from 'mobx-react-router';
import { inject, observer } from 'mobx-react';
import IronImage from '../../common/IronImage';
import { compose } from 'recompose';

const LikeStyle = style({
  flexGrow: 1,
  paddingBottom: '100%',
  height: 0,
  width: '100%',
  backgroundColor: 'yellow',
  position: 'relative'
});

const cardImageWrapperStyle = style({
  backgroundSize: 'cover',
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

export interface LikeProps {
  like: ReviewType.Review;
  push: RouterStore['push'];
}

const Like = ({
  like,
  push
}: LikeProps) => (
  <div className={LikeStyle}>
    <div
      className={cardImageWrapperStyle}
      onClick={() => push(`/reviews/${like.reviewId}`)}
    >
      <IronImage
        src={like.imgUrlArray[0]}
      />
    </div>
  </div>
)

export default Like;
