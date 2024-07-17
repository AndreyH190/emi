import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoUserData } from 'src/app/shared/interface/list-user';
import { GitServiceService } from 'src/app/shared/services/git-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  nameUser: string | null;
  infoUser: InfoUserData;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private gitService: GitServiceService,
  ) { }

  ngOnInit(): void {
    this.nameUser = this.route.snapshot.paramMap.get('id');
    this.getInfoUser();  
  }

  async getInfoUser(): Promise<void> {
    if (this.nameUser) {
      this.loading = true;
      this.infoUser = await this.gitService.getInfoUser(this.nameUser).then((infoUser) => {
        this.loading = false;
        return infoUser;
      });
    }
  }
}
