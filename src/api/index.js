import axios from 'axios';
import moment from 'moment';


export function getTimeTable(filters) {
    return axios.get('https://www.svo.aero/bitrix/timetable/', {
      params: {
        ...filters,
        dateStart: moment().startOf('day').format(),
        dateEnd: moment().add(1, 'days').startOf('day').format(),
        perPage: 9999,
        page: 0,
        locale: 'ru',
      }
    });
}
