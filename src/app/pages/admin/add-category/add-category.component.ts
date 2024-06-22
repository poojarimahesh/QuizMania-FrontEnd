import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  category={
    title:'',
    description:''
  }
  constructor(private categoryService:CategoryService, private snack:MatSnackBar,private router:Router){

  }
  public addCategory(){

    if(this.category.title.trim()== '' || this.category.title== null || this.category.description.trim()== '' || this.category.description== null){

      this.snack.open('Please provide neccesary details','OK',{
        duration:3000,
      });
      return;
    }
    this.categoryService.addCategory(this.category).subscribe({
      next: (addedCategory:any)=>{
        console.log(addedCategory);
        Swal.fire("Successfully Added category",addedCategory.title,"success");
        this.category.title='';
        this.category.description='';
        this.router.navigate(['/admin/categories']);
      },
      error: (error) =>{
        console.log(error);
        Swal.fire("Error while adding category",this.category.title,"error");
        
      }
    })
  }

}
