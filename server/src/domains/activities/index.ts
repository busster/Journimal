import moment from 'moment';

export class Activity {
  id: string;
  type: string;
  startDate: moment.Moment;
  endDate: moment.Moment;

  constructor(id: string, type: string, startDate: moment.Moment, endDate: moment.Moment) {
    this.id = id;
    this.type = type;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  complete (endDate: moment.Moment) : void {
    this.endDate = endDate;
  }
}