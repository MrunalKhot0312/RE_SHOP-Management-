import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const sellerAuthGuard: CanActivateFn = (route, state) => {

  const router=inject(Router);
  
    const customerData=localStorage.getItem('user');
    if(customerData)
    {
      return true;
    }
    else{
      return router.navigate(['/']);
    }

};
