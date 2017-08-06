export type Feed = {
  imgUrlArray: string[],
  author: {
    id: number,
    nickname: string,
    profileImgUrl: string,
  },
  review: string,
  evaluate: number
};