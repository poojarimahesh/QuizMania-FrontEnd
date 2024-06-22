import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { QuizService } from 'src/app/services/quiz.service';
import { ResultService } from 'src/app/services/result.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit{
  quizId:any;
  noOfAttempts:any;
  userId:any;
  quiz={
    title:'',
    description:'',
    maxMarks:0,
    maxAttempts: 0,
    numberOfQuestions: 0,
    active: '',
    category:{
      cid:''
    }
  }
  constructor(private activatedRoute:ActivatedRoute,private quizService:QuizService, private router:Router,private resultService:ResultService, private loginService:LoginService){

  }
  ngOnInit(): void {
    this.quizId=this.activatedRoute.snapshot.params['quizId'];
    // console.log(this.quizId);
    this.quizService.getQuiz(this.quizId).subscribe({
      next: (retrievedQuiz:any) =>{
        this.quiz=retrievedQuiz;
        // console.log(retrievedQuiz);
        
      },
      error: (error:any) =>{
        Swal.fire("Server Error",error.error.message,'error');
        console.log(error);
        
      }
    })
    this.userId=this.loginService.getUser().userId;
    this.resultService.getCountOfAttemptsOfQuizOfUser(this.userId,this.quizId).subscribe({
      next: (retrivedData:any) =>{
        this.noOfAttempts=retrivedData;
        console.log(this.noOfAttempts);
        console.log("Max Attempts : ",this.quiz.maxAttempts);
        
        
      },
      error: (error) =>{
        Swal.fire("Error in Retrieving Number of Attempts",'Server Error','error');
      }
    })
  }
  startQuiz(){
    
    if(this.noOfAttempts>=this.quiz.maxAttempts){
      Swal.fire("You have Already attempted Quiz Maximum Number of times",'Max Attempts Allowed : '+this.quiz.maxAttempts,'error');
      console.log("Start Quiz Denied");
      
      return;
    }
    Swal.fire({
      title: 'Do you want to <b>Start</b> the Quiz <br/> You have <b>already attempted '+this.noOfAttempts+' times</b> <br/> Only <b>'+(this.quiz.maxAttempts-this.noOfAttempts)+'</b> attempts left..!',
      timerProgressBar: true,
      text: 'Timer will start as soon as you click Start Button',
      timer: 10000,
      showCancelButton: true,
      confirmButtonText: 'Start',
      icon: 'question',
       
    }).then((result)=>{
      if(result.isConfirmed){
        this.router.navigate(['/start/'+this.quizId]);
      }
    })
  }

}
