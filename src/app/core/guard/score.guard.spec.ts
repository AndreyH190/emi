import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { scoreGuard } from './score.guard';
import { MessageService } from 'primeng/api';

describe('scoreGuard', () => {
  let guard: scoreGuard
  let messageService: MessageService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MessageService,
        scoreGuard
      ]
    });
    messageService = TestBed.inject(MessageService);
    guard = TestBed.inject(scoreGuard);

  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation when score parameter is greater than or equal to 1', () => {
    const next: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
    next.params = { score: '2' };

    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    expect(guard.canActivate(next, state)).toBe(true);
  });

  it('should deny activation and navigate to home when score parameter is less than 1', () => {
    const next: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
    next.params = { score: '0' }; 

    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    expect(guard.canActivate(next, state)).toBe(false);
  });
});
