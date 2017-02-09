import moment from 'moment';

export function dateFromTimestamp(timestamp) {
  return moment.unix(timestamp).format("dddd DD");
};