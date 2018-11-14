import _ from 'lodash';
import moment from 'moment';

export default function groupCombinedFlights(schedule, direction) {
  const groupedFlights = _.groupBy(schedule, 'main_flight');
  const singleFlights = groupedFlights[''];

  delete groupedFlights[''];

  const combinedFlights = Object.values(groupedFlights);

  return [].concat(singleFlights, combinedFlights).sort((a, b) => {
    let comparedA = a;
    let comparedB = b;

    if (Array.isArray(a)) {
      comparedA = a[0];
    }

    if (Array.isArray(b)) {
      comparedB = b[0];
    }

    if (direction === 'arrival') {
      return +moment(comparedA.t_st).format('x') - +moment(comparedB.t_st).format('x');
    }

    if (direction === 'departure') {
      if (comparedA.t_st_mar && comparedB.t_st_mar) {
        return +moment(comparedA.t_st_mar).format('x') - +moment(comparedB.t_st_mar).format('x');
      }

      return +moment(comparedA.t_at_mar).format('x') - +moment(comparedB.t_at_mar).format('x');
    }

    return -1;
  });
}
