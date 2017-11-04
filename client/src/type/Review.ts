export namespace ReviewType {
  export type imgUrl = string;
  export type restaurant = string;
  export type reviewText = string;
  export type evaluate = number;
  export type reviewId = string;
  export type uid = string;
  export type cid = string;
  export type stringfiedDate = string;
  export type comment = {
    writter: writter,
    commentText: string,
    cid: string
  };
  export type writter = {
    uid: string,
    displayName: string,
    photoUrl: string,
  };
  export type Review = {
    imgUrlArray: {[n: number]: imgUrl},
    writter: writter,
    restaurant: restaurant,
    reviewText: reviewText,
    evaluate: evaluate,
    reviewId: reviewId,
    likeCount: number,
    passCount: number,
    stringfiedDate: stringfiedDate,
    comments: comment[]
  };
}