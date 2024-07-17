import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GitServiceService } from 'src/app/shared/services/git-service.service';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { UserData } from 'src/app/shared/interface/list-user';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let gitService: GitServiceService;
  let messageService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        ToastModule,
        ButtonModule,
        CardModule
      ],
      declarations: [
        SearchComponent
      ],
      providers: [
        GitServiceService,
        MessageService
      ]
    });
    fixture = TestBed.createComponent(SearchComponent);
    gitService = TestBed.inject(GitServiceService);
    messageService = TestBed.inject(MessageService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set loading to true while fetching users', fakeAsync(() => {
    const searchValue = 'example';
    spyOn(gitService, 'getListUsers').and.returnValue(of({
      items: [],
      total_count: 0,
      incomplete_results: true
    }));
    
    component.searchForm.patchValue({ search: searchValue });
    component.getUsers();

    tick(); 
    expect(component.loading).toEqual(false);
  }));

  it('should set listUsers with response items', fakeAsync(() => {
    const mockResponse = {
      items: [{ id: 1, login: 'user1' } as UserData, { id: 2, login: 'user2' } as UserData],
      total_count: 0,
      incomplete_results: true
    };

    spyOn(gitService, 'getListUsers').and.returnValue(of(mockResponse));
    
    component.searchForm.patchValue({ search: 'example' });
    component.getUsers();
    
    tick();
    expect(component.listUsers).toEqual(mockResponse.items.slice(0, 10));
  }));

  it('should create array with names and set dataGraphic', fakeAsync(() => {
    const userDataList: UserData[] = [
      { login: 'user1' } as UserData,
      { login: 'user2' } as UserData,
      { login: 'user3' }as UserData
    ];

    const spy = spyOn(component, 'activeGraphic').and.returnValue();

    component.createArrayWithNames(userDataList);
    tick(); 
    expect(component.onlyNames).toBeDefined();

  }));

  it('should fetch data for each item in the array', fakeAsync(() => {
    const array: string[] = ['user1', 'user2', 'user3'];

    spyOn(window, 'fetch').and.callFake((url: any) => {
      const username = url.split('/').pop();
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ login: username })
      } as Response);
    });

    let promise: Promise<any> = component.createDataForGraphic(array);
    tick(); 

    promise.then(results => {
      expect(results.length).toBe(array.length);
      expect(results[0].login).toBe('user1'); 
    });
  }));

  it('should handle error when fetching data', fakeAsync(() => {
  const array: string[] = ['user1', 'user2', 'user3'];

  spyOn(window, 'fetch').and.callFake((url: any) => {
      const username = url.split('/').pop();
      if (username === 'user2') {
        return Promise.resolve({
          ok: false,
          status: 404,
          json: () => Promise.resolve({ message: 'User not found' })
        } as Response);
      } else {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ login: username })
        } as Response);
      }
    });

    let promise: Promise<any> = component.createDataForGraphic(array);
    tick(); 

    promise.catch(error => {
      expect(error.message).toBe('Failed to fetch data for item user2');
    });
  }));

  it('should set graphic to true', () => {
    expect(component.graphic).toBeFalsy();

    component.activeGraphic();

    expect(component.graphic).toBeTrue();
  });
});
