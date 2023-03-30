import { Component, Input,Output,EventEmitter } from '@angular/core';
import { JiraService } from '../jira.service';
import { ICard } from '../model/ICard.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() cardInfo:ICard;

/**
 *
 */
constructor(private jiraService:JiraService) {
}
 
    deleteCard(listId,cardId) {
      this.jiraService.deleteCard(listId, cardId);
    }
}
