import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../model/category.model';
import { NewsQuery } from '../model/newsQuery.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = 'https://localhost:44356/category/';
  constructor(private http: HttpClient) { }
  newsList: NewsQuery;
  categories: Category[];

  getCategory(id: string): Observable<Category> {
    return this.http.get(`${this.baseUrl}${id}`)
      .pipe(map((response: any) => {
        const category: Category = response;
        return category;
      }));
  }

  listCategories(): Observable<Category[]> {
    return this.http.get(this.baseUrl)
    .pipe(map((response: Category[]) => {
      this.categories = response;
      return this.categories.slice();
    }));
  }

  saveCategory(category: Category) {
    return this.http.post(this.baseUrl, category);
  }

  updateCategory(category: Category) {
    return this.http.put(this.baseUrl + category.id, category);
  }

  deleteCategory(id: string) {
    return this.http.delete(this.baseUrl + id);
  }
}
