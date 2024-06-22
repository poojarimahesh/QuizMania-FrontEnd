import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user:any=null;
  isLoggedIn=false;
  isNormalUser=false;
  constructor(public login:LoginService,private router:Router){
    
  }
  ngOnInit(): void{
    this.isLoggedIn= this.login.isLogedIn();
    this.user=this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe({
      next: ()=>{
        this.isLoggedIn= this.login.isLogedIn();
        this.user=this.login.getUser();
        if(this.login.getUserRole()== 'ROLE_NORMAL'){
          this.isNormalUser=true;
        }
      }
    })
  }
  public logout(){
    this.login.logout();
    this.login.loginStatusSubject.next(false);
    // window.location.reload();
    this.router.navigate(['']);
  }
}
