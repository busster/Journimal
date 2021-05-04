import moment from 'moment';

export class Event {
  id: string;
  type: string;
  date: moment.Moment;

  constructor(id: string, type: string, date: moment.Moment) {
    this.id = id;
    this.type = type;
    this.date = date;
  }
}
