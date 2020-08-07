import { NewsItem } from './../../model/newsItem.model';
import { NewsQuery } from './../../model/newsQuery.model';
import { RSSFeedService } from './../../shared/rssFeed.service';
import { Component, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/model/category.model';
import { NewsReaderComponent } from 'src/app/components/news-reader/news-reader.component';

@Component({
  selector: 'app-category-news',
  templateUrl: './category-news.component.html',
  styleUrls: ['./category-news.component.css']
})
export class CategoryNewsComponent {
  @ViewChild(NewsReaderComponent, {static: false}) newsReader: NewsReaderComponent;
  newsQuery: NewsQuery;
  category: Category;
  newsList: NewsItem[] = [];
  constructor(
    private rssService: RSSFeedService,
    private route: ActivatedRoute
  ) {
    this.route.data.subscribe((res: any) => {
      this.category = res.category;
    });
  }

  loadNewsLazy(event: LazyLoadEvent) {
    const query = event.first === 0 ? this.rssService.listNewsByCategory(this.category.id, '', '') :
      this.rssService.listNewsByCategory(this.category.id, this.newsQuery ? this.newsQuery.oldestPublishDate : '',
        this.newsReader.filter ? this.newsReader.filter : '');
    query.subscribe((newsQuery: NewsQuery) => {
      this.newsQuery = newsQuery;
      this.newsList = newsQuery.newsItems;
      this.newsList = [...this.newsList];
    });
  }

  loadMoreNews() {
    const query = this.rssService.listNewsByCategory(this.category.id, this.newsQuery.oldestPublishDate,
      this.newsReader.filter ? this.newsReader.filter : '');
    query.subscribe((newsQuery: NewsQuery) => {
      this.newsQuery = newsQuery;
      this.newsList = newsQuery.newsItems;
    });
  }

  filterNews(filter: string) {
    this.newsQuery = null;
    const query = this.rssService.listNewsByCategory(this.category.id, '', filter ? filter : '');
    query.subscribe((newsQuery: NewsQuery) => {
      this.newsQuery = newsQuery;
      this.newsList = newsQuery.newsItems;
    });
  }
}
