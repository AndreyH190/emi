import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GitServiceService } from 'src/app/shared/services/git-service.service';
import { MessageService, SharedModule } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { InfoUserData } from 'src/app/shared/interface/list-user';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastModule } from 'primeng/toast';
import { LoadingComponent } from 'src/app/core/components/loading/loading.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let gitService: GitServiceService;
  let messageService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ToastModule
      ],
      declarations: [
        ProfileComponent,
        LoadingComponent
      ],
      providers: [
        GitServiceService,
        MessageService
      ]
    });
    fixture = TestBed.createComponent(ProfileComponent);
    gitService = TestBed.inject(GitServiceService);
    messageService = TestBed.inject(MessageService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set loading to true while fetching user info', fakeAsync(() => {
    const nameUser = 'example';
    spyOn(gitService, 'getInfoUser').and.returnValue(Promise.resolve({ } as Promise<InfoUserData>));
    
    component.nameUser = nameUser;
    component.getInfoUser();

    tick();
    expect(component.loading).toEqual(false);
  }));

  it('should set infoUser with response data', fakeAsync(() => {
    const mockResponse = { /* Datos de prueba simulados */ } as InfoUserData;
    spyOn(gitService, 'getInfoUser').and.returnValue(Promise.resolve(mockResponse));
    
    component.nameUser = 'example';
    component.getInfoUser();
    
    tick();
    expect(component.infoUser).toEqual(mockResponse);
  }));

});
