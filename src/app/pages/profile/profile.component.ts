import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  user:any=null;
  constructor(private loginService:LoginService){

  }
 ngOnInit():void {
  this.user=this.loginService.getUser();

  // Trying to fetch Current User Data from server
  // this.loginService.getCurrentUser().subscribe({
  //   next: (userData:any) =>{
  //     this.user=userData;
  //     console.log(userData);
  //   }
  // })
 }
}
