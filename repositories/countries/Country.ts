export default class Country {
  id?: number;
  name?: string;
  code?: string;

  constructor(item?: Country) {
    this.id = item?.id;
    this.name = item?.name;
    this.code = item?.code;
  }
}
