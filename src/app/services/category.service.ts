import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  public getcategories(){
    return this.http.get(`${baseUrl}/category/getAll`);
  }
  public addCategory(category:any){
    return this.http.post(`${baseUrl}/category/add`,category);
  }
  public getCategory(categoryId:any){
    return this.http.get(`${baseUrl}/category/get/`+categoryId);
  }
  public updateCategory(category:any){
    return this.http.put(`${baseUrl}/category/update`,category);
  }
  public deleteCategory(categoryId:any){
    return this.http.delete(`${baseUrl}/category/delete/`+categoryId);
  }
}
