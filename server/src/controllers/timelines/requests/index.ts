export interface CreateEventRequest {
  type: string;
  date: string;
}
export interface CreateActivityRequest {
  type: string;
  startDate: string;
}
export interface CompleteActivityRequest {
  endDate: string;
}