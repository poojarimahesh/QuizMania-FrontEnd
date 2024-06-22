import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit{
  quizId=undefined;
  quizTitle=undefined;
  counter=0;
  questions=[
    {
      questionId:'',
      content: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answer: ''
    }
  ]
  constructor(private activatedRouter:ActivatedRoute, private questionsService:QuestionService){

  }
  ngOnInit(): void {
    this.quizId=this.activatedRouter.snapshot.params['qid'];
    this.quizTitle=this.activatedRouter.snapshot.params['qTitle'];
    
    this.questionsService.getQuestionsOfQuiz(this.quizId).subscribe({
      next: (retrievedQuestions:any) =>{
        this.questions=retrievedQuestions;
        // console.log(this.questions);

        this.counter=Math.floor(this.questions.length/2);
      },
      error: (error) =>{
        Swal.fire("Server Error",error.error.message,'error');
        // Swal.fire("Server Error",error.error.message,'error');
        console.log(error);
        
      }
    })
  }
  
  deleteQuestion(questionId:any,questionTitle:any){
    Swal.fire({
      icon:'question',
      title: 'Are you sure ',
      text: 'Deleting Question "'+questionTitle.slice(0,40)+'..."',
      showCancelButton: true,
      confirmButtonText: 'Delete'
    }).then((result) =>{
      if(result.isConfirmed){
        this.questionsService.deleteQuestion(questionId).subscribe({
          next: (retrivedMessage:any) =>{
            Swal.fire("Successfully deleted Question"," '"+questionTitle+"'","success");
            this.questions=this.questions.filter((question)=> question.questionId!=questionId );
          },
          error: (error) =>{
            Swal.fire("Error occured while Deleting Question"," '"+questionTitle+"'","error");
            Swal.fire("Server Error",error.error.message,'error');
            console.log(error);
            
          }
        })
      }
    })
  }



}
