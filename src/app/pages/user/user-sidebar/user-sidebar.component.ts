import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit{
  categories:any;
  constructor(private categoryService:CategoryService){

  }

  ngOnInit(): void {
    this.categoryService.getcategories().subscribe({
      next: (retrievedCategories:any)=>{
        this.categories=retrievedCategories;
      },
      error: (error:any)=>{
        Swal.fire("Error while loading Categories","Server Error",'error');
        console.log(error);
        
      }
    })
  }

}
