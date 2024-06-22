import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit{

  category={
    cid: '',
    title:'',
    description:''
  }
   constructor(private categoryService:CategoryService,private activatedRoute:ActivatedRoute , private router:Router){
    
   }

  ngOnInit(): void { 
    this.category.cid=this.activatedRoute.snapshot.params['categoryId'];
    console.log(this.category.cid);
    this.categoryService.getCategory(this.category.cid).subscribe({
      next: (retrievedCategory:any)=>{
        this.category=retrievedCategory;
      }
      ,
      error: (error) =>{
        Swal.fire("Server Error in getting ",error.error.message,'error');
      }
    })
    // this.categoryService.getCategory(this.category.cid);

  }
  updateCategory(){
    this.categoryService.updateCategory(this.category).subscribe({
      next: (retrivedCategory:any)=>{
        Swal.fire("Category '"+this.category.title+"' Updated Successfully","","success");
        this.router.navigate(['/admin/categories']);
      },
      error: (error)=>{
        Swal.fire("Server Error",error.error.message,'error');
      }
    })
  }

}
