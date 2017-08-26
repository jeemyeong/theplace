import { ReviewType } from 'type/Review';
import { database, storage } from '../database/database';
import { reviews } from './seedData'

const addReview = (review: ReviewType.Review, databaseRef: firebase.database.Reference) => {
  const ref = databaseRef.child('reviews').push()
  review.reviewId = ref.key as string
  return ref.set(review)
};

const removeAllReviews = (databaseRef: firebase.database.Reference) => {
  return databaseRef.remove()
}

const initSeedData = async () => {
  const databaseRef = database.ref()
  await removeAllReviews(databaseRef)
  const promiseArray = []
  for (const review of reviews) {
    promiseArray.push(addReview(review, databaseRef))
  }
  await Promise.all(promiseArray)
  process.exit()
}

initSeedData()
