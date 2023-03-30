import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JiraService } from './jira.service';
import { IJiraList } from './model/IJiraList.interface';

@Component({
  selector: 'app-jira-list',
  templateUrl: './jira-list.component.html',
  styleUrls: ['./jira-list.component.css']
})
export class JiraListComponent {

  jiraList:IJiraList[]=[];
  showAddListModal=false;

  newListForm = new FormGroup({
    newListHeader :new FormControl('',Validators.required)
  })

  /**
   *
   */
  constructor(private jiraService:JiraService) {
  }

  ngOnInit(){
    this.jiraList = this.jiraService.getExistingList();
  }



  addNewList(form:any){
   this.jiraService.addNewList(form.newListHeader)
    this.showAddListModal=false;
    this.newListForm.reset();
  }

  
  hasRequiredError(controlName){
    return this.newListForm.touched && this.newListForm.get(controlName).errors &&this.newListForm.get(controlName).errors['required'];

  }

}
