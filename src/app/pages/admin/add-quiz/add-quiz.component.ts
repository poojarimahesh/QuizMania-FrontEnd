import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories=[
    {
      cid: 14,
      title: "Gaur/temperory Since cannot connect to server"
    },
    {
      cid: 14,
      title: "Gaur/temperory Since cannot connect to server"
    },
    {
      cid: 14,
      title: "Gaur/temperory Since cannot connect to server"
    }
  ]
  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions: '',
    maxAttempts: '',
    active: '',
    category:{
      cid:''
    }
  }

  constructor( private categoryService:CategoryService,private quizService:QuizService, private router:Router,private snackbar:MatSnackBar){

  }
  ngOnInit(): void {
    this.categoryService.getcategories().subscribe({
      next: (storedCategories:any)=>{
        this.categories=storedCategories;
      },
      error: (error) =>{
        console.log(error);
        
      }
    }
    )
  }
  
  addQuiz(){

    if(this.quizData.title=='' || this.quizData.title==null){
      this.snackbar.open("Enter Title","OK",{
        duration:3000,
      });
      return;
    }
    if(this.quizData.maxMarks=='' || this.quizData.maxMarks==null){
      this.snackbar.open("Enter MaxMarks","OK",{
        duration:3000,
      });
      return;
    }
    if(this.quizData.numberOfQuestions=='' || this.quizData.numberOfQuestions==null){
      this.snackbar.open("Enter NumberOfQuestions","OK",{
        duration:3000,
      });
      return;
    }
    if(this.quizData.category.cid=='' || this.quizData.category.cid==null){
      this.snackbar.open("Select Category from dropdown","OK",{
        duration:3000,
      });
      return;
    }

    this.quizService.addQuiz(this.quizData).subscribe({
      next: (addedQuiz:any) =>{
        Swal.fire('Quiz "'+addedQuiz.title+'" added successfully ','','success');
        this.router.navigate(['/admin/quizzes']);
      },
      error: (err)=> {
          Swal.fire('Error adding Quiz "'+this.quizData.title+'"','','error');
      },
    })
  }
}
