import admin from 'firebase-admin'
import moment from 'moment'

export const timestamp = (date: moment.Moment) : admin.firestore.Timestamp => admin.firestore.Timestamp.fromDate(date.toDate())
