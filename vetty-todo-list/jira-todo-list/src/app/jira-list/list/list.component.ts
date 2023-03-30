import { Component, Input} from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { JiraService } from '../jira.service';
import { ICard } from '../model/ICard.interface';

import { IJiraList } from '../model/IJiraList.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() list: IJiraList;

  showAddCardModal = false;

  cardFormGroup = new FormGroup({
    header: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  /**
   *
   */
  constructor(private jiraService: JiraService) {
  }

  deleteList(listId: number) {
    this.jiraService.deleteListById(listId);
  }



  addCardInfo() {
    this.jiraService.addNewCard(this.list.id, {
      id: this.jiraService.getNextPrimarySequenceId(this.list.cards),
      createdOnDateTime: new Date(),
      parentListId:this.list.id,
      ...this.cardFormGroup.value
    }
    );
    this.showAddCardModal=false;
    this.cardFormGroup.reset();
  }

  dragDrop(ev,targetListId){
    ev.preventDefault();
    var data = JSON.parse(ev.dataTransfer.getData("cardInfo"));
    this.jiraService.moveCardToNewList(data,targetListId);
  }

  allowDrop(ev){
    ev.preventDefault();
  }


  drag(event,cardInfo:ICard){
    event.dataTransfer.setData("cardInfo", JSON.stringify(cardInfo));
  }

  hasRequiredError(controlName){
    return this.cardFormGroup.touched  &&  this.cardFormGroup.get(controlName).errors && this.cardFormGroup.get(controlName).errors['required'];

  }
}
