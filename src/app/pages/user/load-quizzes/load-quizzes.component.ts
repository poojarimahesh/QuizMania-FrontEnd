import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quizzes',
  templateUrl: './load-quizzes.component.html',
  styleUrls: ['./load-quizzes.component.css']
})
export class LoadQuizzesComponent implements OnInit{
  categoryId:any;
  quizzes:any;
  categoryTitle:any;
  constructor(private activatedRoute:ActivatedRoute,private quizService:QuizService,private categoryService:CategoryService){

  }
  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe((params)=>{
      console.log(params);
      
      if(params['categoryId']==0){
        console.log(this.quizzes);
        this.quizService.getActiveQuizzes().subscribe({
          
          next: (retrievedQuizzes:any) =>{
            console.log(retrievedQuizzes);
            
            this.quizzes=retrievedQuizzes;
            this.categoryTitle=null;
          },
          error: (error) =>{
            console.log(error);
            Swal.fire("Error loading Quizzes from SERVER","Try Again after sometime",'error');
            
          }
        });

      }else{
        this.categoryId=this.activatedRoute.snapshot.params['categoryId'];
        
        this.quizService.getActiveQuizzesOfCategory(this.categoryId).subscribe({
          next: (retrievedQuizzes:any)=>{
            
            this.quizzes=retrievedQuizzes;
            console.log(this.quizzes);
            if(this.quizzes.length==0){
              this.categoryService.getCategory(this.categoryId).subscribe({
                next: (currentcategory:any) =>{
                  this.categoryTitle=currentcategory.title;
                },
                error: (error) =>{
                  console.log(error);
                  // Swal.fire("Error while retrieving Category from Server","Check Server once",'error');
                  Swal.fire("Server Error",error.error.message,'error');
                }
              })
            }else{
              this.categoryTitle=this.quizzes[0].category.title;
            }
            
            
          },
          error: (error) =>{
            console.log(error);
            // Swal.fire("Error loading Quizzes from SERVER","Try Again after sometime",'error');
            Swal.fire("Server Error",error.error.message,'error');
            
          }
        })
        
      }
      
    })
  }

}
