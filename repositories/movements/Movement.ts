export default class Movement {
  id?: number;
  countryId?: number;
  userId?: number;
  enterDate?: string;
  exitDate?: string;

  constructor(data?: Movement) {
    this.id = data?.id;
    this.countryId = data?.countryId;
    this.userId = data?.userId;
    this.enterDate = data?.enterDate;
    this.exitDate = data?.exitDate;
  }
}
