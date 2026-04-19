import { Routes } from '@angular/router';
import { UserlayoutComponent } from './layout/userlayout/userlayout.component';
import { CustomerLayoutComponent } from './layout/customer-layout/customer-layout.component';
import { customerAuthGuard } from './guards/customer-auth.guard';
import { AdminLoginComponent } from './component/admin/admin-login/admin-login.component';
import { AdminlayoutComponent } from './layout/adminlayout/adminlayout.component';
import { adminAuthGuard } from './guards/admin-auth.guard';
import { SellerlayoutComponent } from './layout/sellerlayout/sellerlayout.component';
import { sellerAuthGuard } from './guards/seller-auth.guard';

export const routes: Routes = [
    {
         
        path:'',
        component:UserlayoutComponent,
        children:[
            {path:'',loadComponent:()=>import('./component/user/home/home.component').then(m=>m.HomeComponent)},
            {path:'enquiry',loadComponent:()=>import('./component/user/enquiry/enquiry.component').then(n=>n.EnquiryComponent)},
            {path:'signupseller',loadComponent:()=>import('./component/user/seller/home-seller.component').then(m=>m.SellerComponent)},
            {path:'signUp',loadComponent:()=>import('./component/user/customer/customer.component').then(m=>m.CustomerComponent)},
            {path:'login',loadComponent:()=> import('./component/user/login/login.component').then(m=>m.LoginComponent)},
            {path:'products',loadComponent:()=> import('./component/user/seller/product/product.component').then(m=>m.ProductComponent) }
        ]
    },
    {
        path:'customer',
        component:CustomerLayoutComponent,
        canActivate:[customerAuthGuard],
        children:[
            {path:'home',loadComponent:()=>import('./component/customer/home/home.component').then (m=>m.HomeComponent)},
            {path:'feedback',loadComponent:()=>import('./component/customer/feedback/feedback.component').then(m=>m.FeedbackComponent)},

                
        ]
    },
    {
        path:'seller',
        component:SellerlayoutComponent,
        canActivate:[sellerAuthGuard],
        children:[
            {path:'home',loadComponent:()=>import('./component/user/seller/home-seller/home.component').then(m=>m.HomeComponent) },
        ]
            
    },
    {
        path:'admin/login',
        component:AdminLoginComponent
    },
    {
        path:'admin',
        component:AdminlayoutComponent,
        canActivate:[adminAuthGuard],
        children:[
            {path:'dashboard',loadComponent:()=>import('./component/admin/dashboard/dashboard.component').then(m=>m.DashboardComponent) },
            {path:'categories',loadComponent:()=>import('./component/admin/category-component/category-component.component').then(m=>m.CategoryComponentComponent)},
    //          // ✅ ADD THIS
    // { path:'subcategories',
    //   loadComponent:()=>import('./component/admin/subcategory/subcategory.component')
    //   .then(m=>m.SubcategoryComponent)
    // },

    // // ✅ ADD THIS
    // { path:'products',
    //   loadComponent:()=>import('./component/user/seller/product/product.component')
    //   .then(m=>m.ProductComponent)
    // }
        ]
    }
];
