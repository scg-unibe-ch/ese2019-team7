export class OfferItem {

  /**
   * Data Object for the offer item
   * @param canBeDeleted: Flag if the delete button should be shown
   * @param canBeSetPublic: Flag if the set public and deny buttons should be shown
   * @param canBeEdited: Flag if the edit button should be shown.
   * Other parameters should be self-explanatory.
   */

  constructor(
    public id: number,
    public title: string,
    public description: string,
    public price: string,
    public category: string,
    public dateFrom: string,
    public dateTo: string,
    public status: string,
    public canBeDeleted: boolean,
    public canBeSetPublic: boolean,
    public canBeEdited: boolean
) {}

  /**
   * Returns a copy of itself.
   */
  clone() {
    return new OfferItem(this.id, this.title, this.description, this.price, this.category, this.dateFrom, this.dateTo, this.status,
      this.canBeDeleted, this.canBeSetPublic, this.canBeEdited);
  }
}
