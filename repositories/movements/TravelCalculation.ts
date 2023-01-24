export default class TravelCalculation {
  travelHistory?: Map<number, number>;

  constructor(data?: TravelCalculation) {
    this.travelHistory = data?.travelHistory;
  }
}
