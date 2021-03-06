export class OfferCreationForm {

  /**
   * Data object for the offer creation form.
   */
  constructor(
    public title: string,
    public description: string,
    public price: string,
    public category: string,
    public dateFrom: number,
    public dateTo: number
  ) {}
}
