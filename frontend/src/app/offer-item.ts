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

  clone() {
    return new OfferItem(this.id, this.title, this.description, this.price, this.category, this.dateFrom, this.dateTo,
      this.canBeDeleted, this.canBeSetPublic, this.canBeEdited);
  }
}
