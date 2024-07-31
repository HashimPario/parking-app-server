const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')


router.post("/register",userCtrl.register)
router.post("/login",userCtrl.login)
router.post("/addArea",userCtrl.addArea)
router.post("/addPlace/:id",userCtrl.addPlace)

router.post("/userbooking",userCtrl.userBooking)

router.post("/addbooking",userCtrl.addBooking)

router.get("/getBookings/:userID",userCtrl.getBookings)

router.get("/getArea",userCtrl.getArea)
router.get("/getUsers",userCtrl.getUsers)

router.get("/getcurrentuser/:token",userCtrl.getCurrentUser)

router.get("/getPlace",userCtrl.getPlace)

router.post("/blockUser/:val",userCtrl.blockUser)

router.post("/updateprofile/:userId",userCtrl.updateProfile)


router.delete('/delete-place/:areaId/:placeId', userCtrl.deletePlace);
router.put('/update-place/:areaId/:placeId', userCtrl.updatePlace);

module.exports = router