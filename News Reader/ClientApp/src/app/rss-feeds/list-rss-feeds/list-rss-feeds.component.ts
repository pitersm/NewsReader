import { RSSFeed } from './../../model/rssFeed.model';
import { Component, OnDestroy } from '@angular/core';
import { RSSFeedService } from 'src/app/shared/rssFeed.service';
import { MessageService, MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from 'src/app/model/category.model';

@Component({
  selector: 'app-list-rss-feeds',
  templateUrl: './list-rss-feeds.component.html',
  styleUrls: ['./list-rss-feeds.component.css']
})
export class ListRSSFeedsComponent implements OnDestroy {
  feedName: string;
  feedURL = 'https://www.theguardian.com/world/rss';
  feedCategory: Category;
  categories: Category[];
  rssFeeds: RSSFeed[];
  selectedRSSFeed: RSSFeed;
  menuItems: MenuItem[];
  displayDialog = false;
  private ngUnsubscribe = new Subject();

  constructor(private rssFeedService: RSSFeedService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router) {
      this.route.data.subscribe((res: any) => {
        this.rssFeeds = res.rssFeeds;
        this.categories = res.categories;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.complete();
  }

  listRSSFeeds() {
    this.rssFeedService.listRSSFeeds()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (categoryList: RSSFeed[]) => this.rssFeeds = categoryList,
        error => this.messageService.add({
          key: 'msg', severity: 'error', summary: 'Server Error',
          detail: error
        }));
  }

  deleteRSSFeed(id: string) {
    this.rssFeedService.deleteRSSFeed(id)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(() => {
      this.displayDialog = false;
      this.listRSSFeeds();
    }, (error: any) => this.messageService.add({
      key: 'msg', severity: 'error', summary: 'Server Error',
      detail: error
    }));
  }

  onRowSelect(event) {
    this.selectedRSSFeed = event.data;
    this.displayDialog = true;
  }

  showNews() {
    const path = this.selectedRSSFeed.id;
    this.router.navigate([path], { relativeTo: this.route });
  }

  addRSS() {
    const newRSSFeed = new RSSFeed(0, this.feedName, this.feedURL, this.feedCategory);
    this.rssFeedService.saveRSSFeed(newRSSFeed)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((response) => {
      this.messageService.add({
        key: 'msg',
        severity: 'info',
        summary: 'Subscribed succesfully!',
        detail: 'The new subscription to ' + newRSSFeed.name + ' has been succesfully completed!'
      });
      setTimeout(() => {
        location.reload();
      }, 3000);
    }, (error: any) => this.alertServerError(error));
  }

  alertServerError(error: any) {
    this.messageService.add({
      key: 'msg',
      severity: 'error',
      summary: 'An error occurred in the server.'
    });
  }
}
