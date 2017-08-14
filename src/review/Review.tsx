import * as React from 'react';
import { style } from 'typestyle';
import { ReviewType } from 'type/Review';

const ReviewStyle = style({

});

interface ReviewProps {
  review: ReviewType;
}

const Review = ({
  review
}: ReviewProps) => {
  if (review.empty) {
    return null;
  }
  return (
    <div className={ReviewStyle}>
      {review.evaluate}
    </div>
  );
};

export default Review;