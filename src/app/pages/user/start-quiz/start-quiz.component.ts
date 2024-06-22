import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit{
  quizId:any;
  questions:any=[];
  answer:any;
  marksObtained:any=0;
  questionsAttempted=0;
  correctAnswers=0;
  isSubmit=false;
  timer=0;
  totalTime=0;
  userId:any;

  constructor(private locationStratergy: LocationStrategy,private activatedRoute:ActivatedRoute,private questionService:QuestionService, private router:Router, private quizServie:QuizService,private loginService:LoginService){

  }
  ngOnInit(): void {
    // this.preventBackButton();
    this.quizId=this.activatedRoute.snapshot.params['quizId']; 
    console.log(this.quizId);
    this.loadQuizzes();
    this.reduceTimer();
    this.userId=this.loginService.getUser().userId;
    
  }
  preventBackButton() {
    history.pushState(null, "", location.href);
    this.locationStratergy.onPopState(() => {
      history.pushState(null, "", location.href);
    })
  }
  loadQuizzes(){
    this.questionService.getQuestionsOfQuizForUser(this.quizId).subscribe({
      next: (receivedQuestions:any) => {
        this.questions=receivedQuestions;
        // initialization of Timer & TotalTime
        this.totalTime=this.questions[0].quiz.numberOfQuestions * 2 * 60;
        this.timer=this.questions[0].quiz.numberOfQuestions * 2 * 60;
        console.log(this.questions);
      },
      error: (error) =>{
        // Swal.fire("Error while loading Questions","Server Error",'error');
        Swal.fire("Server Error",error.error.message,'error');
        console.log(error);
        
      }
    })
  }
  submitQuiz(){
    Swal.fire({
      icon: 'question',
      title: 'You are Submitting the Quiz',
      text: 'This action cannot be reversed',
      showCancelButton: true,
      confirmButtonText: 'Submit'
    }).then((result)=>{
      if(result.isConfirmed){
        this.evaluateQuiz();
        console.log(this.questionsAttempted);
        console.log(this.correctAnswers);
        console.log(this.marksObtained);
        
      }
     
      
      
    })
  }

  evaluateQuiz(){
    

      this.isSubmit=true;
      // console.log(this.questions);
      
      // this.questions.forEach((question:any)=>{
      //   if(question.selectedAnswer == question.answer){
      //     this.correctAnswers++;
      //     console.log(question.selectedAnswer,question.answer);
          
      //   }
      //   if(question.selectedAnswer != 'notselected'){
      //     this.questionsAttempted++;
      //     console.log(question.selectedAnswer,question.answer);
      //     console.log(question.questionId,question.selectedAnswer);
          
      //   }
      // });
      // this.marksObtained=(this.questions[0].quiz.maxMarks/this.questions[0].quiz.numberOfQuestions)*this.correctAnswers;
    console.log(this.questions);
    
      this.quizServie.evaluateQuiz(this.questions,this.userId).subscribe({
      next: (retrivedData:any) =>{
        console.log(retrivedData);
        this.correctAnswers=retrivedData.correctAnswers;
        this.questionsAttempted= retrivedData.questionsAttempted;
        this.marksObtained= parseFloat((retrivedData.marksObtained).toFixed(2));
        
      }, 
      error: (error) =>{
        console.log(error);
        Swal.fire("Error in Evaluating Quiz from SERVER","Try Again after sometime",'error');
      }
    })

    
  }
  
  reAttemptQuiz(){
    this.isSubmit=false;
    this.questions=this.questions.array.forEach((question:any )=> {
      question['selectedAnswer']= ''
    });
    console.log(this.questions[0].selectedAnswer);
    this.ngOnInit();
    // this.questions=[];
    
    this.marksObtained=0;
  this.questionsAttempted=0;
  this.correctAnswers=0;
  }

  reduceTimer(){
    let interval =window.setInterval(()=>{
      if(this.timer<=0){
        this.evaluateQuiz();
        clearInterval(interval);
      }else{
        this.timer--;
      }
    },1000);
  }
  showRemainingTime(){
    let minutes= Math.floor(this.timer/60);
    let seconds= this.timer- (minutes*60);

    return `${minutes} min : ${seconds} sec`;
  }

}
