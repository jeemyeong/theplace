import { observable } from 'mobx';
import { FeedType } from 'type/Feed';

type FeedState = {
  feeds: FeedType[]
};

export class FeedStore {
  @observable
  state: FeedState = {
    feeds: [
      {
        imgUrlArray: [
          'https://instagram.ficn1-1.fna.fbcdn.net/t51.2885-15/e35/20066942_475308786169319_2365934253134315520_n.jpg',
          'https://instagram.ficn1-1.fna.fbcdn.net/t51.2885-15/e35/20180684_132905990635793_1117704709809897472_n.jpg'
        ],
        author: {
          id: 0,
          nickname: 'jeemyeong',
          profileImgUrl: 'https://instagram.ficn1-1.fna.fbcdn.net/t51.2885-19/s150x150/19050682_812811472214414_8464831635005636608_a.jpg',
        },
        review: '맛있어맛있어맛있어맛있어맛있어맛있어맛있어맛있어맛있어맛있어맛있어',
        evaluate: 4.5
      },
      {
        imgUrlArray: [
          'https://instagram.ficn1-1.fna.fbcdn.net/t51.2885-15/s640x640/sh0.08/e35/c113.0.854.854/20479257_820171101484532_5072064752591568896_n.jpg'
        ],
        author: {
          id: 0,
          nickname: 'jeemyeong',
          profileImgUrl: 'https://instagram.ficn1-1.fna.fbcdn.net/t51.2885-19/s150x150/19050682_812811472214414_8464831635005636608_a.jpg',
        },
        review: '그냥그랬어',
        evaluate: 3.5
      },
      {
        imgUrlArray: [
          'https://instagram.ficn1-1.fna.fbcdn.net/t51.2885-15/e35/20066942_475308786169319_2365934253134315520_n.jpg',
          'https://instagram.ficn1-1.fna.fbcdn.net/t51.2885-15/e35/20180684_132905990635793_1117704709809897472_n.jpg'
        ],
        author: {
          id: 0,
          nickname: 'jeemyeong',
          profileImgUrl: 'https://instagram.ficn1-1.fna.fbcdn.net/t51.2885-19/s150x150/19050682_812811472214414_8464831635005636608_a.jpg',
        },
        review: '맛있어맛있어맛있어맛있어맛있어맛있어맛있어맛있어맛있어맛있어맛있어',
        evaluate: 4.5
      }
    ]
  };
}

export default new FeedStore();