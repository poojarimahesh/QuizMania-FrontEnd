import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http:HttpClient) { }

  public getResultsOfUserOfQuiz(userId:any, quizid:any){
    return this.http.get(`${baseUrl}/result/user/`+userId+'/quiz/'+quizid);
    
  }
  public getResultsOfUser(userId:any){
    return this.http.get(`${baseUrl}/result/user/`+userId);
  }
  
  public getAllResults(){
    return this.http.get(`${baseUrl}/result/getAll`);
  }
  public getResultOfQuiz(quizId:any){
    return this.http.get(`${baseUrl}/result/quiz/`+quizId);
  }
  public getResultsOfUserOfQuizByMarks(userId:any, quizid:any){
    return this.http.get(`${baseUrl}/result/marks/user/`+userId+'/quiz/'+quizid);
    
  }
  public getResultsOfUserByMarks(userId:any){
    return this.http.get(`${baseUrl}/result/marks/user/`+userId);
  }
  
  public getAllResultsByMarks(){
    return this.http.get(`${baseUrl}/result/marks/getAll`);
  }
  public getResultOfQuizByMarks(quizId:any){
    return this.http.get(`${baseUrl}/result/marks/quiz/`+quizId);
  }
  public getCountOfAttemptsOfQuizOfUser(userId:any, quizid:any){
    return this.http.get(`${baseUrl}/result/attempts/user/`+userId+'/quiz/'+quizid);
  }
  public getLeaderboardOfQuiz(quizId:any){
    return this.http.get(`${baseUrl}/result/leaderboard/quiz/`+quizId)
  }

}
