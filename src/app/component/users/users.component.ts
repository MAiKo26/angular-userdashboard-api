import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Response } from '../../interface/response.interface';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  response: Response;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers(16).subscribe((results: any) => {
      console.log(results);
      this.response = results;
    });
  }
}
