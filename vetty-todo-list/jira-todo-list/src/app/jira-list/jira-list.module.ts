import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Route, RouterModule } from "@angular/router";
import { CardComponent } from "./card/card.component";
import { JiraListComponent } from "./jira-list.component";
import { JiraService } from "./jira.service";
import { ListComponent } from "./list/list.component";

 
const routes: Route[] = [{
    path: '', component: JiraListComponent
}]

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule],
    declarations: [
        CardComponent,
        ListComponent,
        JiraListComponent
    ],
    providers: [JiraService]
})
export class JiraListModule {

}