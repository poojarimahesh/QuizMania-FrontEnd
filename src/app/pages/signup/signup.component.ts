import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private userService:UserService, private snack:MatSnackBar, private router:Router) {}

  public user={
    userName:'',
    firstName: '',
    lastName: '',
    password:'',
    email: '',
    phone: ''
  }

  // ngOnInit():void {}
  formSubmit(){
    if(this.user.userName==''  || this.user.userName==null) {
      this.snack.open("Enter UserName",'OK',{
        duration: 3000,
      });
      return;
    }
    if(this.user.password==''  || this.user.password==null) {
      this.snack.open("Enter Password",'OK',{
        duration: 3000,
      });
      return;
    }
    if(this.user.email==''  || this.user.email==null) {
      this.snack.open("Enter Email",'OK',{
        duration: 3000,
      });
      return;
    }
    if(this.user.firstName==''  || this.user.firstName==null) {
      this.snack.open("Enter First Name",'OK',{
        duration: 3000,
      });
      return;
    }
    if(this.user.lastName==''  || this.user.lastName==null) {
      this.snack.open("Enter Last Name",'OK',{
        duration: 3000,
      });
      return;
    }
    
    if(this.user.phone==''  || this.user.phone==null) {
      this.snack.open("Enter Phone Number",'OK',{
        duration: 3000,
      });
      return;
    }
    console.log(this.user);
    this.userService.addUser(this.user).subscribe({
      next: (data:any)=>{
        console.log(data);
        // alert('success');
        Swal.fire({
          title: "Successfully Completed",
          text: "User registered with ID: "+data.userId,
          icon: "success"
        }).then((result)=>{
          this.router.navigate(['login']);
        });
      },
      error: (error) =>{
        console.log(error);
        // alert('Something went wrong');
        Swal.fire({
          title: "Error Occured",
          text: "UserName Already Present",
          icon: "error"
        });
      }
  })
  }

}
