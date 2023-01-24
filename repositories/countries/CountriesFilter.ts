export default class CountriesFilter {
  ids?: number[] | undefined[];

  constructor(cardsFilter?: CountriesFilter) {
    this.ids = cardsFilter?.ids;
  }
}
