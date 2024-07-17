import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserData } from 'src/app/shared/interface/list-user';
import { GitServiceService } from 'src/app/shared/services/git-service.service';
import { nameValidator } from './custom-validator/name-validator';

const NAME_INVALID = 'gcpglobal';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  
  listUsers: UserData[];
  searchForm!: FormGroup;
  loading = false;
  graphic = false;
  onlyNames: string[];
  dataGraphic: Number[];
  
  constructor(
    private gitService: GitServiceService,
    private fromBuilder: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.searchForm = this.fromBuilder.group({
      search:  ['', [Validators.required, Validators.minLength(4), nameValidator(NAME_INVALID)]],
    });
  }

  getUsers() {
    this.loading = true;
    this.gitService.getListUsers(this.searchForm.value.search).subscribe({
      next: (response) => {
        this.listUsers = response.items;
        this.createArrayWithNames(this.listUsers);
      }, 
      error: () => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error al buscar con ese nombre' });
      },
      complete: () => {
        this.loading = false;
      }
    })
  } 

  createArrayWithNames(listNamesUsers: UserData[] ) {
    this.onlyNames = listNamesUsers.map((item) => {
        return item.login
    })
    this.createDataForGraphic(this.onlyNames);
  }

  async createDataForGraphic(array: string[]): Promise<void> {
    const promises = array.map((item) => this.gitService.getInfoUser(item));

    const results = await Promise.all(promises);

    this.dataGraphic = results.map((item) => item.followers);
    this.activeGraphic();
  }

  activeGraphic() {
    this.graphic = true;
  }

}
