import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/common/category';
import { CategoryService } from '../../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit{
  categories: Category[] = [];

  constructor(private categoryService: CategoryService,
              private toastrService: ToastrService){}

  ngOnInit(): void {
    this.listCategories();
  }

  listCategories(){
    this.categoryService.getCategoryList().subscribe(
      data => this.categories = data
    );
  }

  deleteCategoriyById(id: number){
    console.log("Id de la categoria antes de eliminar: "+id);

    Swal.fire({
      title: "Estas seguro que quiere eliminar el registro!",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategoryById(id).subscribe(
          () => this.listCategories()
        )
        Swal.fire({
          title: "Categorías",
          text: "Categoria elimanda correcatmente",
          icon: "success"
        });
      }
    });
  }
}
