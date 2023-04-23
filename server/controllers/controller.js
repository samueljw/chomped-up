const { User, Restaurant, Post, Wishlist, Comment, Rating, Friendship } = require('../models')
const { bcryptCompareSync } = require('../helpers/bcrypt')
const { convertPayloadToToken } = require('../helpers/jwt')
const { Op } = require('sequelize')
const { createClient } = require('@google/maps');
const {processAndSearch} = require('../../server/tesGoogle')
class Controller {
    static async registeration (req, res, next) {
        try {
            const { username, email, password, bio } = req.body
            const createdUser = await User.create({
                username, email, password, bio
            })
            res.status(201).json({
                statusCode: 200,
                data: {
                    message: 'user has been created',
                    newUser: {
                        id: createdUser.id,
                        email: createdUser.email    
                    }
                }
            })
        } catch (err) {
            next(err)
        }
    }
    static async login (req, res, next) {
        try {
            const { username, password } = req.body
            console.log(username,password)
            if (!username) {
                throw { name: "User not found" }
            }
            const foundUser = await User.findOne({
                where: {
                    username: username
                }
            })
            if (!foundUser) {
                throw { name: "User not found" }
            }
            const passwordChecking = bcryptCompareSync(password, foundUser.password)
            if (!passwordChecking) {
                throw { name: "User not found" }
            }
            const payloadSend = {
                id: foundUser.id
            }

            const token = convertPayloadToToken(payloadSend)

            res.status(200).json({
                statusCode: 200,
                data: {
                    id: foundUser.id,
                    username: foundUser.username,
                    accessToken: token,
                }
            })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
    static async makeFriends(req, res, next) {
        try {
            let username = req.body.username;
            let findFriend = await User.findOne({
                where: {
                    username
                }
            })
            if (!findFriend) {
                throw {name: "UserNotExist"}
            }
            let findFriendShip1 = await Friendship.findOne({
                where: {
                    User1: req.user.id,
                    User2: findFriend.dataValues.id,
                }
            })
            let findFriendShip2 = await Friendship.findOne({
                where: {
                    User1: findFriend.dataValues.id,
                    User2: req.user.id,
                }
            })
            if (findFriendShip1 || findFriendShip2 || findFriend.dataValues.id === req.user.id) {
                throw{name:"userexistedalready"}
            } 

            let User1= findFriend.dataValues.id
            let User2 = req.user.id
            let friendshipCreation = await Friendship.create({
                User1,
                User2,
                status: "pending"
            })
            res.status(200).json({
                statusCode:200,
                text:"success",
                data: friendshipCreation
            })
        } catch (err) {
            console.log(err)
            next (err)
        }
    }
    static async changeFriendship (req, res, next) {
        try {
            let username = req.body.username;
            let findFriend = await User.findOne({
                where: {
                    username
                }
            })
            if (!findFriend) {
                throw {name: "UserNotExist"}
            }
            let findFriendShip = await Friendship.findOne({
                where: {
                    User1: req.user.id,
                    User2: findFriend.dataValues.id,
                }
            })
            if (!findFriendShip) {
                findFriendShip = await Friendship.findOne({
                    where: {
                        User1: findFriend.dataValues.id,
                        User2: req.user.id,
                    }
                })
                if (!findFriendShip) {
                    throw{name: "not makefriends yet"}
                }    
            } 
            let newFriendShip = await Friendship.update({
                    status: "Accepted"
                }, {
                    where: {
                        id: findFriendShip.dataValues.id
                    }
                })    
            res.status(200).json({
                statusCode: 200,
                text:"success",
                data: newFriendShip
            })

        } catch (err) {
            next (err)
        }
    }
    static async checkConnectivity (req, res, next) {
        try {
            let username = req.body.username;
            let currentStatus;
            let findFriend = await User.findOne({
                where: {
                    username
                }
            })
            if (!findFriend) {
                throw {name: "usernotfound"}
            }
            let findFriendShip = await Friendship.findOne({
                where: {
                    User1: req.user.id,
                    User2: findFriend.dataValues.id,
                }
            })
            if (!findFriendShip) {
                findFriendShip = await Friendship.findOne({
                    where: {
                        User1: findFriend.dataValues.id,
                        User2: req.user.id,
                    }
                })
                if (!findFriendShip) {
                    currentStatus = "notFriendsYet"
                }    
            }
            if (!currentStatus) {
                currentStatus = findFriendShip.dataValues.status
            }
            res.status(200).json({
                statusCode: 200,
                friendship: currentStatus
            })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
    static async getAllResto (req, res, next) {
        try {
            let getRestos = await Restaurant.findAll()
            res.status(200).json({
                statusCode: 200,
                data: getRestos
            })
        } catch (err) {
            next (err)
        }
    }
    static async getFriendsContent (req, res, next) {
        try {
            let arrayoffriends = []
            let friends = await Friendship.findAll({
                where: {
                    User1: req.user.id
                }
            })
            for (let x = 0; x < friends.length; x++) {
                arrayoffriends.push(friends[x].User2)
            }
            let friendstoo = await Friendship.findAll({
                where: {
                    User2: req.user.id
                }
            })
            for (let x = 0; x < friendstoo.length; x++) {
                arrayoffriends.push(friendstoo[x].User1)
            }
            let AllPosts = await Post.findAll({
                where: {
                    UserId: arrayoffriends
                }, include: [User,Restaurant]
            })
            for(let x = 0;x < AllPosts.length;x++) {
                let RestoId = AllPosts[x].RestoId
                let ratings = await Rating.findAll( {
                    where: {
                        RestoId
                    }
                })  
            }
            res.status(200).json({
                statusCode: 200,
                data: AllPosts
            })
        } catch (err) {
            console.log(err)
            next (err)
        }
    }
    static async getFriendsCraving(req, res, next) {
        try {
            let arrayoffriends = []
            let friends = await Friendship.findAll({
                where: {
                    User1: req.user.id
                }
            })
            for (let x = 0; x < friends.length; x++) {
                arrayoffriends.push(friends[x].User2)
            }
            let friendstoo = await Friendship.findAll({
                where: {
                    User2: req.user.id
                }
            })
            for (let x = 0; x < friendstoo.length; x++) {
                arrayoffriends.push(friendstoo[x].User1)
            }
            let alluser = await User.findAll({
                where: {
                    id: arrayoffriends
                }, include: [Restaurant]
            })
            res.status(200).json({
                statusCode: 200,
                data: alluser
            })
        } catch (err) {
            console.log(err)
            next (err)
        }
        
    }
    static async postPosts (req, res, next) {
        try {
            let photo = req.body.photo;
            let title = req.body.title;
            let caption = req.body.caption;
            let RestoId = req.body.RestoId
            let rating = req.body.rating;
            if (!photo || !caption || !RestoId || !rating) {
                throw{name: "eror data ga lengkap"}
            }
            let post = await Post.create({
                photo, title, caption, UserId: req.user.id, RestoId
            })
            let ratingCreation = await Rating.create({
                rating, UserId: req.user.id, RestoId
            })
            res.status(200).json({
                statusCode: 200,
                data: post
            })
        } catch (err) {
            console.log(err)
            next (err)
        }
    }
    static async postComment (req, res, next) {
        try {
            let PostId = req.body.PostId
            let comment = req.body.comment;
            let createComment = await Comment.create({
                UserId: req.user.id, PostId, comment
            })
            res.status(200).json({
                statusCode: 200,
                data: createComment
            })
        } catch (err) {
            console.log(err)
            next (err)
        }
    }
    static async getComment (req, res, next) {
        try {
            let PostId = req.body.PostId
            let createComment = await Comment.findAll({
                where:{
                    PostId
                } 
            })
            res.status(200).json({
                statusCode: 200,
                data: createComment
            })
        } catch (err) {
            next (err)
        }
    }
    static async ratingOfAResto (req, res, next) {
        try {
            let RestoId = req.body.RestoId
            let ratings = await Rating.findAll( {
                where: {
                    RestoId
                }, include: [User]
            })
            let average =0;
            let count = 0;
            for (let x = 0; x < ratings.length; x++) {
                average += ratings[x].rating
                count++
            }
            let finalrating = average/count
            res.status(200).json({
                statusCode: 200,
                data: ratings,
                rating: finalrating
            })
        } catch (err) {
            next(err)
        }
    }
    static async getAllUsers (req, res, next) {
        try {
            let allUsers = await User.findAll();
            res.status(200).json({
                statusCode: 200,
                data: allUsers
            })
        } catch (err) {
            next (err)
        }
    }
    static async getOneResto (req, res, next) {
        try {
            let RestoId = req.body.RestoId;
            let oneResto = await Restaurant.findOne({
                where: {
                    id: RestoId
                }
            })
            if (!oneResto) {
                throw{name:"doesnt exist"}
            }
            let ratings = await Rating.findAll( {
                where: {
                    RestoId
                }, include: [User]
            })
            res.status(200).json({
                statusCode: 200,
                data: oneResto,
                ratings
            })
        } catch (err) {
            console.log(err)
            next (err)
        }
    }
    static async getOneUser (req, res, next) {
        try {
            let UserId = req.body.UserId;
            let oneUser = await User.findOne({
                where: {
                    id: UserId
                }, include: [Restaurant]
            })
            if (!oneUser) {
                throw{name:"doesnt exist"}
            }
            let allWishlist = await Wishlist.findAll({
                where: {
                    UserId
                }, include: [Restaurant]
            })
            let allPosts = await Post.findAll({
                where: {
                    UserId
                }
            })
            res.status(200).json({
                statusCode: 200,
                data: oneUser,
                wishlist: allWishlist,
                pastPost: allPosts
            })

        } catch (err) {
            next (err)
        }
    }
    static async postCraving (req, res, next) {
        try {
            let RestoId = req.body.RestoId
            let postingCraving = await User.update({
                RestoId
            }, {
                where: {
                    id: req.user.id
                }
            })
            res.status(200).json({
                statusCode: 200,
                data: postingCraving
            })
        } catch (err) {
            next(err)
        }
    }
    static async postWishList (req, res, next) {
        try {
            let UserId = req.user.id;
            let RestoId = req.body.RestoId;
            if (!RestoId) {
                throw{name:"gaadarestonya bos"}
            }
            let wishlistCreation = await Wishlist.create({
                UserId, RestoId
            })
            res.status(200).json({
                statusCode: 200,
                data: wishlistCreation
            })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
    static async getWishListByUser (req, res, next) {
        try {
            let UserId = req.body.UserId;
            if (!UserId) {
                throw{name:"gaada"}
            }
            let allWishlist = await Wishlist.findAll({
                where: {
                    UserId
                }, include: [Restaurant]
            })
            res.status(200).json({
                statusCode: 200,
                data: allWishlist
            })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
    static async getWishListByResto (req, res, next) {
        try {
            let RestoId = req.body.RestoId;
            if (!RestoId) {
                throw{name:"gaada"}
            }
            let allWishlist = await Wishlist.findAll({
                where: {
                    RestoId
                }, include: [User]
            })
            res.status(200).json({
                statusCode: 200,
                data: allWishlist
            })
        } catch (err) {
            next(err)
        }
    }
    static async getRecommendation (req, res, next) {
        try {
            let userEaten = await Rating.findAll({
                where: {
                    UserId: req.user.id
                }
            })
            let resultRating = await Rating.findAll({
                where: {
                    UserId: {
                      [Op.ne]: req.user.id
                    }
                  }, include: [Restaurant]
            })
            // let arr = [];
            // for (let x = 0; x < resultRating.length; x++) {
            //     for (let y = 0; y < userEaten.length; y++) {
            //         if (userEaten[y].RestoId === resultRating[x].RestoId) {
            //             if (Math.abs(userEaten[y].rating - resultRating[x].rating) < 2) {
            //                 const foundElement = arr.find(element => element.User === resultRating[x].UserId);
            //                 if (foundElement) {
            //                     foundElement.compatibility +=5;
            //                 } else {
            //                     arr.push({User: resultRating[x].UserId, compatibility: 5})
            //                 }
            //             }
            //         }
            //     }
            // }
            if (resultRating.length < 5) {
                res.status(400).json({
                    statusCode: 200,
                    data: "NO recommendation"
                })
            } else {
                resultRating.sort((b,a) => a.rating - b.rating).slice(0,5)
                res.status(200).json({
                    statusCode: 200,
                    data: resultRating
                })    
            }
        } catch (err) {
            console.log(err)
            next (err)
        }
    }
    static async getRestoAround (req, res, next) {
        try {
            const googleMapsClient = createClient({
                key: 'key',
                Promise: Promise
              });
            // const latitude = 54.248190;
            // const longitude = -111.153840;   
            const latitude = req.body.latitude;
            const longitude = req.body.longitude; 
            console.log(latitude, longitude)
            let response = await googleMapsClient.placesNearby({
                location: [latitude, longitude],
                radius: 1500,
                type: 'restaurant'
              }).asPromise();

              const restaurants = response.json.results;
              let newArr =[]
              for (const restaurant of restaurants) {
                // Check if the restaurant has a photo
                if (restaurant.photos && restaurant.photos.length > 0) {
                  const photoReference = restaurant.photos[0].photo_reference;
                  const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${key}`;
                    newArr.push({"Restaurant": restaurant.name, "Photo-URL": photoUrl})
                } else {
                    newArr.push({"Restaurant": restaurant.name, "Photo-URL": "NO PHOTO"})
                }
              }
              console.log(newArr)      
            res.status(200).json({
                statusCode: 200,
                data: newArr
            })
        } catch (err) {
            console.log(err)
            next (err)
        }
    }
    static async getAllFriends (req, res, next) {
        try {
            let arrayoffriends = []
            let friends = await Friendship.findAll({
                where: {
                    User1: req.user.id
                }
            })
            for (let x = 0; x < friends.length; x++) {
                arrayoffriends.push(friends[x].User2)
            }
            let friendstoo = await Friendship.findAll({
                where: {
                    User2: req.user.id
                }
            })
            for (let x = 0; x < friendstoo.length; x++) {
                arrayoffriends.push(friendstoo[x].User1)
            }
            let AllPosts = await User.findAll({
                where: {
                    id: arrayoffriends
                }
            })
            res.status(200).send({
                statusCode: 200,
                data: AllPosts
            })

        } catch (err) {
            next (err)
        }
    }
    static async getPersonalData (req, res, next) {
        try {
            let UserId = req.user.id;
            let oneUser = await User.findOne({
                where: {
                    id: UserId
                }, include: [ Restaurant]
            })
            if (!oneUser) {
                throw{name:"doesnt exist"}
            }
            let allWishlist = await Wishlist.findAll({
                where: {
                    UserId
                }, include: [Restaurant]
            })
            let allPosts = await Post.findAll({
                where: {
                    UserId
                }
            })
            allPosts.sort((b,a) => a.id - b.id)

            res.status(200).json({
                statusCode: 200,
                data: oneUser,
                wishlist: allWishlist,
                pastPost: allPosts
            })

        } catch (err) {
            next (err)
        }
    }
    static async googleSearch (req, res, next) {
        try {
            let query = req.body.query
            let xx = "no results";

            if (query === '') {
                
            } else {
                while(xx === "no results") {
                    xx = await processAndSearch(query);
                }    
            }
            res.status(200).json({
                statusCode: 200,
                data: xx
            })
        } catch(err) {
            next(err)
        }
    }
}

module.exports = Controller