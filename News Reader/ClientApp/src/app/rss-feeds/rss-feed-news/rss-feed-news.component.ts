import { NewsItem } from './../../model/newsItem.model';
import { NewsQuery } from './../../model/newsQuery.model';
import { RSSFeedService } from './../../shared/rssFeed.service';
import { Component, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { RSSFeed } from 'src/app/model/rssFeed.model';
import { NewsReaderComponent } from 'src/app/components/news-reader/news-reader.component';

@Component({
  selector: 'app-rss-feed-news',
  templateUrl: './rss-feed-news.component.html',
  styleUrls: ['./rss-feed-news.component.css']
})
export class RSSFeedNewsComponent {
  @ViewChild(NewsReaderComponent, {static: false}) newsReader: NewsReaderComponent;
  newsQuery: NewsQuery;
  rssFeed: RSSFeed;
  newsList: NewsItem[] = [];
  constructor(
    private rssService: RSSFeedService,
    private route: ActivatedRoute
  ) {
    this.route.data.subscribe((res: any) => {
      this.rssFeed = res.rssFeed;
    });
  }

  loadNewsLazy(event: LazyLoadEvent) {
    const query = event.first === 0 ? this.rssService.listNewsByRSSFeed(this.rssFeed.id, '', '') :
      this.rssService.listNewsByRSSFeed(this.rssFeed.id, this.newsQuery ? this.newsQuery.oldestPublishDate : '',
        this.newsReader.filter ? this.newsReader.filter : '');
    query.subscribe((newsQuery: NewsQuery) => {
      this.newsQuery = newsQuery;
      this.newsList = newsQuery.newsItems;
      this.newsList = [...this.newsList];
    });
  }

  loadMoreNews() {
    const query = this.rssService.listNewsByRSSFeed(this.rssFeed.id, this.newsQuery.oldestPublishDate,
      this.newsReader.filter ? this.newsReader.filter : '');
    query.subscribe((newsQuery: NewsQuery) => {
      this.newsQuery = newsQuery;
      this.newsList = newsQuery.newsItems;
    });
  }

  filterNews(filter: string) {
    this.newsQuery = null;
    const query = this.rssService.listNewsByRSSFeed(this.rssFeed.id, '', filter ? filter : '');
    query.subscribe((newsQuery: NewsQuery) => {
      this.newsQuery = newsQuery;
      this.newsList = newsQuery.newsItems;
    });
  }
}
