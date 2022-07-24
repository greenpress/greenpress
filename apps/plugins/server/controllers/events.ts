import PlatformEvent from '../models/event';
import {emitPlatformEvent} from '../services/hook-events';

export async function getAllEvents(req, res) {
  const event = await PlatformEvent.find({
    tenant: req.tenant,
  }).select('-metadata').lean();
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
    await event.save();
    emitPlatformEvent(event);
  } catch {
    //
  }

}
