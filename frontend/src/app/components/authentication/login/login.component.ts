import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Userdto } from 'src/app/common/userdto';
import { SessionStorageService } from '../../../services/session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  username : string = '';
  password : string = '';

  ngOnInit(): void {

  }
  constructor(private authenticationService: AuthenticationService,
              private sessionStorageService: SessionStorageService,
              private router: Router){}

  login(){
    let userDto = new Userdto(this.username,this.password);
    this.authenticationService.login(userDto).subscribe(
      token => {
        console.log(token);
        this.sessionStorageService.setItem('token', token);
        if(token.type == 'ADMIN'){
          this.router.navigate(['/admin/product'])
        }else{
          this.router.navigate(['/'])
        }
      }
    )
    console.log(userDto);
  }

}
