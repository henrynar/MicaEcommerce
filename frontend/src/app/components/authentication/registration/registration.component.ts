import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { UserType } from 'src/app/common/user-type';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{
  username : string = '';
  name : string = '';
  surname : string = '';
  email : string = '';
  address : string = '';
  cellphone : string = '';
  password : string = '';
  userType : string = '';

  ngOnInit(): void {

  }

  constructor(private authenticationService: AuthenticationService,
              private router: Router, private toastrService: ToastrService){}


  register(){
    this.username = this.email;
    this.userType = UserType.USER;
    let user = new User(0,this.username, this.name,this.surname,this.email,
                        this.address,this.cellphone, this.password,this.userType)

    this.authenticationService.register(user).subscribe(
      res => {this.toastrService.success('Usuario registardo', 'Usuario');
              console.log(res);
          }
    );
    console.log(user);
    this.router.navigate(['user/login']);
  }



}
