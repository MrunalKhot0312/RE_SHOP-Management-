import { Component, inject, OnInit } from '@angular/core';
import { CategoryServiceService } from '../../../service/category-service.service';
import { SubcategoryService } from '../../../service/subcategory.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
export interface ISubCategory {
  id?: number;        
  name: string;
  categoryId: number; 
  imageUrl?: string; 
}
@Component({
  selector: 'app-subcategory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subcategory.component.html',
  styleUrl: './subcategory.component.css'
})
export class SubcategoryComponent  implements OnInit {
subcategories: any[] = [];
  categories: any[] = [];

  selectedCategoryId!: number;
selectedSubCategoryId!: number;


  newSubCategory: any = {
    name: '',
    category_Id: 0,
    imageUrl: ''
  };

  isEdit = false;
  imagePreview: string | null = null;

  private subCategoryService = inject(SubcategoryService);
  private categoryService = inject(CategoryServiceService);

  ngOnInit(): void {
    this.loadSubCategories();
    this.loadCategories();
  }

 
  loadSubCategories() {
    this.subCategoryService.getAll().subscribe({
      next: (res: any) => {
        console.log("SubCategories:", res);
        this.subcategories = res;
      },
      error: (err: any) => {
        console.error("Error fetching subcategories:", err);
      }
    });
  }

  loadCategories() {
this.categoryService.getAll().subscribe({
      next: (res: any) => {
        console.log("Categories:", res);
        this.categories = res;
      },
      error: (err: any) => {
        console.error("Error fetching categories:", err);
      }
    });
  }

  onImageSelected(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.newSubCategory.imageUrl = reader.result as string;
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  
  addSubCategory() {

  if (!this.newSubCategory.categoryId) {
    alert("Please select category");
    return;
  }

  this.subCategoryService.create(this.newSubCategory).subscribe({
    next: () => {
      alert("SubCategory added successfully");
      this.resetForm();
      this.loadSubCategories();
    }
  });
}

  
 editSubCategory(s: any) {
  this.isEdit = true;

  this.newSubCategory = {
    id: s.id,
    name: s.name,
    categoryId: s.category?.id || s.categoryId,
    imageUrl: s.imageUrl
  };

  this.imagePreview = s.imageUrl;
}

  
  updateSubCategory() {
    if (!this.newSubCategory.id) {
      alert("SubCategory ID missing!");
      return;
    }

    this.subCategoryService.update(this.newSubCategory.id, this.newSubCategory).subscribe({
      next: () => {
        alert("SubCategory updated successfully");
        this.resetForm();
        this.loadSubCategories();
      },
      error: (err: any) => {
        console.error("Error updating subcategory:", err);
      }
    });
  }

  
  deleteSubCategory(id: number) {
    if (!confirm("Are you sure you want to delete this subcategory?")) return;

    this.subCategoryService.delete(id).subscribe({
      next: () => {
        alert("SubCategory deleted successfully");
        this.loadSubCategories();
      },
      error: (err: any) => {
        console.error("Error deleting subcategory:", err);
      }
    });
  }

  
  resetForm() {
    this.isEdit = false;
    this.newSubCategory = {
      name: '',
      categoryId: 0,
      imageUrl: ''
    };
    this.imagePreview = null;
  }
}
