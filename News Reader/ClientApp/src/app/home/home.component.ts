import { NewsReaderComponent } from './../components/news-reader/news-reader.component';
import { NewsItem } from './../model/newsItem.model';
import { NewsQuery } from './../model/newsQuery.model';
import { RSSFeedService } from './../shared/rssFeed.service';
import { Component, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild(NewsReaderComponent, {static: false}) newsReader: NewsReaderComponent;
  newsQuery: NewsQuery;
  newsList: NewsItem[] = [];
  constructor(
    private rssService: RSSFeedService,
    private route: ActivatedRoute,
  ) {
    this.route.data.subscribe((res: any) => {
      this.newsQuery = res.newsQuery;
    });
  }

  loadNewsLazy(event: LazyLoadEvent) {
    const query = event.first === 0 ? this.rssService.listNews('', '') :
      this.rssService.listNews(this.newsQuery.oldestPublishDate, this.newsReader.filter ? this.newsReader.filter : '');
    query.subscribe((newsQuery: NewsQuery) => {
      this.newsQuery = newsQuery;
      this.newsList = newsQuery.newsItems;
      this.newsList = [...this.newsList];
    });
  }

  loadMoreNews() {
    const query = this.rssService.listNews(this.newsQuery.oldestPublishDate, this.newsReader.filter ? this.newsReader.filter : '');
    query.subscribe((newsQuery: NewsQuery) => {
      this.newsQuery = newsQuery;
      this.newsList = newsQuery.newsItems;
    });
  }

  filterNews(filter: string) {
    this.newsQuery = null;
    const query = this.rssService.listNews('', filter ? filter : '');
    query.subscribe((newsQuery: NewsQuery) => {
      this.newsQuery = newsQuery;
      this.newsList = newsQuery.newsItems;
    });
  }
}
