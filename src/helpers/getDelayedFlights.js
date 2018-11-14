import moment from 'moment';

export default function getDelayedFlights(schedule, direction) {
  return schedule.filter((flight) => {
    if (direction === 'departure') {
      if (flight.t_st_mar && +moment(flight.t_at_mar).format('x') > +moment(flight.t_st_mar).format('x')) {
        return true;
      }

      return false;
    }

    if (direction === 'arrival') {
      if (flight.t_prb && +moment(flight.t_prb).format('x') > +moment(flight.t_st).format('x')) {
        return true;
      }

      return false;
    }

    return false;
  });
}
