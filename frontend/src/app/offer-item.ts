export class OfferItem {

  constructor(
    public id: number,
    public title: string,
    public description: string,
    public price: string,
    public category: string,
    public dateFrom: string,
    public dateTo: string,
    public canBeDeleted: boolean,
    public canBeSetPublic: boolean,
    public canBeEdited: boolean
) {}
}
