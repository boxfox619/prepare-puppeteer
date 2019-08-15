import { search } from './google-search';
import { editSchedule } from './calendar';

search()
  .then(res => console.log('finish'))
  .catch(err => console.log(err));

editSchedule()
  .then(res => console.log('finish'))
  .catch(err => console.log(err));