import moment from 'moment';

export function formatTimeFromNow(date: Date) {
  return moment.utc(date).local().fromNow();
}

export function formatTime(date: Date) {
  return moment.utc(date).local().format('MMM DD, YYYY, h:mm A [GMT]Z');
}

export function formatTimeShort(date: Date) {
  return moment.utc(date).local().format('MMM DD, YYYY, h:mm A');
}
