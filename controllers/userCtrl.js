const Users = require('../models/userModel')
const Bookings = require('../models/bookingModel')
const Areas = require('../models/areaModel')
const Places = require('../models/placeModel')
const req = require('express/lib/request')
const bcrypt = require('bcrypt')

const userCtrl = {
    register: async (req, res) => {
        try {
            const { name, email, password, isBlocked } = req.body;

            const user = await Users.findOne({ email });
            if (user) return res.status(400).json({ message: "This email already exists" });

            const passwordHash = await bcrypt.hash(password, 12);
            const addUser = new Users({
                name, email, password: passwordHash, isBlocked, role: "user"
            });
            await addUser.save();
            return res.json({ message: "Registered Successfully" });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await Users.findOne({ email });

            if (!user) return res.status(400).json({ message: "Email does not exist" });

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) return res.status(400).json({ message: "Password is incorrect" });

            if (user.isBlocked === "true") return res.status(400).json({ message: "User is blocked" });

            return res.json({ message: "Login successful", user });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    addArea: async (req, res) => {
        try {
            const { areaName, areaQty, slotQty } = req.body

            const area = await Areas.findOne({ areaName })
            if (area) return res.status(400).json({ message: "This area already exist" })

            const addArea = new Areas({
                areaName, areaQty, slotQty
            })
            await addArea.save();

            return res.json({ message: "Area Added" })

        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },


    addPlace: async (req, res) => {
        try {
            const { areaId, totalSlots, placeData, slotsData } = req.body;


            if (!Array.isArray(placeData) || !Array.isArray(slotsData)) {
                throw new Error('Invalid data format');
            }

            const area = await Places.findOne({ areaId });

            if (area) {

                area.placeData.push(...placeData);
                area.totalSlots = parseInt(area.totalSlots) + parseInt(totalSlots);


                await Areas.findByIdAndUpdate(areaId, {
                    areaQty: area.placeData.length,
                    slotQty: area.totalSlots
                });


                await area.save();
                return res.json({ message: 'Place added successfully', area });
            } else {

                await Areas.findByIdAndUpdate(areaId, {
                    areaQty: 1,
                    slotQty: totalSlots
                });

                const addPlace = new Places({
                    areaId,
                    totalSlots,
                    placeData,
                    slotsData
                });

                await addPlace.save();
                return res.json({ message: 'Place created and added successfully', addPlace });
            }
        } catch (err) {
            // console.error(err); 
            return res.status(500).json({ message: err.message });
        }
    },

    userBooking: async (req, res) => {
        try {
            const { userId, bookingData } = req.body;
            if (!userId || !Array.isArray(bookingData)) {
                return res.status(400).json({ message: 'Invalid request data' });
            }

            const user = await Users.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }


            user.booking.push(...bookingData);
            await user.save();


            for (const booking of bookingData) {
                const { placeName, slotNumber, bookingDate, bookingFrom, bookingTo } = booking;

                await Places.updateOne(
                    {
                        'placeData.placeName': placeName,
                        'placeData.slotsData.slotNumber': slotNumber
                    },
                    {
                        $set: {
                            'placeData.$[outer].slotsData.$[inner].bookingDate': bookingDate,
                            'placeData.$[outer].slotsData.$[inner].bookFrom': bookingFrom,
                            'placeData.$[outer].slotsData.$[inner].bookTo': bookingTo
                        }
                    },
                    {
                        arrayFilters: [
                            { 'outer.placeName': placeName },
                            { 'inner.slotNumber': slotNumber }
                        ],
                        new: true
                    }
                );
            }

            return res.json({ message: 'Booking saved successfully!' });
        } catch (error) {
            // console.error('Error in userBooking:', error);
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
        // try {
        //     const { userId, bookingData } = req.body;
        //     if (!userId || !Array.isArray(bookingData)) {
        //         return res.status(400).json({ message: 'Invalid request data' });
        //     }

        //     let _id = userId;

        //     const user = await Users.findOne({ _id });
        //     if (user) {
        //         user.booking.push(...bookingData);

        //         await user.save();
        //         return res.json({ message: 'Booking saved successfully!' });

        //     } else {
        //         return res.status(404).json({ message: 'User not found' });
        //     }
        // } catch (error) {
        //     console.error('Error in userBooking:', error);
        //     return res.status(500).json({ message: 'Internal server error', error: error.message });
        // }h76g tg76nhgyu7hujmi9
    },


    addBooking: async (req, res) => {
        try {
            const { userId, bookingData } = req.body;
            //let _id = userId;

            const addBooking = new Bookings({
                userId, bookingData
            })

            await addBooking.save();
            return res.json({ msg: addBooking })

        } catch (error) {
            // console.error('Error saving user booking:', error);
            return res.status(500).json({ msg: 'Internal server error', error: error.message });
        }

    },

    getArea: async (req, res) => {
        try {
            const allAreas = await Areas.find();
            res.json(allAreas);
        } catch (error) {
            //   console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getPlace: async (req, res) => {
        try {
            const allPlaces = await Places.find();
            res.json(allPlaces);
        } catch (error) {
            //   console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getUsers: async (req, res) => {
        try {
            const allUsers = await Users.find();
            res.json(allUsers);
        } catch (error) {
            // console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getBookings: async (req, res) => {
        try {
            const { userID } = req.params;
            const currentUser = await Users.findById(userID);
            if (!currentUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.json(currentUser.booking);
        } catch (error) {
            //   console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getCurrentUser: async (req, res) => {
        try {
            const { token } = req.params
            const currentUser = await Users.findById(token);
            return res.json(currentUser);
        } catch (error) {
            //  console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    blockUser: async (req, res) => {
        // const { isBlocked } = req.body
        // const { val } = req.params
        // return res.json(isBlocked)
        try {
            const { blockStatus } = req.body
            const { val } = req.params
            await Users.findByIdAndUpdate(val, {
                isBlocked: blockStatus
            })
            return res.json({ msg: "updated" })
        } catch (error) {
            return res.status(500).json({ msg: err.message })
        }
    },

    updateProfile: async (req, res) => {
        try {
            const { name, oldPassword, newPassword } = req.body
            const { userId } = req.params
            const user = await Users.findById(userId);
            const isMatch = await bcrypt.compare(oldPassword, user.password)
            if (!isMatch) return res.status(400).json({ message: "Old Password is incorrect" })
            const passwordHash = await bcrypt.hash(newPassword, 12)
            await Users.findByIdAndUpdate(userId, {
                name, password: passwordHash
            })
            return res.json({ message: "Password Updated" })

        } catch (error) {
            return res.status(500).json({ message: err.message });
        }
    },
    
    deletePlace: async (req, res) => {
        const { areaId, placeId } = req.params;
    
        try {
            const place = await Places.findOneAndUpdate(
                { areaId },
                {
                    $pull: { placeData: { _id: placeId } }
                },
                { new: true }
            );
    
            if (!place) {
                return res.status(404).json({ message: 'Place not found' });
            }
    
            res.status(200).json({ message: 'Place Deleted' });
         
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    },  
    
    updatePlace: async (req, res) => {
        const { areaId, placeId } = req.params;
    const { placeName, slotsQuantity } = req.body;

    try {
      
        const place = await Places.findOneAndUpdate(
            { areaId, 'placeData._id': placeId },
            {
                $set: {
                    'placeData.$.placeName': placeName,
                    'placeData.$.slotsQuantity': slotsQuantity
                }
            },
            { new: true }
        );

        if (!place) {
            return res.status(404).json({ message: 'Place not found' });
        }

      
        const placeIndex = place.placeData.findIndex(p => p._id.toString() === placeId);
        if (placeIndex !== -1) {
            const currentSlotsData = place.placeData[placeIndex].slotsData;
            const newSlotsData = [];

            for (let i = 0; i < slotsQuantity; i++) {
                if (i < currentSlotsData.length) {
                 
                    newSlotsData.push(currentSlotsData[i]);
                } else {
                
                    newSlotsData.push({ slotNumber: i + 1 });
                }
            }

            
            place.placeData[placeIndex].slotsData = newSlotsData;
            await place.save();
        }

        res.status(200).json({ message: 'Updated Successfully' });
    } catch (error) {
        console.error('Server error:', error); 
        res.status(500).json({ message: 'Server error', error });
    }
    }
}
module.exports = userCtrl