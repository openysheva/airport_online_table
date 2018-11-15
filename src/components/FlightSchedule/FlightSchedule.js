import React from 'react';

import PropTypes from 'prop-types';

import CombinedFlight from '../CombinedFlight/CombinedFlight';
import SingleFlight from '../SingleFlight/SingleFlight';
import './FlightSchedule.css';

export default function FlightSchedule(props) {
  const { schedule, direction, isLoading } = props;

  return (
    <div className="container pl-2 pr-2 mb-3">
      <table className="table table-striped table-light">
        <thead>
          <tr>
            <th>Рейс</th>
            <th>Авиакомпания</th>
            <th>Город { direction === 'departure' ? 'назначения' : 'отправления'}</th>
            <th>Терминал</th>
            <th>Время { direction === 'departure' ? 'вылета' : 'прилета'}</th>
          </tr>

          {isLoading && (
              <tr>
                <td colSpan="5">
                  <div className="my-5" id="loader"></div>
                </td>
              </tr>
          )}
        </thead>
        {!isLoading && (
          <tbody>
            {
              schedule.map((flight) => (
                Array.isArray(flight) ?
                  <CombinedFlight key={ flight[0].i_id } flight={ flight } direction={ direction } /> :
                  <SingleFlight key={ flight.i_id } flight={ flight } direction={ direction } />
              ))
            }
          </tbody>
        )}
      </table>

      {/*!isLoading && (
        <div className="row">
          <button
            className="btn btn-outline-primary show-more-button"
            type="button"
            data-toggle="collapse"
            data-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Показать еще
          </button>
        </div>
      )*/}
    </div>
  );
}

FlightSchedule.propTypes = {
  schedule: PropTypes.array.isRequired,
  direction: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
}
