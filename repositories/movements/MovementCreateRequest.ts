export default class MovementCreateRequest {
  countryId: number;
  enterDate: string;
  exitDate?: string;

  constructor(data: MovementCreateRequest) {
    this.countryId = data.countryId;
    this.enterDate = data.enterDate;
    this.exitDate = data.exitDate;
  }
}
