export type ReviewType = {
  imgUrlArray: string[],
  author: {
    id: number,
    nickname: string,
    profileImgUrl: string,
  },
  restaurant: string,
  review: string,
  evaluate: number,
  reviewId: number,
  empty: boolean
};