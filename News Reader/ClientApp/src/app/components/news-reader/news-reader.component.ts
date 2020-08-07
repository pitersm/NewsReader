import { NewsItem } from './../../model/newsItem.model';
import { Component, Output, OnInit, EventEmitter, Input } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-news-reader',
  templateUrl: './news-reader.component.html',
  styleUrls: ['./news-reader.component.css']
})
export class NewsReaderComponent implements OnInit {
  filter: string;
  @Input() newsList: NewsItem[];
  @Output() loadNewsLazy = new EventEmitter<LazyLoadEvent>();
  @Output() loadMoreNews = new EventEmitter();
  @Output() filterNews = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onLoadNewsLazy(event: LazyLoadEvent) {
    this.loadNewsLazy.emit(event);
  }

  onLoadMoreNews() {
    this.loadMoreNews.emit();
  }

  onFilter() {
    this.filterNews.emit(this.filter);
  }
}
