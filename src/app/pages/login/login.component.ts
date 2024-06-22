import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private snack:MatSnackBar,private loginService:LoginService,private router:Router){

  }
  loginDetails={
    userName: '',
    password: '',
  };
  
  ngOnInit(): void {}

  loginFormSubmit(){
    console.log("Login btn clicked");
    if(this.loginDetails.userName.trim()==''  || this.loginDetails.userName==null){
      this.snack.open('Enter Username','OK',{
        duration: 3000,
      });
      return;
    }
    if(this.loginDetails.password.trim()==''  || this.loginDetails.password==null){
      this.snack.open('Enter Password','OK',{
        duration: 3000,
      });
      return;
    }
    this.loginService.generateToken(this.loginDetails).subscribe({
      next: (data:any) => {
        console.log(data);
        
          this.loginService.loginUser(data.token);

          this.loginService.getCurrentUser().subscribe({
            next:(user:any)=>{
              this.loginService.setUser(user);
              console.log(user);
              if(this.loginService.getUserRole()== 'ROLE_ADMIN'){
                // window.location.href='admin';
                this.router.navigate(['admin']);
                this.loginService.loginStatusSubject.next(true);
              }else if(this.loginService.getUserRole()== 'ROLE_NORMAL'){
                // window.location.href= '/user-dashboard';
                this.router.navigate(['user-dashboard/0']);
                this.loginService.loginStatusSubject.next(true);
              }else{
                this.loginService.logout();
              }
            },
            error:(err) =>{
              this.snack.open("Invalid Details !! Try Again");
            }
          })
        
      },
      error: (err) =>{
        this.snack.open("Invalid Credentials !! Try Again","OK",{
          duration:3000,
        });
        //this.snack.open(err);
        console.log(err);
      }
    })
  }
}
