import React, { Component } from 'react';
import _ from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

import FlightFilters from './components/FlightFilters/FlightFilters';
import FlightSchedule from './components/FlightSchedule/FlightSchedule';
import { getTimeTable } from './api';
import getDelayedFlights from './helpers/getDelayedFlights';
import groupCombinedFlights from './helpers/groupCombinedFlights';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: {
        direction: 'departure',
        search: '',
        isDelayed: false,
      },
      schedule: [],
      isLoading: false,
    }

    this.changeFlightDirection = this.changeFlightDirection.bind(this);
    this.changeFlightNumber = this.changeFlightNumber.bind(this);
    this.showDelayedFlights = this.showDelayedFlights.bind(this);
  }

  componentDidMount() {
    this.changeSchedule();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevState.filters, this.state.filters)) {
      this.changeSchedule();
    }
  }

  changeFlightDirection(event) {
    const eventTargetValue =  event.target.value;

    this.setState((prevState) => ({
      filters: {
        ...prevState.filters,
        direction: eventTargetValue,
      }
    }));
  }

  changeSchedule() {
    this.setState({
      isLoading: true,
    });

    getTimeTable(this.state.filters).then((res) => {
      let schedule = res.data.items;

      if (this.state.filters.isDelayed) {
        schedule = getDelayedFlights(schedule, this.state.filters.direction);
      }

      schedule = groupCombinedFlights(schedule, this.state.filters.direction);

      this.setState({
        schedule: schedule,
        isLoading: false
      });
    });
  }

  changeFlightNumber(event) {
    const eventTargetValue =  event.target.value;

    this.setState((prevState) => ({
      filters: {
        ...prevState.filters,
        search: eventTargetValue,
      }
    }));
  }

  showDelayedFlights(event) {
    const eventTargetChecked =  event.target.checked;

    this.setState((prevState) => ({
      filters: {
        ...prevState.filters,
        isDelayed: eventTargetChecked,
      }
    }));
  }

  render() {
    const {filters, schedule, isLoading} = this.state;

    return (
      <div className="App">
        <FlightFilters
          changeFlightDirection={ this.changeFlightDirection }
          changeFlightNumber={ this.changeFlightNumber }
          showDelayedFlights={ this.showDelayedFlights }
          filters={ filters }
        />
        <FlightSchedule
          schedule={ schedule }
          direction={ filters.direction }
          isLoading={ isLoading }
        />
      </div>
    );
  }
}

export default App;
