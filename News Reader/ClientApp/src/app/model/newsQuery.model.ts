import { NewsItem } from './newsItem.model';

export class NewsQuery {
    constructor(
      public oldestPublishDate: string,
      public newsItems: NewsItem[]) {}
}
