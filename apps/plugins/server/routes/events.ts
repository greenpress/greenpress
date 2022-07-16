import {getRouter, verifyUser, populateUser} from '@greenpress/api-kit';
import onlyPrivileged from '../middlewares/privileged-check';
import {createEvent, getAllEvents, getEvent} from '../controllers/events';

const eventsRouter = getRouter();

const AUTHENTICATION_MIDDLEWARES = [populateUser, verifyUser, onlyPrivileged]

eventsRouter
  .route('/api/events')
  .use(AUTHENTICATION_MIDDLEWARES)
  .get(getAllEvents)
  .post(createEvent);

eventsRouter.post('/internal-api/events', createEvent);

eventsRouter
  .route('/api/events/:eventId')
  .use(AUTHENTICATION_MIDDLEWARES)
  .get(getEvent);

export default eventsRouter;
