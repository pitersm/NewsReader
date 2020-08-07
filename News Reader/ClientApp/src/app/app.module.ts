import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { AppRoutingModule } from './app-routing.module';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { NewsReaderComponent } from './components/news-reader/news-reader.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CategoryNewsComponent } from './category/category-news/category-news.component';
import { ListRSSFeedsComponent } from './rss-feeds/list-rss-feeds/list-rss-feeds.component';
import { RSSFeedNewsComponent } from './rss-feeds/rss-feed-news/rss-feed-news.component';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    HeaderComponent,
    SidebarComponent,
    NewsReaderComponent,
    ListCategoryComponent,
    CategoryNewsComponent,
    ListRSSFeedsComponent,
    RSSFeedNewsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule, 
    DropdownModule,
    CardModule,
    ToastModule,
    ButtonModule,
    PanelModule,
    AppRoutingModule,
    VirtualScrollerModule,
    TableModule,
    DialogModule,
    BrowserAnimationsModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
