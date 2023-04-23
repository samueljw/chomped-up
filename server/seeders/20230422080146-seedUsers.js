'use strict';
const { bcryptHashSync } = require('../helpers/bcrypt')

module.exports = {
  async up (queryInterface, Sequelize) {
      const data = [
        {
          "username": "nolan",
          "profilePicture": "https://firebasestorage.googleapis.com/v0/b/chomped-up.appspot.com/o/profilepictures%2Fperson1.jpg?alt=media&token=e3149674-e17a-4880-86d0-c182c491f50d",
          "email": "nolan123@gmail.com",
          "password": "nolanreal",
          "bio": "Admin",
          "RestoId": 1
        },
        {
          "username": "justin",
          "profilePicture": "https://firebasestorage.googleapis.com/v0/b/chomped-up.appspot.com/o/profilepictures%2Fperson10.jpeg?alt=media&token=aed12107-afc9-418f-9fe1-4a0b5f204b30",
          "email": "justin123@gmail.com",
          "password": "justinreal",
          "bio": "Admin",
          "RestoId": 1
        },
        {
          "username": "johnson",
          "profilePicture": "https://firebasestorage.googleapis.com/v0/b/chomped-up.appspot.com/o/profilepictures%2Fperson11.jpeg?alt=media&token=07d6e14e-6701-4e7b-86f2-4d91124bd05d",
          "email": "johnson123@gmail.com",
          "password": "johnsonreal",
          "bio": "Staff",
          "RestoId": 1
        },
        {
          "username": "joko",
          "profilePicture": "https://firebasestorage.googleapis.com/v0/b/chomped-up.appspot.com/o/profilepictures%2Fperson12.jpeg?alt=media&token=f46fbd11-e2ed-487c-9721-970efd1446f7",
          "email": "joko123@gmail.com",
          "password": "jokoreal",
          "bio": "Customer",
          "RestoId": 1
        },
        {
          "username": "mattseb",
          "profilePicture": "https://firebasestorage.googleapis.com/v0/b/chomped-up.appspot.com/o/profilepictures%2Fperson13.jpg?alt=media&token=c00c2851-c7f9-4ecb-bacf-9675cd69483c",
          "email": "matt@gmail.com",
          "password": "jokoreal",
          "bio": "1234567890",
          "RestoId": 1
        },
        {
          "username": "jessay",
          "profilePicture": "https://firebasestorage.googleapis.com/v0/b/chomped-up.appspot.com/o/profilepictures%2Fperson9.jpg?alt=media&token=775e1f3f-f01b-4845-9528-38f6172b542d",
          "email": "jesse@gmail.com",
          "password": "jesse123",
          "bio": "kakakakakkakakakak",
          "RestoId": 1
        },
        {
          "username": "ernesto",
          "profilePicture": "https://firebasestorage.googleapis.com/v0/b/chomped-up.appspot.com/o/profilepictures%2Fperson7.jpeg?alt=media&token=fb47fd64-550d-4ab2-b4ff-4f21a9cf480e",
          "email": "ernest@gmail.com",
          "password": "ernestot",
          "bio": "ernest cakep",
          "RestoId": 1
        },
        {
          "username": "nataneil",
          "profilePicture": "https://firebasestorage.googleapis.com/v0/b/chomped-up.appspot.com/o/profilepictures%2Fperson3.jpg?alt=media&token=bed3cc29-cebb-471c-abda-7ec52b055774",
          "email": "nath@gmail.com",
          "password": "fluffehsheep",
          "bio": "so fluff",
          "RestoId": 1
        },
        {
          "username": "joanda",
          "profilePicture": "https://firebasestorage.googleapis.com/v0/b/chomped-up.appspot.com/o/profilepictures%2Fperson4.jpeg?alt=media&token=34388dfd-6153-4e97-8d1e-85d4c7dbfbfd",
          "email": "joandra@gmail.com",
          "password": "joandrajesse2002",
          "bio": "power couple",
          "RestoId": 1
        },
      ]
            
      const result = []
      data.forEach(el => {
        result.push({
                      username: el.username,
                      email: el.email,
                      profilePicture: el.profilePicture,
                      password: bcryptHashSync(el.password, 10),
                      bio: el.bio,
                      RestoId: el.RestoId,
                      createdAt: new Date(),
                      updatedAt: new Date(),
                    })
    })
      await queryInterface.bulkInsert('Users', result, {})
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('users', null, {})
  }
};
