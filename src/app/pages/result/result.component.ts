import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuizService } from 'src/app/services/quiz.service';
import { ResultService } from 'src/app/services/result.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit{

  quizId:any;
  userId:any;
  results:any=[];
  activeQuizzes:any=[];
  quizIdFromList:any;
  isAllResultPage:boolean=false;


  constructor(private activatedRoute:ActivatedRoute, private resultService:ResultService,private loginService:LoginService, private quizService:QuizService){

  }

  ngOnInit(): void {
    this.quizId=this.activatedRoute.snapshot.params['quizId'];
    this.userId=this.loginService.getUser().userId;
    this.quizIdFromList=0;
    if(this.activatedRoute.snapshot.url[0]!= undefined){
      if(this.activatedRoute.snapshot.url[0].path=='results')
      this.isAllResultPage=true;
    }
    
    this.quizService.getActiveQuizzes().subscribe({
      next: (retrievedQuizzes:any) =>{
        this.activeQuizzes = retrievedQuizzes;
        console.log(retrievedQuizzes);
        
      },
      error:(error) =>{
        Swal.fire("Error while loading Quizzes",'Server Error','error');
      }
    })
    console.log("Current Route: "+this.activatedRoute.snapshot.url[0]);
    
    this.activatedRoute.params.subscribe((params)=>{
      if(params['quizId']==0){

        this.resultService.getResultsOfUser(this.userId).subscribe({
          next: (retrievedResults:any) =>{
            this.results=retrievedResults;
            console.log(this.results);
            this.quizIdFromList=0;
            this.quizId=params['quizId'];
            
          },
          error: (error) =>{
            Swal.fire("Server Error",error.error.message,'error');
          }
        })
      }else{
        this.resultService.getResultsOfUserOfQuiz(this.userId,params['quizId']).subscribe({
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
