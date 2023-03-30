export interface ICard extends IHeader {
        description?: string;
        createdOnDateTime?: Date
        parentListId?:number;
}

export interface IHeader {
        id?: number;
        header?: string;
}