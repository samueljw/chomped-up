const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const { authentication } = require('../middlewares/authentication')
const errorHandler = require('../middlewares/errorHandler')


router.post('/login', Controller.login)
router.post('/register', Controller.registeration)

router.post('/makeFriends', authentication, Controller.makeFriends)
router.post('/changeStatus', authentication, Controller.changeFriendship)
router.post('/checkConnectivity', authentication, Controller.checkConnectivity)
router.post('/getFriendsPosts', authentication, Controller.getFriendsContent) // ini utk feed makanan ky ig
router.post('/postComment', authentication, Controller.postComment)
router.post('/getComment', authentication, Controller.getComment)
router.post('/getRecommendation', authentication, Controller.getRecommendation)
router.post('/getAllResto', authentication, Controller.getAllResto)
router.post('/getAllUsers', authentication, Controller.getAllUsers)
router.post('/getOneResto', authentication, Controller.getOneResto)
router.post('/getOneUser', authentication, Controller.getOneUser)
router.post('/postPosts', authentication, Controller.postPosts)
router.post('/ratingOfAResto', authentication, Controller.ratingOfAResto)
router.post('/postWishList', authentication, Controller.postWishList)
router.post('/postCraving', authentication, Controller.postCraving)
router.post('/getWishListByUser', authentication, Controller.getWishListByUser)
router.post('/getWishListByResto', authentication, Controller.getWishListByResto)
router.post('/getRestoAround', authentication, Controller.getRestoAround)
router.post('/getFriendsCraving', authentication, Controller.getFriendsCraving)
router.post('/getAllFriends', authentication, Controller.getAllFriends)
router.post('/getPersonalData', authentication, Controller.getPersonalData)

router.post('/googleSearch', authentication, Controller.googleSearch)


router.use(errorHandler)


module.exports = router