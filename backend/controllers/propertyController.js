import asyncHandler from 'express-async-handler';
import Property from '../models/propertyModel.js';
import Reservation from '../models/reservationModel.js';
import { isEqual } from 'lodash-es';

// @desc    Fetch all propertyies
// @route   GET /api/properties?offset=&limit=&search_term=&sortby=&sortdirection=
// @access  Public
export const getProperties = asyncHandler(async (req, res) => {
  let offset = parseInt(req.query.offset) - 1 || 0;
  let limit = parseInt(req.query.limit) || 5;
  let search = req.query.search_term || '';
  let sortby = req.query.sortby || '';
  let sortdirection = req.query.sortdirection === 'ASC' ? 1 : -1;

  let properties = [];

  properties = await Property.find({ name: { $regex: new RegExp('^' + search.toLowerCase(), 'i') } }, {})
    .skip(offset * limit)
    .limit(limit)
    .sort(req.query.sortdirection ? { [sortby]: sortdirection } : { $natural: -1 });

  const propertyCount = await Property.find(
    { name: { $regex: new RegExp('^' + search.toLowerCase(), 'i') } },
    {}
  ).countDocuments();

  res.json({ results: properties, totalCount: propertyCount });
});

// @desc    Fetch single property
// @route   GET /api/properties/:id
// @access  Public
export const getPropertyById = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);

  if (property) {
    res.send(property);
  } else {
    res.status(404);
    throw new Error('Property not found');
  }
});

// @desc    Fetch available rooms by property id and selected date
// @route   GET /api/properties/:id/availability?from_date=&to_date
// @access  Public
export const getPropertyAvailability = asyncHandler(async (req, res) => {
  let fromDate = new Date(req.query.from_date) || new Date();
  let toDate = new Date(req.query.to_date) || new Date();

  const property = await Property.findById(req.params.id);

  let reservations = [];

  if (isEqual(fromDate, toDate)) {
    reservations = await Reservation.find(
      {
        $or: [
          { from_date: { $eq: fromDate } },
          { to_date: { $eq: toDate } },
          { $and: [{ from_date: { $lt: fromDate } }, { to_date: { $gt: fromDate } }] }
        ],
        property: req.params.id
      },
      {}
    );
  } else {
    reservations = await Reservation.find(
      {
        $or: [{ from_date: { $gte: fromDate, $lte: toDate } }, { to_date: { $gte: fromDate, $lte: toDate } }],
        property: req.params.id
      },
      {}
    );
  }

  const bookedRooms = reservations.reduce(function (sum, reservation) {
    return sum + reservation.number_of_rooms;
  }, 0);

  // const toDate = new Date();
  // const fromDate = new Date(new Date().setDate(new Date().getDate() - 30));

  if (reservations && reservations.length !== 0) {
    res.json({ availableRooms: property.number_of_rooms - bookedRooms });
  } else {
    res.json({ availableRooms: property.number_of_rooms });
  }
});
