import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { User } from './models/user.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'surname', 'email', 'actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  users: User[] = [];
  searchControl: FormControl;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.searchControl = new FormControl(null);
    this.dataSource = new MatTableDataSource(this.users);
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe(response => {
      this.users = response.data.users;
      this.dataSource.data = this.users;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(response.data);
    })
  }

  ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }

  searchUser(){
    this.dataSource.filter = this.searchControl.value;
  }

  async deleteUser(user: User){
    const results = await UtilsService.showDeleteAlert();
    if(results.isConfirmed){
      this.userService.deleteUser(user.id).subscribe(response => {
        this.userService.usersQueryRef.refetch();
      });
    }
  }

}
