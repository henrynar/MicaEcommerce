import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/common/category';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit{
  id: number= 0;
  name: string = '';

  constructor(private categoryService: CategoryService,
              private toastrService: ToastrService,
              private activatedRoute: ActivatedRoute,
              private router: Router){}

  ngOnInit(): void {
    this.getCategoryById();
  }

  addCategory(){
    console.log(this.name);
    let category = new Category(this.id, this.name);
    this.categoryService.createCategory(category).subscribe(
      res => {
        this.toastrService.success('Categoria registrada correcyamente', 'Categorias');
        this.router.navigate(['admin/category']);
      }
    )}

    getCategoryById(){
      this.activatedRoute.params.subscribe(
        category => {
          let id = category['id'];
          if(id){
            console.log('Valor de la variable id: '+ id);
            this.categoryService.getCategoryById(id).subscribe(
              data => {
                this.id = data.id;
                this.name = data.name;

              }
            )
          }
        }
      )
    }
}
