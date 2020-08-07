import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RSSFeed } from '../model/rssFeed.model';
import { NewsQuery } from '../model/newsQuery.model';

@Injectable({
  providedIn: 'root'
})
export class RSSFeedService {
  baseUrl = 'https://localhost:44356/rssFeed/';
  constructor(private http: HttpClient) { }
  newsList: NewsQuery;
  rssFeeds: RSSFeed[];

  getRSSFeed(id: string): Observable<RSSFeed> {
    return this.http.get(`${this.baseUrl}${id}`)
      .pipe(map((response: any) => {
        const rssFeed: RSSFeed = response;
        return rssFeed;
      }));
  }

  saveRSSFeed(rssFeed: RSSFeed) {
    debugger;
    return this.http.post(this.baseUrl, rssFeed);
  }

  updateRSSFeed(rssFeed: RSSFeed) {
    return this.http.put(this.baseUrl + rssFeed.id, rssFeed);
  }

  deleteRSSFeed(id: string) {
    return this.http.delete(this.baseUrl + id);
  }

  listRSSFeeds(): Observable<RSSFeed[]> {
    return this.http.get(this.baseUrl)
    .pipe(map((response: RSSFeed[]) => {
      this.rssFeeds = response;
      return this.rssFeeds.slice();
    }));
  }

  listNews(fromDate: string, filter: string): Observable<NewsQuery> {
    fromDate = encodeURIComponent(fromDate);

    var requestUrl = `${this.baseUrl}ListFromAllFeeds?fromDate=${fromDate}&filter=${filter}`;
    return this.http.get(requestUrl)
      .pipe(map((response: any) => {
        if (fromDate) {
          this.newsList.oldestPublishDate = response.oldestPublishDate;
          this.newsList.newsItems = this.newsList.newsItems.concat(response.newsItems);
        } else {
          this.newsList = response;
        }

        this.newsList.newsItems.forEach(item => {
          item.summary = this.stripHtmlTags(item.summary);
          if (item.summary.length > 200) {
            item.summary = item.summary.substr(0, 199) + '...';
          }
        });
        return this.newsList;
      }));
  }

  stripHtmlTags(str)
  {
    if ((str===null) || (str===''))
        return false;
    else
    str = str.toString();
    return str.replace(/<[^>]*>/g, '');
}

  listNewsByCategory(categoryId: number, fromDate: string, filter: string): Observable<NewsQuery> {
    fromDate = encodeURIComponent(fromDate);
    var requestUrl = `${this.baseUrl}ListByCategory?categoryId=${categoryId}&fromDate=${fromDate}&filter=${filter}`;

    return this.http.get(requestUrl)
      .pipe(map((response: any) => {
        if (fromDate) {
          this.newsList.oldestPublishDate = response.oldestPublishDate;
          this.newsList.newsItems = this.newsList.newsItems.concat(response.newsItems);
        } else {
          this.newsList = response;
        }

        this.newsList.newsItems.forEach(item => {
          item.summary = this.stripHtmlTags(item.summary);
          if (item.summary.length > 200) {
            item.summary = item.summary.substr(0, 199) + '...';
          }
        });
        return this.newsList;
      }));
  }

  listNewsByRSSFeed(feedId: number, fromDate: string, filter: string): Observable<NewsQuery> {
    fromDate = encodeURIComponent(fromDate);
    var requestUrl = `${this.baseUrl}ListNewsByFeed?feedId=${feedId}&fromDate=${fromDate}&filter=${filter}`;

    return this.http.get(requestUrl)
      .pipe(map((response: any) => {
        if (fromDate) {
          this.newsList.oldestPublishDate = response.oldestPublishDate;
          this.newsList.newsItems = this.newsList.newsItems.concat(response.newsItems);
        } else {
          this.newsList = response;
        }

        this.newsList.newsItems.forEach(item => {
          item.summary = this.stripHtmlTags(item.summary);
          if (item.summary.length > 200) {
            item.summary = item.summary.substr(0, 199) + '...';
          }
        });
        return this.newsList;
      }));
  }
}
