export class Activity {
    id: string;
    type: string;
    startDate: Date;
    endDate: Date;

    constructor(id: string, type: string, startDate: Date, endDate: Date) {
        this.id = id;
        this.type = type;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}