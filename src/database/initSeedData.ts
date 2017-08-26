import { ReviewType } from 'type/Review';
import { database, storage } from '../database/database';
import { FeedType } from 'type/Feed';
import { reviews } from './seedData'

const databaseRef = database.ref();

const addReview = (review: ReviewType.Review) => {
  const ref = databaseRef.child('reviews').push()
  review.reviewId = ref.key as string
  ref.set({review})
};

for (const review of reviews) {
  addReview(review)
}
