import { Injectable } from "@angular/core";
import { ICard, IHeader } from "./model/ICard.interface";
import { IJiraList } from "./model/IJiraList.interface";

@Injectable()
export class JiraService {
    private jiraList: IJiraList[] = [];

    getExistingList() {
        let list = this.checkLocalStorageForData();
        if(list && list.length>0){
            this.jiraList=list;
        }
        else {
            this.setToLocalStorage();
        }
        return this.jiraList;
    }

    addNewList(header: string) {
        this.jiraList.push({
            header: header,
            id: this.getNextPrimarySequenceId(this.jiraList)
        })
        this.setToLocalStorage();

    }

    deleteListById(listId) {
        this.jiraList.splice(this.jiraList.findIndex(x => x.id == listId), 1);
        this.setToLocalStorage();

    }


    addNewCard(listId: number, cardInfo: ICard) {
        let list = this.findListById(listId);
        if(!list.cards)
            list.cards=[];
        list.cards.push(cardInfo);

        this.setToLocalStorage();

    }

    deleteCard(listId:number, cardId) {
        let list = this.findListById(listId);
        if(!list.cards)
            list.cards=[];
        list.cards.splice(list.cards.findIndex(x => x.id == cardId),1);
        this.setToLocalStorage();
    }

    moveCardToNewList(cardInfo:ICard,targetListId:number){
        this.deleteCard(cardInfo.parentListId,cardInfo.id);
        let newListCards = this.jiraList.find(x=>x.id==targetListId).cards;
        cardInfo.id = this.getNextPrimarySequenceId(newListCards);
        cardInfo.parentListId=targetListId;
        this.addNewCard(targetListId,cardInfo);
        if(newListCards)
            newListCards= newListCards.sort((a,b)=>{
                return new Date(a.createdOnDateTime).getTime()<new Date(b.createdOnDateTime).getTime()?1:-1;
            });
        this.setToLocalStorage();
    }

 
    private checkLocalStorageForData(){
        return JSON.parse(localStorage.getItem('jiraList'));
    }

    private setToLocalStorage(){
        localStorage.setItem('jiraList',JSON.stringify(this.jiraList));
    }


    private findListById(listId) {
        return this.jiraList.find(x => x.id == listId);
    }

 getNextPrimarySequenceId(list:IHeader[]) {
        if(list && list.length)
            return Math.max(...list.map(x => x.id)) + 1
        return 1;
    }
}