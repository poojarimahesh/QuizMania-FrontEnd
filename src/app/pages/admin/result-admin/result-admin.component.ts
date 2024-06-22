import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ResultService } from 'src/app/services/result.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-result-admin',
  templateUrl: './result-admin.component.html',
  styleUrls: ['./result-admin.component.css']
})
export class ResultAdminComponent implements OnInit {

  
  quizId:any;
  userId:any;
  results:any=[];
  allQuizzes:any=[];
  allUsers:any=[];
  quizIdFromList:any=0;
  isAllResultPage:boolean=false;
  sortBy:any="Date";


  constructor(private activatedRoute:ActivatedRoute, private resultService:ResultService,private loginService:LoginService, private quizService:QuizService, private userService:UserService){

  }

  ngOnInit(): void {
    this.quizId=this.activatedRoute.snapshot.params['quizId'];
    // this.userId=this.loginService.getUser().userId;
    this.quizIdFromList=0;
    this.userId=0;
    if(this.activatedRoute.snapshot.url[0]!= undefined){
      if(this.activatedRoute.snapshot.url[0].path=='results')
      this.isAllResultPage=true;
    }
    
    this.userService.getAllUser().subscribe({
      next: (retrievedUsers:any) =>{
        this.allUsers=retrievedUsers;
        console.log("retrievedUsers ",retrievedUsers);
        
      },
      error: (error)=>{
        Swal.fire("Error while loading Users","Server Error","error");
        console.log(error);
        
      }
    });
    this.quizService.getQuizzes().subscribe({
      next: (retrievedQuizzes:any) =>{
        this.allQuizzes = retrievedQuizzes;
        console.log(retrievedQuizzes);
        
      },
      error:(error) =>{
        Swal.fire("Error while loading Quizzes",'Server Error','error');
      }
    });
    console.log("Current Route: "+this.activatedRoute.snapshot.url[0]);
    
    this.activatedRoute.params.subscribe((params)=>{
     
      if(params['sortBy']=='date'){
      
      this.sortBy="Date";
     
      if(params['quizId']==0 && params['userId']==0){
        this.resultService.getAllResults().subscribe({
          next: (retrievedResults:any) =>{
            this.results=retrievedResults;
            console.log(this.results);
            this.quizIdFromList=0;
            this.userId=0;
          },
          error: (error) =>{
            Swal.fire("Error while loading Results","Server Error",'error');
          }
        })
      }else if(params['userId']==0){
        this.resultService.getResultOfQuiz(params['quizId']).subscribe({
          next: (retrievedResults:any) =>{
            this.results=retrievedResults;
            console.log(this.results);
            
          },
          error: (error) =>{
            Swal.fire("Server Error",error.error.message,'error');
          }
        });
      }
      else if(params['quizId']==0){
        this.resultService.getResultsOfUser(params['userId']).subscribe({
          next: (retrievedResults:any) =>{
            this.results=retrievedResults;
            console.log(this.results);
            
          },
          error: (error) =>{
            Swal.fire("Server Error",error.error.message,'error');
          }
        });
      }
      else{
        this.resultService.getResultsOfUserOfQuiz(params['userId'],params['quizId']).subscribe({
          next: (retrievedResults:any) =>{
            this.results=retrievedResults;
            console.log(this.results);
            
          },
          error: (error) =>{
            Swal.fire("Server Error",error.error.message,'error');
          }
        })
      }
    }else if(params['sortBy']=="marks"){
      this.sortBy="Marks";
      console.log("Marks clicked");
      
      if(params['quizId']==0 && params['userId']==0){
        this.resultService.getAllResultsByMarks().subscribe({
          next: (retrievedResults:any) =>{
            this.results=retrievedResults;
            console.log(this.results);
            this.quizIdFromList=0;
            this.userId=0;
          },
          error: (error) =>{
            Swal.fire("Error while loading Results","Server Error",'error');
          }
        })
      }else if(params['userId']==0){
        this.resultService.getResultOfQuizByMarks(params['quizId']).subscribe({
          next: (retrievedResults:any) =>{
            this.results=retrievedResults;
            console.log(this.results);
            
          },
          error: (error) =>{
            Swal.fire("Server Error",error.error.message,'error');
          }
        });
      }
      else if(params['quizId']==0){
        this.resultService.getResultsOfUserByMarks(params['userId']).subscribe({
          next: (retrievedResults:any) =>{
            this.results=retrievedResults;
            console.log(this.results);
            
          },
          error: (error) =>{
            Swal.fire("Server Error",error.error.message,'error');
          }
        });
      }
      else{
        this.resultService.getResultsOfUserOfQuizByMarks(params['userId'],params['quizId']).subscribe({
          next: (retrievedResults:any) =>{
            this.results=retrievedResults;
            console.log(this.results);
            
          },
          error: (error) =>{
            Swal.fire("Server Error",error.error.message,'error');
          }
        })
      }
    }
      
    })
  
    
    
  }
}
