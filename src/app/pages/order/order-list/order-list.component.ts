import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CredentialsService } from '@app/auth';
import { IOrderModel } from '@app/models/order.model';
import { SnackBarService } from 'src/services/snackbar.service';
import { IOrderService } from '../order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit, AfterViewInit {
  private pageSize = 5;
  displayedColumns: string[] = ['id', 'customerEmail', 'orderTotalPrice', 'purchaseDate', 'actions'];
  dataSource: MatTableDataSource<IOrderModel>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: IOrderService,
    private snackBarService: SnackBarService,
    private router: Router,
    public credentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  ngAfterViewInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getOrders() {
    debugger;
    this.service
      .list()
      .then((res) => {
        this.dataSource = new MatTableDataSource<IOrderModel>(
          this.credentialsService.credentials.result.profileId == 3
            ? res.result.filter((x) => x.customerEmail == this.credentialsService.credentials.result.email)
            : res.result
        );
        this.paginator.pageSize = this.pageSize;
        this.dataSource.paginator = this.paginator;
      })
      .catch((err) => {
        this.snackBarService.openSnackBar(err.toString(), 'error');
      });
  }

  public edit(id: any) {
    this.router.navigate([`/order-form/${id}`]);
  }

  public delete(id: any) {
    this.service
      .delete(id)
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
        this.getOrders();
      });
  }
}
