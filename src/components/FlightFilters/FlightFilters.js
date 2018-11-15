import React from 'react';
import PropTypes from 'prop-types';

import './FlightFilters.css';

export default function FlightFilters(props) {
    const {
      changeFlightDirection,
      changeFlightNumber,
      showDelayedFlights,
      filters
    } = props;

    return (
      <div className="container pl-2 pr-2">

        <nav className="navbar navbar-expand-lg navbar-light bg-light">

          <div className="col-sm-9">
            <button
              onClick = { changeFlightDirection }
              value="departure"
              className = { filters.direction === 'departure' ? 'btn btn-outline-primary' : 'btn btn-light' }
            >
              Вылет
            </button>

            <button
              onClick = { changeFlightDirection }
              value="arrival"
              className = { filters.direction === 'arrival' ? 'btn btn-outline-primary mx-1' : 'btn btn-light mx-1' }
            >
              Прилет
            </button>
          </div>

          <div className="input-group col-sm-3">
            <div className="input-group-prepend">
              <span className="input-group-text fa fa-search"></span>
            </div>
            <input
              className="form-control"
              type="text"
              placeholder="введите номер рейса"
              aria-label="Search"
              onChange = { changeFlightNumber }
              value = { filters.search }
            />
          </div>
        </nav>

        <div className="alert-secondary">
          <input
            type="checkbox"
            className="form-check-input ml-5"
            checked = { filters.isDelayed }
            onChange= { showDelayedFlights }
            id="delayed-flights"
          />
          <label className="form-check-label ml-5 pl-4" htmlFor="delayed-flights">
            <small>Показать отложенные рейсы</small>
          </label>
        </div>

      </div>
    );
}

FlightFilters.propTypes = {
  changeFlightDirection: PropTypes.func.isRequired,
  changeFlightNumber: PropTypes.func.isRequired,
  showDelayedFlights: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
}
