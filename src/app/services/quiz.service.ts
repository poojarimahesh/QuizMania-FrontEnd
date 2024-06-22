import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  public getQuizzes(){
    return this.http.get(`${baseUrl}/quiz/getAll`);
  }
  public addQuiz(quiz:any){
    return this.http.post(`${baseUrl}/quiz/add`,quiz);
  }

  public deleteQuiz(qid:any){
    return this.http.delete(`${baseUrl}/quiz/delete/`+qid);
  }

  public getQuiz(qid:any){
    return this.http.get(`${baseUrl}/quiz/get/`+qid);
  }

  public updateQuiz(quiz:any){
    return this.http.put(`${baseUrl}/quiz/update`,quiz);
  }
  public getQuizzesOfCategory(categoryId:any){
    return this.http.get(`${baseUrl}/quiz/category/`+categoryId);
  }
  public getActiveQuizzes(){
    return this.http.get(`${baseUrl}/quiz/getAllActive`);
  }

  public getActiveQuizzesOfCategory(categoryId:any){
    return this.http.get(`${baseUrl}/quiz/getActive/category/`+categoryId);
  }

  public evaluateQuiz(questions:any,userId:any){
    return this.http.post(`${baseUrl}/quiz/evaluateQuiz/`+userId,questions);
  }
}

