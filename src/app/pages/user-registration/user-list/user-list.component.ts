import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CredentialsService } from '@app/auth';
import { IUserModel } from '@app/models/user.model';
import { SnackBarService } from 'src/services/snackbar.service';
import { IUserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, AfterViewInit {
  private pageSize = 5;
  public myId: string;
  displayedColumns: string[] = ['email', 'profile', 'actions'];
  dataSource: MatTableDataSource<IUserModel>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: IUserService,
    private snackBarService: SnackBarService,
    private router: Router,
    private credentials: CredentialsService
  ) {}

  ngOnInit(): void {
    this.myId = this.credentials.credentials.result.id;
    this.getUsers();
  }

  public getUsers() {
    this.service
      .list()
      .then((res) => {
        this.dataSource = new MatTableDataSource<IUserModel>(res.result);
        this.paginator.pageSize = this.pageSize;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .catch((err) => {
        this.snackBarService.openSnackBar(err.toString(), 'error');
      });
  }

  ngAfterViewInit() {}

  public edit(id: any) {
    this.router.navigate([`/user-form-admin/${id}`]);
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
        this.getUsers();
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
