import { RSSFeed } from './rssFeed.model';

export class Category {
    constructor(
      public id: number,
      public name: string,
      public rssFeeds: RSSFeed[]) {}
}
