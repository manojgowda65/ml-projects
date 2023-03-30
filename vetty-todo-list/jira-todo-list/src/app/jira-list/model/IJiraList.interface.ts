import { ICard, IHeader } from "./ICard.interface";

export interface IJiraList extends IHeader {
        cards?: ICard[]
}