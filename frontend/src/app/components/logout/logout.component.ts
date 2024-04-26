import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../../services/session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  constructor(private sessionStorageService: SessionStorageService,
              private router: Router){}

  ngOnInit(): void {
    console.log('LogoutComponent'+ this.sessionStorageService.getItem('token'));
    this.sessionStorageService.removeItem('token');
    console.log('LogoutComponent eliminado'+ this.sessionStorageService.getItem('token'));
    this.router.navigate(['/'])
  }



}
