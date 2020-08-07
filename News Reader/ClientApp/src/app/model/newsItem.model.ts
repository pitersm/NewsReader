export class NewsItem {
    constructor(
      public identifier: string,
      public source: string,
      public title: string,
      public link: string,
      public summary: string,
      public publishDate: string) {}
    // get formattedPublishedDate(): Date {
    //   return
    // }
}
