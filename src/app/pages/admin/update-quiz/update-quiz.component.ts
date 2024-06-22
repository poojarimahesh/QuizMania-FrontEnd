import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit{
  qid=0;
  quizData={
    title:'',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    maxAttempts: '',
    active: '',
    category:{
      cid:''
    }

  }

  categories=[
    {
      cid:'',
      title:''
    }
  ];
  constructor(private activatedRoute:ActivatedRoute, private categoryService:CategoryService, private quizServcie:QuizService,private router:Router){

  }

  ngOnInit(): void {
    this.qid=this.activatedRoute.snapshot.params['qid'];
    //getting all categories from server
  
    this.categoryService.getcategories().subscribe({
      next: (storedCategories:any)=>{
        this.categories=storedCategories;
      },
      error: (error)=>{
        console.log(error);
        Swal.fire("Error while loading Categories from SERVER","","error");
        
      }
    });

    //retrieving current quiz from SERVER
    this.quizServcie.getQuiz(this.qid).subscribe({
      next: (receivedQuiz:any)=>{
        this.quizData=receivedQuiz;
      },
      error: (error)=>{
        Swal.fire("Server Error",error.error.message,'error');
        
      }
    })
  }


updateQuiz(){

  this.quizServcie.updateQuiz(this.quizData).subscribe({
    next: (updatedQuiz:any)=>{
      Swal.fire('"'+this.quizData.title+'" Updated Successfully',"","success").then((result)=>{
        this.router.navigate(['/admin/quizzes']);
      });
      
    },
    error: (error:any)=>{
      Swal.fire('Error while updating "'+this.quizData.title+'"',"",'error');
      Swal.fire("Server Error",error.error.message,'error');
      console.log(error);
      
    }
  });

}
}
