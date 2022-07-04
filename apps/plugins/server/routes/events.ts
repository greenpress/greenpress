import {getRouter, verifyUser, populateUser} from '@greenpress/api-kit';
import onlyPrivileged from '../middlewares/privileged-check';
import {createEvent, getAllEvents, getEvent} from '../controllers/events';

const router = getRouter();

const AUTHENTICATION_MIDDLEWARES = [populateUser, verifyUser, onlyPrivileged]

router
  .route('/api/events')
  .use(AUTHENTICATION_MIDDLEWARES)
  .get(getAllEvents)
  .post(createEvent);

router
  .route('/api/events/:eventId')
  .use(AUTHENTICATION_MIDDLEWARES)
  .get(getEvent);

export default router;
