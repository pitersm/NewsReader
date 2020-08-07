import { CategoryService } from './shared/category.service';
import { Category } from './model/category.model';
import { NewsQuery } from './model/newsQuery.model';
import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HomeComponent } from './home/home.component';
import { RSSFeedService } from './shared/rssfeed.service';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { CategoryNewsComponent } from './category/category-news/category-news.component';
import { ListRSSFeedsComponent } from './rss-feeds/list-rss-feeds/list-rss-feeds.component';
import { RSSFeed } from './model/rssFeed.model';
import { RSSFeedNewsComponent } from './rss-feeds/rss-feed-news/rss-feed-news.component';

@Injectable()
export class DashboardNewsResolver implements Resolve<Observable<NewsQuery>> {
  constructor(private rssFeedService: RSSFeedService) {}

  resolve(): Observable<NewsQuery> {
    return this.rssFeedService.listNews('', '');
  }
}

// @Injectable()
// export class CategoryNewsResolver implements Resolve<Observable<NewsQuery>> {
//   constructor(private rssFeedService: RSSFeedService) {}

//   resolve(route: ActivatedRouteSnapshot): Observable<NewsQuery> {
//     return this.rssFeedService.listNewsByCategory(route.params.id, '', '');
//   }
// }

@Injectable()
export class CategoryResolver implements Resolve<Observable<Category>> {
  constructor(private categoryService: CategoryService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Category> {
    return this.categoryService.getCategory(route.params.id);
  }
}

@Injectable()
export class RSSFeedResolver implements Resolve<Observable<RSSFeed>> {
  constructor(private rssFeedService: RSSFeedService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<RSSFeed> {
    return this.rssFeedService.getRSSFeed(route.params.id);
  }
}

@Injectable()
export class CategoryListResolver implements Resolve<Observable<Category[]>> {
  constructor(private categoryService: CategoryService) {}

  resolve(): Observable<Category[]> {
    return this.categoryService.listCategories();
  }
}

@Injectable()
export class RSSFeedListResolver implements Resolve<Observable<RSSFeed[]>> {
  constructor(private rssFeedService: RSSFeedService) {}

  resolve(): Observable<RSSFeed[]> {
    return this.rssFeedService.listRSSFeeds();
  }
}

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent, resolve: { newsQuery: DashboardNewsResolver } },
    { path: 'categories', component: ListCategoryComponent, resolve: { categories: CategoryListResolver } },
    { path: 'categories/:id', component: CategoryNewsComponent, resolve: { category: CategoryResolver }},
    { path: 'rssFeeds', component: ListRSSFeedsComponent, resolve: { rssFeeds: RSSFeedListResolver, categories: CategoryListResolver } },
    { path: 'rssFeeds/:id', component: RSSFeedNewsComponent, resolve: { rssFeed: RSSFeedResolver} },
    { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  providers: [DashboardNewsResolver, CategoryResolver, CategoryListResolver, RSSFeedResolver, RSSFeedListResolver, RSSFeedService]
})
export class AppRoutingModule { }
