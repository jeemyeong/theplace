import * as React from 'react';
import { style } from 'typestyle';
import { ReviewType } from '../type/Review';
import { UserType } from '../type/User';

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
interface ReviewProps {
  writter: ReviewType.Review['writter']
  reviewText: ReviewType.Review['reviewText']
}
export default ({writter, reviewText}: ReviewProps) => (
  <div className={reviewLineStyle}>
    <span className={nicknameStyle}>
      {writter.displayName + ' '}
    </span>
    {reviewText.length + (writter.displayName || '').length > 52 ? reviewText.slice(0, 52 - (writter.displayName || '').length ) + '...' : reviewText}
  </div>
)