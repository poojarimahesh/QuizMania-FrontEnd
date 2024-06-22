import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit{
  questionId:any;
  public Editor = ClassicEditor;
  question={
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    quiz:{
      qid:0,
      title:''
    }
  }
  constructor(private activatedRoute:ActivatedRoute,private questionService:QuestionService,private router:Router,private matSnackbar:MatSnackBar ){

  }

  ngOnInit(): void {
    this.questionId=this.activatedRoute.snapshot.params['questionId'];
    console.log(this.questionId);
    this.questionService.getQuestion(this.questionId).subscribe({
      next: (retrievedQuestion:any) => {
        this.question=retrievedQuestion;
      },
      error: (error) =>{
        console.log(error);
        Swal.fire("Server Error",error.error.message,'error');
        
      }
    })
  }

  updateQuestion(){
    if(this.question.content.trim()=='' || this.question.content.trim()==null){
      this.matSnackbar.open("Enter Content","OK",{
        duration:3000,
      });
      return;
    }
    if(this.question.option1.trim()=='' || this.question.option1.trim()==null){
      this.matSnackbar.open("Enter Option1","OK",{
        duration:3000,
      });
      return;

    }
    if(this.question.option2.trim()=='' || this.question.option2.trim()==null){
      this.matSnackbar.open("Enter Option2","OK",{
        duration:3000,
      });
      return;
    }
    if(this.question.answer.trim()=='' || this.question.answer.trim()==null){
      this.matSnackbar.open("Select Answer","OK",{
        duration:3000,
      });
      return;

    }
    this.questionService.updateQuestion(this.question).subscribe({
      next: (updatedQuestion:any)=>{
        Swal.fire({
          icon: 'success',
          title: 'Question Updated Successfully',
          confirmButtonText: 'Okay'
        }).then((result)=>{
          if(result.isConfirmed){
            this.router.navigate(['/admin/view-questions/'+this.question.quiz.qid+'/'+this.question.quiz.title]);
          }
        })
      }, 
      error: (error) =>{
        Swal.fire("Server Error",error.error.message,'error');
        console.log(error);
        
      }
    })
  }

}
