export class OfferItem {

  constructor(
    public title: string,
    public description: string,
    public price: number,
    public category: string,
    public dateFrom: number,
    public dateTo: number,
) {}
}
