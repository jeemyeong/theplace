import { ReviewType } from 'type/Review';
import { database } from './database';
import seedData from './seedData';

const addReview = (review: ReviewType.Review, databaseRef: firebase.database.Reference) => {
  const ref = databaseRef.child('reviews').push()
  review.reviewId = ref.key as string
  return ref.set(review)
};

const initSeedData = async () => {
  const databaseRef = database.ref()
  const promiseArray = []
  for (const review of seedData.reviews) {
    promiseArray.push(addReview(review, databaseRef))
  }
  await Promise.all(promiseArray)
  process.exit()
}

initSeedData()
