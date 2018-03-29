import { ReviewType } from './Review'
export type UserType = {
  uid: string,
  displayName: string | null,
  email: string | null,
  like: {[reviewId: string]: ReviewType.Review},
  pass: {[reviewId: string]: ReviewType.Review},
  write: ReviewType.Review[],
};