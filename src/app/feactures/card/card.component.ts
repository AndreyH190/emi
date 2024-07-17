import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from 'src/app/shared/interface/list-user';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() listUserSearch: UserData[];

  constructor(private router: Router){}

  redirectProfile(profile:UserData) {
    this.router.navigate(['/detalle', profile.login, profile.score]);
  }

}
