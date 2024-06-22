import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit{
  quizId=0;
  url=''
  quizTitle='';
  question={
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    quiz:{
      qid:0,
    }
  }

  constructor(private activatedRoute:ActivatedRoute,private questionService:QuestionService,private router:Router, private snack:MatSnackBar){

  }
  ngOnInit(): void {
    this.quizId=this.activatedRoute.snapshot.params["quizId"];
    this.quizTitle=this.activatedRoute.snapshot.params['qTitle'];
    this.question.quiz.qid=this.quizId;

    console.log(this.quizId);
    console.log(this.quizTitle);
    
  }

  addQuestion(){
    if(this.question.content.trim()=='' || this.question.content.trim()==undefined){
      this.snack.open("Enter Question Content","OK",{
        duration: 3000,
      });
      return;
    }
    if(this.question.option1.trim()=='' || this.question.option1.trim()==undefined){
      this.snack.open("Enter Option 1","OK",{
        duration: 3000,
      });
      return;
    }
    if(this.question.option2.trim()=='' || this.question.option2.trim()==undefined){
      this.snack.open("Enter Option 2 ","OK",{
        duration: 3000,
      });
      return;
    }
    if(this.question.answer.trim()=='' || this.question.answer.trim()==undefined){
      this.snack.open("Select Answer","OK",{
        duration: 3000,
      });
      return;
    }
    this.questionService.addQuestion(this.question).subscribe({
      next: (addedQuestion)=>{
        Swal.fire({
          icon: 'success',
          title: 'Question Added Successfully',
          text: 'Do you want to another question',
          showCancelButton:true,
          cancelButtonText: 'Show all Questions',
          confirmButtonText: "Add more Questions"

        }).then((result)=>{
          if(result.isConfirmed){
            this.question.content='',
            this.question.option1='',
            this.question.option2='',
            this.question.option3='',
            this.question.option4='',
            this.question.content=''
           
          }else{
            this.url="/admin/view-questions/"+this.quizId+'/'+this.quizTitle;
            this.router.navigate(["/admin/view-questions/"+this.quizId+"/"+this.quizTitle]);
          }
        })
      },
      error: (error) =>{
        Swal.fire("Error while Adding Question","SERVER error","error");
        console.log(error);
        
      }
    })
  }


}
