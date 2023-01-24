import Country from "~/repositories/countries/Country";

export default class CountriesList {
  countries?: Country[];

  constructor(items?: Country[]) {
    this.countries = items;
  }
}
