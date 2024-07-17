import { TestBed } from '@angular/core/testing';

import { GitServiceService } from './git-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InfoUserData, ListUser } from '../interface/list-user';

const GIT_URL = 'https://api.github.com';

describe('GitServiceService', () => {
  let service: GitServiceService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

    });
    service = TestBed.inject(GitServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return list of users', () => {
    const dummyUsers: ListUser = { } as ListUser;

    const nameUser = 'example';
    service.getListUsers(nameUser).subscribe(users => {
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne(`${GIT_URL}/search/users?q=${nameUser}&per_page=10`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });

  it('should return list of users', async() => {
    const dummyUsers: InfoUserData = { } as InfoUserData;

    const nameUser = 'example';

    service.getInfoUser(nameUser).then((data) => {
    expect(data).toEqual(dummyUsers);
  });

    const req = httpMock.expectOne(`${GIT_URL}/users/${nameUser}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });
});
