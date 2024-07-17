import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { InfoUserData, ListUser, UserData } from '../interface/list-user';

const GIT_URL = 'https://api.github.com';

@Injectable({
  providedIn: 'root'
})
export class GitServiceService {

  constructor(
      private http: HttpClient,
  ) { }

  getListUsers(nameUser: string): Observable<ListUser> {
    const params = {
      q: nameUser,
      per_page: 10
    };
    return this.http.get<ListUser>(`${GIT_URL}/search/users`, { params });
  }

  getInfoUser(nameUser: string): Promise<InfoUserData> {
    return firstValueFrom(this.http.get<InfoUserData>(`${GIT_URL}/users/${nameUser}`));
  }

}
