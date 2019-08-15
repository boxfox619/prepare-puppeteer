import { search } from './google-search';
import { editSchedule } from './calendar';

search('박스여우')
  .then(res => console.log(res))
  .catch(err => console.log(err));

editSchedule()
  .then(res => console.log('finish'))
  .catch(err => console.log(err));