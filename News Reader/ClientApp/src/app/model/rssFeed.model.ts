import { Category } from './category.model';

export class RSSFeed {
    constructor(
      public id: number,
      public name: string,
      public xmlFileAddress: string,
      public category: Category) {}
}
