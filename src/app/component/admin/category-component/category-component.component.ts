import { Component, inject } from '@angular/core';
import { Category, CategoryServiceService } from '../../../service/category-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-component.component.html',
  styleUrl: './category-component.component.css'
})
export class CategoryComponentComponent {

  categories: Category[] = [];

  newCategory: Category = {
    name: '',
    imageUrl: ''
  };

  isEdit = false;
  imagePreview: string | null = null;

  private categoryService = inject(CategoryServiceService);

  ngOnInit(): void {
    this.loadCategories();
  }

 
  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (res) => {
        this.categories = res;
        console.log("Categories:", res);
      },
      error: (err) => console.error(err)
    });
  }


  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.newCategory.imageUrl = reader.result as string;
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  
  addCategory() {

    if (!this.newCategory.name) {
      alert("Category name required!");
      return;
    }

    this.categoryService.add(this.newCategory).subscribe({
      next: () => {
        alert("Category added successfully");
        this.resetForm();
        this.loadCategories();
      },
      error: (err) => console.error(err)
    });
  }

  editCategory(c: Category) {
    this.isEdit = true;
    this.newCategory = { ...c };
    this.imagePreview = c.imageUrl || null;
  }


  updateCategory() {
    if (!this.newCategory.id) {
      alert("Category ID missing!");
      return;
    }

    this.categoryService.update(this.newCategory.id, this.newCategory).subscribe({
      next: () => {
        alert("Category updated successfully");
        this.resetForm();
        this.loadCategories();
      },
      error: (err) => console.error(err)
    });
  }


  deleteCategory(id: number) {
    if (!confirm("Delete this category?")) return;

    this.categoryService.delete(id).subscribe({
      next: () => {
        alert("Category deleted");
        this.loadCategories();
      },
      error: (err) => console.error(err)
    });
  }

 
  resetForm() {
    this.isEdit = false;
    this.newCategory = { name: '', imageUrl: '' };
    this.imagePreview = null;
  }
}