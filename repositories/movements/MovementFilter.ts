export default class MovementFilter {
  from?: string;
  to?: string;

  constructor(filter?: MovementFilter) {
    this.from = filter?.from;
    this.to = filter?.to;
  }
}
