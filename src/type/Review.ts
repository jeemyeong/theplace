
export namespace ReviewType {
  export type imgUrl = string;
  export type restaurant = string;
  export type reviewText = string;
  export type evaluate = number;
  export type reviewId = string;
  export type author = {
    id: number,
    nickname: string,
    profileImgUrl: string,
  };
  export type Review = {
    imgUrlArray: imgUrl[],
    author: author,
    restaurant: restaurant,
    reviewText: reviewText,
    evaluate: evaluate,
    reviewId: reviewId,
  };
}