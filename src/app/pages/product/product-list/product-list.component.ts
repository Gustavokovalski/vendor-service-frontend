import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IProductModel } from '@app/models/product.model';
import { SnackBarService } from 'src/services/snackbar.service';
import { IProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  private pageSize = 5;
  displayedColumns: string[] = ['name', 'price', 'actions'];
  dataSource: MatTableDataSource<IProductModel>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: IProductService, private snackBarService: SnackBarService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts() {
    this.service
      .list()
      .then((res) => {
        this.dataSource = new MatTableDataSource<IProductModel>(res.result.filter((x) => x.active));
        this.paginator.pageSize = this.pageSize;
        this.dataSource.paginator = this.paginator;
      })
      .catch((err) => {
        this.snackBarService.openSnackBar(err.toString(), 'error');
      });
  }

  ngAfterViewInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public edit(id: any) {
    this.router.navigate([`/product-form/${id}`]);
  }

  public delete(model: any) {
    this.service
      .inactivate(model)
      .then((res) => {
        if (res.success) {
          this.snackBarService.openSnackBar(res.message[0].description, 'success');
        } else {
          this.snackBarService.openSnackBar(res.message[0].description, 'error');
        }
      })
      .catch((err) => {
        this.snackBarService.openSnackBar(err.toString(), 'error');
      })
      .finally(() => {
        this.getProducts();
      });
  }
}
