import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  public getQuestionsOfQuiz(qid:any){
    return this.http.get(`${baseUrl}/question/quiz/admin/`+qid);
  }
  public getQuestionsOfQuizForUser(qid:any){
    return this.http.get(`${baseUrl}/question/quiz/`+qid);
  }
  public addQuestion(question:any){
    return this.http.post(`${baseUrl}/question/add`,question);
  }
  public getQuestion(questionId:any){
    return this.http.get(`${baseUrl}/question/get/`+questionId);
  }
  public updateQuestion(question:any){
    return this.http.put(`${baseUrl}/question/update`,question);
  }
  public deleteQuestion(questionId:any){
    return this.http.delete(`${baseUrl}/question/delete/`+questionId);
  }
  
}
