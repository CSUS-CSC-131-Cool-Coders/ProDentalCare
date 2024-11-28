import { EventInput } from '@fullcalendar/core';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  // {
  //   id: createEventId(),
  //   title: 'All-day event',
  //   start: TODAY_STR
  // },
  {
    id: createEventId(),
    title: 'Meeting',
    start: '2024-11-08',
    extendedProps: {
      dentist: 'Bobby',
    },
  },
  // {
  //   id: createEventId(),
  //   title: 'Timed event',
  //   start: TODAY_STR + 'T12:00:00',
  //   end: TODAY_STR + 'T15:00:00'
  // },
  // {
  //   id: createEventId(),
  //   title: '',
  //   start: TODAY_STR,
  //   end: '2024-11-29',
  //   display: 'inverse-background',
  //   backgroundColor: 'rgb(230,230,230)',
  // }
];

// console.log(TODAY_STR + 'T15:00:00');

export function createEventId() {
  return String(eventGuid++);
}
