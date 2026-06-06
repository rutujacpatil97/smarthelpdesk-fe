import { inject } from '@angular/core';

import { HttpInterceptorFn } from '@angular/common/http';

import { finalize } from 'rxjs';
import { LoaderService } from '../../../services/loader/loader.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);

  loaderService.isLoading.next(true);

  return next(req).pipe(
    finalize(() => {
      loaderService.isLoading.next(false);
    }),
  );
};
