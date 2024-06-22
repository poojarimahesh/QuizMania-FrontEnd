import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuizService } from 'src/app/services/quiz.service';
import { ResultService } from 'src/app/services/result.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit{
  activeQuizzes:any=[];
  quizIdFromList:any;
  userId:any;
  results:any=[]
  displaymessage=false;

  constructor(private quizService:QuizService, private activatedRoute:ActivatedRoute, private loginService:LoginService, private resultService:ResultService){

  }
  ngOnInit(): void {
    this.userId=this.loginService.getUser().userId;
    this.quizService.getActiveQuizzes().subscribe({
      next: (retrievedQuizzes:any) =>{
        this.activeQuizzes = retrievedQuizzes;
        console.log(retrievedQuizzes);
        
      },
      error:(error) =>{
        Swal.fire("Error while loading Quizzes",'Server Error','error');
      }
    })

    this.activatedRoute.params.subscribe((params)=>{
      if(params['quizId']==0){
        this.displaymessage=true;
      }
      else{
        this.displaymessage=false;
      this.resultService.getLeaderboardOfQuiz(params['quizId']).subscribe({
        next: (retrievedResults:any) =>{
          this.results=retrievedResults;
          console.log(this.results);
          
          
        },
        error: (error) =>{
          Swal.fire("Server Error",error.error.message,'error');
        }
      })
    }
    })

  }

}
