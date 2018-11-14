import React from 'react';

import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

export default function CombinedFlight(props) {
  const {flight, direction} = props;

  let mainFlight = flight[0];

  flight.some((f) => {
    if (direction === 'arrival' && f.t_prb) {
      mainFlight = f;
      return true;
    }

    if (direction === 'departure' && f.t_st_mar) {
      mainFlight = f;
      return true;
    }

    return false;
  });

  return (
    <tr>
      <td>
        <span dangerouslySetInnerHTML={{__html: flight.map((f) => f.co.code + f.flt).join('<br>')}} />
      </td>
      <td>
        <span dangerouslySetInnerHTML={{__html: flight.map((f) => f.co.name).join('<br>')}} />
      </td>
      <td>{mainFlight.mar1.city}</td>
      <td>{mainFlight.term}</td>
      <td>

      {(direction === 'departure') &&
        <div>
          {(mainFlight.t_st_mar && mainFlight.t_at_mar !== mainFlight.t_st_mar) &&
            <div>
              {moment(mainFlight.t_st_mar).format('LT')}
              <br />
              <span className="badge badge-info">Вылет в {  moment(mainFlight.t_at_mar).format('LT')}</span>
            </div>
          }

          {(!mainFlight.t_st_mar || mainFlight.t_at_mar === mainFlight.t_st_mar) &&
            <div>
              {  moment(mainFlight.t_at_mar).format('LT')}
            </div>
          }
        </div>
      }

      {(direction === 'arrival') &&
        <div>
          {(mainFlight.t_prb && mainFlight.t_prb !== mainFlight.t_st) &&
            <div>
              {moment(mainFlight.t_st).format('LT')}
              <br />
              <span className="badge badge-info">Прибытие в {  moment(mainFlight.t_prb).format('LT')}</span>
            </div>
          }

          {(!mainFlight.t_prb || mainFlight.t_prb === mainFlight.t_st) &&
            <div>
              {  moment(mainFlight.t_st).format('LT')}
            </div>
          }
        </div>
      }

      </td>
    </tr>
  );
}
