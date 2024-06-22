import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  constructor(private quizService:QuizService){

  }
  quizzes=[
    {
      qid: 24,
      title: 'Basics of Bhagwad Gita',
      description: "Questions related to humans , nature & GOD",
      maxMarks: '200',
      numberOfQuestions: '10',
      active: 'true',
      category: {
        cid: 10,
        title: "Temp category",
      }
    },
    {
      qid: 24,
      title: 'Basics of Bhagwad Gita',
      description: "Questions related to humans , nature & GOD",
      maxMarks: '200',
      numberOfQuestions: '10',
      active: 'true',
      category: {
        cid: 10,
        title: "Temp category",
      }
    },
    {
      qid: 24,
      title: 'Basics of Bhagwad Gita',
      description: "Questions related to humans , nature & GOD",
      maxMarks: '200',
      numberOfQuestions: '10',
      active: 'true',
      category: {
        cid: 10,
        title: "Temp category",
      }
    }
  ]
  ngOnInit(): void {
    this.quizService.getQuizzes().subscribe({
      next: (receivedQuizzes:any) =>{
        this.quizzes=receivedQuizzes;
        console.log(this.quizService);
        
        
      },
      error: (error:any)=> {
        console.log(error);
        Swal.fire("Error while retriving Quizzes from Bakend","","error");
        
      }
    })
  }
  
  deleteQuiz(qid:any,title:any){
   Swal.fire({
    icon: 'question',
    title:'Are you sure ?',
    text: 'Deleting Quiz "'+title+'"',
    confirmButtonText: 'Delete',
    showCancelButton: true
   }).then(result =>{
    if(result.isConfirmed){

      this.quizService.deleteQuiz(qid).subscribe({
        next: ()=>{
          Swal.fire("Quiz Deleted Successfully","",'success');
        },
        error: (result)=>{
          Swal.fire("Server Error",result.error.message,'error');
          console.log(result);
          
        }
       })
       this.quizzes=this.quizzes.filter((quiz)=> quiz.qid!=qid);
    }
   }) 
  }
 

}
