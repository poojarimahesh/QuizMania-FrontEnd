import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit{

  categories =[
    {
      cid: 3,
      title: 'Bhagwad Gita',
      description: 'This category contains quizzes related to Bhagwad Gita',
    },
    {
      cid: 3,
      title: 'Bhagwad Gita',
      description: 'This category contains quizzes related to Bhagwad Gita',
    },
    {
      cid: 3,
      title: 'Bhagwad Gita',
      description: 'This category contains quizzes related to Bhagwad Gita',
    }
  ]
  constructor(private categoryService:CategoryService){

  }
  ngOnInit(): void {
    this.categoryService.getcategories().subscribe({
      next: (data:any)=>{
        this.categories=data;
        console.log(this.categories);
        
      },
      error: (error)=>{
        console.log(error);
        console.log(error);
        Swal.fire("Error","Error in loading Categories from backend","error");
        
      }
      
     } )
  }

  deleteCategory(categoryId:any,categorytitle:any){

    Swal.fire({
      icon: 'question',
      title:'Are you sure ?',
      text: 'Deleting Category "'+categorytitle+'"',
      confirmButtonText: 'Delete',
      showCancelButton: true
     }).then(result =>{
      if(result.isConfirmed){
  
        this.categoryService.deleteCategory(categoryId).subscribe({
          next: ()=>{
            Swal.fire("Category Deleted Successfully","",'success');
          },
          error: (result)=>{
            Swal.fire("Error in deleteing Category",'','error');
            Swal.fire("Server Error",result.error.message,'error');
            console.log(result);
            
          }
         })
         this.categories=this.categories.filter((category)=> category.cid!=categoryId);
      }
     }) 
  }

}
