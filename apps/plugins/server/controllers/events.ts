import PlatformEvent from '../models/event';
import {emitPlatformEvent} from '../services/hook-events';

const LIMIT = 50;

export async function getAllEvents(req, res) {
  const {page = 0} = req.query;
  const skip = Number(page * LIMIT);

  const event = await PlatformEvent
    .find({
      tenant: req.tenant,
    })
    .select('-metadata')
    .sort('-created')
    .skip(isNaN(skip) ? 0 : skip)
    .limit(LIMIT)
    .lean();
  res.json(event).end();
}

export async function getEvent(req, res) {
  const event = await PlatformEvent.findOne({
    tenant: req.tenant,
    _id: req.params.eventId
  }).lean()
  res.json(event).end();
}

export async function createEvent(req, res) {
  res.status(200).end();

  try {
    const event = new PlatformEvent(req.body);
    if (req.user.roles.includes('plugin')) {
      event.source = 'plugin:' + event.source;
    }
    await event.save();
    emitPlatformEvent(event);
  } catch {
    //
  }

}
