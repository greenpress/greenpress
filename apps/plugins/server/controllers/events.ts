import PlatformEvent from '../models/event';

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
  res.status(200).json({}).end()

  const event = new PlatformEvent(req.data);
  await event.save();
}
