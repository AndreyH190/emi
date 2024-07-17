import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
  
export class scoreGuard implements CanActivate {
  constructor(private router: Router, private messageService: MessageService) { }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const paramValue = next.paramMap.get('score');
    
    if (paramValue && paramValue >= '1') {
      return true;
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `El score es menor de 1` });
      this.router.navigate(['']);
      return false;
    }
  }
}
