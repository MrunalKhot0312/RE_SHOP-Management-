import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../service/product.service';
//import { ProductService } from '../../../services/product.service';
//import { CategoryServiceService, ICategory } from '../../../services/category-service.service';
import { CategoryServiceService } from '../../../../service/category-service.service';
import { SubcategoryService } from '../../../../service/subcategory.service';
//import { SubcategoryService } from '../../../services/subcategory.service';
import { Category } from '../../../../service/category-service.service';

@Component({
  selector: 'app-manage-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  products: any[] = [];
  categories: Category[] = [];
  subcategories: any[] = [];

  isEdit = false;
  selectedCategoryId: number | null = null;
  imagePreview: string | null = null;


  newProduct: any = this.getEmptyProduct();

  constructor(
    private productservice: ProductService,
    private categoryService: CategoryServiceService,
    private subCategoryService: SubcategoryService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();

  }

  getEmptyProduct() {
    return {
      id: null,
      productName: '',
      price: 0,
      stock: 0,
      available: true,
      imageUrl: '',
      subCategoryId: 0,
      sellerId: 0,
      images: [],
      specifications: []
    };
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (res) => {
        console.log("Categories from API", res);
        this.categories = res;
      },
      error: (err: any) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  loadProducts() {
    this.productservice.getAll().subscribe({
      next: (res) => {
        console.log("Products from API", res);
        this.products = res;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  onCategoryChange(catId: number) {
    if (!catId) return;

    this.selectedCategoryId = catId;

    this.newProduct.subCategoryId = 0;
    this.newProduct.subCategory.id = 0;

    this.subCategoryService.getByCategory(catId).subscribe({
      next: (res) => this.subcategories = res,
      error: (err) => console.error(err)
    });
  }

  onImageSelected(event: any) {
    const file = event.target.files;

    this.newProduct.images = [];
    this.imagePreview = null;

    if (!file.length) return
    Array.from(file).forEach((file: any) => {
      const reader = new FileReader();

      reader.onload = () => {
        this.newProduct.images.push(reader.result as string);

        if (!this.imagePreview) {
          this.imagePreview = reader.result as string
        }
      };

      reader.readAsDataURL(file);
    });
  }

  addSpecification() {
    this.newProduct.specifications.push({
      name: '',
      description: ''
    });
  }

  removeSpecification(index: number) {
    this.newProduct.specifications.splice(index, 1);
  }

  addProduct() {
    this.productservice.create(this.newProduct).subscribe({
      next: () => {
        alert('Product Saved');
        this.resetForm();
        this.loadProducts();
      },
      error: (err) =>
        alert('Error: ' + (err.error || err.message))
    });
  }

  editProduct(p: any) {
    this.isEdit = true;

    this.newProduct = {
      id: p.id,
      productName: p.productName,
      price: p.price,
      stock: p.stock,
      available: p.available,

      imageUrl: p.imageUrl,

      categoryId: p.category?.categoryid || 0,


      sellerId: p.seller?.id || 1,

      images: p.images || [],
      specifications: p.specifications || []
    };

    this.selectedCategoryId = p.category?.id;
    this.imagePreview = p.imageUrl;

    this.onCategoryChange(this.selectedCategoryId!);
  }

  updateProduct() {
    if (!this.newProduct.id) return;

    this.productservice.update(this.newProduct.id, this.newProduct).subscribe({
      next: () => {
        alert('Product Updated');
        this.resetForm();
        this.loadProducts();
      },
      error: (err) =>
        alert('Error: ' + (err.error || err.message))
    });
  }

  deleteProduct(id: number) {
    if (!confirm('Are you sure?')) return;

    this.productservice.delete(id).subscribe({
      next: () => {
        alert('Product Deleted');
        this.resetForm();
        this.loadProducts();
      },
      error: (err) => console.error(err)
    });
  }

  resetForm() {
    this.isEdit = false;
    this.newProduct = this.getEmptyProduct();
    this.selectedCategoryId = null;
    this.imagePreview = null;
    this.subcategories = [];
  }
}