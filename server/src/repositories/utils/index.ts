import admin from 'firebase-admin'
import moment from 'moment'

export const timestamp = (date: moment.Moment) : admin.firestore.Timestamp => admin.firestore.Timestamp.fromDate(date.toDate())
export const toDateString = (date : admin.firestore.Timestamp) : string => date === null ? null : moment(date.toDate()).format()
export const toDate = (date : admin.firestore.Timestamp) : moment.Moment => date === null ? null : moment(date.toDate())
