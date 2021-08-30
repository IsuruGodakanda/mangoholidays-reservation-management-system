import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import properties from './data/properties.js';
import locations from './data/locations.js';
import amenities from './data/amenities.js';
import roomBoards from './data/roomBoards.js';
import roomSizes from './data/roomSizes.js';
import Property from './models/propertyModel.js';
import RoomBoard from './models/roomBoardModel.js';
import RoomSize from './models/roomSizeModel.js';
import RoomRate from './models/roomRateModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Property.deleteMany();
    await RoomBoard.deleteMany();
    await RoomSize.deleteMany();
    await RoomRate.deleteMany();

    // Add Properties

    await Property.insertMany(properties);

    // Add Locations and Amenities

    const propertyList = await Property.find();

    const propertyItem0 = await Property.findById(propertyList[0]._id);

    propertyItem0.location = await { property: propertyList[0]._id, ...locations[0] };
    propertyItem0.amenity = await { property: propertyList[0]._id, ...amenities[0] };
    await propertyItem0.save();

    const propertyItem1 = await Property.findById(propertyList[1]._id);

    propertyItem1.location = await { property: propertyList[1]._id, ...locations[1] };
    propertyItem1.amenity = await { property: propertyList[1]._id, ...amenities[1] };
    await propertyItem1.save();

    const propertyItem2 = await Property.findById(propertyList[2]._id);

    propertyItem2.location = await { property: propertyList[2]._id, ...locations[2] };
    propertyItem2.amenity = await { property: propertyList[2]._id, ...amenities[2] };
    await propertyItem2.save();

    // Add Room Board

    await RoomBoard.insertMany(roomBoards);

    // Add Room Sizes

    await RoomSize.insertMany(roomSizes);

    // Add Room Rates

    const roomRateList = [];

    const roomBoardList = await RoomBoard.find();
    const roomSizeList = await RoomSize.find();

    await roomBoardList.map((rbItem) => {
      roomSizeList.map((rsItem) => {
        roomRateList.push({ room_board_type: rbItem._id, room_size_type: rsItem._id });
      });
    });

    const rates = [15, 22, 27, 24, 34, 39, 30, 38, 45];

    await rates.map((rate, index) => {
      roomRateList[index].rate = rate;
    });

    await RoomRate.insertMany(roomRateList);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Property.deleteMany();
    await RoomBoard.deleteMany();
    await RoomSize.deleteMany();
    await RoomRate.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
