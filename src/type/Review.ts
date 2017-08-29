export namespace ReviewType {
  export type imgUrl = string;
  export type restaurant = string;
  export type reviewText = string;
  export type evaluate = number;
  export type reviewId = string;
  export type uid = string;
  export type user = {
    uid: string,
    displayName: string,
    photoUrl: string,
  };
  export type Review = {
    imgUrlArray: imgUrl[],
    writter: user,
    restaurant: restaurant,
    reviewText: reviewText,
    evaluate: evaluate,
    reviewId: reviewId,
    likeCount: number,
    passCount: number
  };
}