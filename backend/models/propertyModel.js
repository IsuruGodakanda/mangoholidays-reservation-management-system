import mongoose from 'mongoose';

// Location Schema
const locationSchema = mongoose.Schema({
  addr_line_1: { type: String, required: true },
  addr_line_2: { type: String },
  city: { type: String, required: true },
  postal_code: { type: String, required: true },
  country: { type: String, required: true },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Property'
  }
});

// Amenity Schema
const amenitySchema = mongoose.Schema({
  has_sea_view: { type: Boolean, required: true },
  has_lake_view: { type: Boolean },
  has_mountain_view: { type: Boolean, required: true },
  has_bathtub: { type: Boolean, required: true },
  has_balcony: { type: Boolean, required: true },
  floor_area: { type: Number, required: true },
  has_wifi: { type: Boolean, required: true },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Property'
  }
});

// Property Schema
const propertySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    number_of_rooms: {
      type: Number,
      required: true,
      default: 0
    },
    location: locationSchema,
    amenity: amenitySchema
  },
  {
    timestamps: true
  }
);

const Property = mongoose.model('Property', propertySchema);

export default Property;
