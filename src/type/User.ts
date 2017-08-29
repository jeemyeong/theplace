import { ReviewType } from './Review'
export type UserType = {
  uid: string,
  displayName: string | null,
  photoURL: string | null,
  email: string | null,
  like: ReviewType.Review[],
  pass: ReviewType.Review[],
  write: ReviewType.Review[],
};