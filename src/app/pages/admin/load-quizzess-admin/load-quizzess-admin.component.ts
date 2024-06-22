import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quizzess-admin',
  templateUrl: './load-quizzess-admin.component.html',
  styleUrls: ['./load-quizzess-admin.component.css']
})
export class LoadQuizzessAdminComponent implements OnInit{
  cid:any=0;
  categoryTitle:any;
  quizzes:any=[]
  constructor(private activatedRoute:ActivatedRoute,private quizService:QuizService,private categoryService:CategoryService){

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      
      if(params['cid']==0){
        this.quizService.getQuizzes().subscribe({
          next: (retrievedData:any) =>{
            this.quizzes=retrievedData;
            this.categoryTitle=null;
          },
          error: (error)=>{
            Swal.fire("Error while loading quizzess",'Server Error','error');
            Swal.fire("Server Error",error.error.message,'error');
          }
        })
      }else{
        this.cid=this.activatedRoute.snapshot.params['cid'];
      this.quizService.getQuizzesOfCategory(this.cid).subscribe({
        next: (retrivedQuizzes:any) =>{
          this.quizzes=retrivedQuizzes;
          console.log(retrivedQuizzes);
          if(this.quizzes.length==0){
            this.categoryTitle=this.categoryService.getCategory(this.cid).subscribe({
              next: (retrievedData:any) =>{
                this.categoryTitle=retrievedData.title;
                console.log(this.categoryTitle);
                
              },
              error: (error)=>{
                Swal.fire("Server Error",error.error.message,'error');
              }
            })
          }else{
            this.categoryTitle=this.quizzes[0].category.title;
          }
        },
        error: (error)=>{
          Swal.fire("Server Error",error.error.message,'error');
        }
      })
      
      }
      
    })
    
    
  }
  deleteQuiz(quizId:any,quizTitle:any){
    Swal.fire({
      icon: 'question',
      text: 'Are you Sure..?',
      title:'Deleting Quiz "'+quizTitle+'"',
      showCancelButton: true,
      confirmButtonText: 'Delete'
    }).then((result)=>{
      if(result.isConfirmed){
        this.quizService.deleteQuiz(quizId).subscribe({
          next: (data:any)=>{
            Swal.fire('Quiz "'+quizTitle+'"',"Deleted Successfully",'success');
          },
          error: (error) =>{
            Swal.fire("Server Error",error.error.message,'error');
          }
        })
      }
      
    })

  }

}
