import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuizService } from 'src/app/services/quiz.service';
import { ResultService } from 'src/app/services/result.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';


export interface Result {
  date : String ;
time : String;
quizAttempted : String;
userAttempted : String
noOfAttempts : Number;
marksObtained : Number;
noOfQuestionsAttempted : Number;
correctAnswer : Number;
user:any;


}

@Component({
  selector: 'app-leaderboard-admin',
  templateUrl: './leaderboard-admin.component.html',
  styleUrls: ['./leaderboard-admin.component.css']
})
export class LeaderboardAdminComponent implements OnInit  {
  activeQuizzes:any=[];
  quizIdFromList:any;
  userId:any;
  results:any=[]
  toHide:any = false;
  pageSize:any;
  displayedColumns: string[] = ['rank','date','time','quizAttempted','userAttempted','noOfAttempt','questionsAttempted','correctAnswers','marksObtained'];
  dataSource ! : MatTableDataSource<Result>;
  @ViewChild(MatPaginator) paginator ! : MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private quizService:QuizService, private activatedRoute:ActivatedRoute, private loginService:LoginService, private resultService:ResultService){

  }
  // ngAfterViewInit(): void {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }
  ngOnInit(): void {
    
    this.quizIdFromList=0;
    this.userId=this.loginService.getUser().userId;
    this.quizService.getActiveQuizzes().subscribe({
      next: (retrievedQuizzes:any) =>{
        this.activeQuizzes = retrievedQuizzes;
        
        console.log(retrievedQuizzes);
        
      },
      error:(error) =>{
        Swal.fire("Error while loading Quizzes",'Server Error','error');
        // Swal.fire("Server Error",error.error.message,'error');
      }
    })

    this.activatedRoute.params.subscribe((params)=>{
      if(params['quizId']==0){
       
        this.toHide=true;
      }
      else{
        this.toHide=false;
       
      this.resultService.getResultOfQuizByMarks(params['quizId']).subscribe({
        next: (retrievedResults:any) =>{
          this.results=retrievedResults;
          console.log(this.results);
          if(this.results.length==0)
            this.toHide=true;
          if(this.results.length>0)
            this.toHide=false;
          this.dataSource=new MatTableDataSource(retrievedResults);;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.pageSize=Math.min(5,this.results.length);
          
        },
        error: (error) =>{
          Swal.fire("Server Error",error.error.message,'error');
          console.log(error.error.message);
          
        }
      })}
    })
  

  }
  

}
