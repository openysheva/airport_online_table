import React from 'react';

import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

export default function SingleFlight(props) {
  const {flight, direction} = props;

  return (
    <tr>
      <td>{flight.co.code + flight.flt}</td>
      <td>{flight.co.name}</td>
      <td>{flight.mar1.city || flight.mar1.city}</td>
      <td>{flight.term}</td>
      <td>

        {(direction === 'departure') &&
          <div>
            {(flight.t_st_mar && flight.t_at_mar !== flight.t_st_mar) &&
              <div>
                {moment(flight.t_st_mar).format('LT')}
                <br />
                <span className="badge badge-info">Вылет в {  moment(flight.t_at_mar).format('LT')}</span>
              </div>
            }

            {(!flight.t_st_mar || flight.t_at_mar === flight.t_st_mar) &&
              <div>
                {  moment(flight.t_at_mar).format('LT')}
              </div>
            }
          </div>
        }

        {(direction === 'arrival') &&
          <div>
            {(flight.t_prb && flight.t_prb !== flight.t_st) &&
              <div>
                {moment(flight.t_st).format('LT')}
                <br />
                <span className="badge badge-info">Прибытие в {  moment(flight.t_prb).format('LT')}</span>
              </div>
            }

            {(!flight.t_prb || flight.t_prb === flight.t_st) &&
              <div>
                {  moment(flight.t_st).format('LT')}
              </div>
            }
          </div>
        }

      </td>
    </tr>
  );
}
