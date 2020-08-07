import { Subject } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { Category } from 'src/app/model/category.model';
import { MenuItem, MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/shared/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnDestroy {
  categories: Category[];
  selectedCategory: Category;
  menuItems: MenuItem[];
  displayDialog = false;
  private ngUnsubscribe = new Subject();

  constructor(private categoryService: CategoryService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router) {
      this.route.data.subscribe((res: any) => {
        this.categories = res.categories;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.complete();
  }

  listCategories() {
    this.categoryService.listCategories()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (categoryList: Category[]) => this.categories = categoryList,
        error => this.messageService.add({
          key: 'msg', severity: 'error', summary: 'Server Error',
          detail: error
        }));
  }

  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(() => {
      this.displayDialog = false;
      this.listCategories();
    }, (error: any) => this.messageService.add({
      key: 'msg', severity: 'error', summary: 'Server Error',
      detail: error
    }));
  }

  onRowSelect(event) {
    this.selectedCategory = event.data;
    this.displayDialog = true;
  }

  showNews() {
    const path = this.selectedCategory.id;
    this.router.navigate([path], { relativeTo: this.route });
  }

  showAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
