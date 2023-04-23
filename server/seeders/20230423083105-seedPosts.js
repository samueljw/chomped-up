'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      const data = [
        {
          "photo": "https://firebasestorage.googleapis.com/v0/b/chomped-up.appspot.com/o/restaurants%2Ftatsu.jpeg?alt=media&token=8dc2f180-ea0b-4244-9cae-270f8c1a0ee5", 
          "title": "TATSUU", 
          "caption": "enak pol",
          "UserId": 1,
          "RestoId": 5,
        },
        {
          "photo": "https://firebasestorage.googleapis.com/v0/b/chomped-up.appspot.com/o/restaurants%2Fhanbat.jpg?alt=media&token=13edece8-644b-4241-a68a-2e85e9f34f8b", 
          "title": "Hanbat Sul Lun Tang", 
          "caption": "enak pol",
          "UserId": 1,
          "RestoId": 4,
        },
        {
          "photo": "https://firebasestorage.googleapis.com/v0/b/chomped-up.appspot.com/o/restaurants%2Fdennys.png?alt=media&token=f6d759b7-62f8-47ca-a861-11f27c1b0275", 
          "title": "Denny’s", 
          "caption": "enak pol",
          "UserId": 1,
          "RestoId": 3,
        },
        {
          "photo": "https://firebasestorage.googleapis.com/v0/b/chomped-up.appspot.com/o/restaurants%2Fkazunori.jpeg?alt=media&token=8525d32c-7339-4814-a63f-406882872ed0", 
          "title": "KAZUUNORI", 
          "caption": "enak pol",
          "UserId": 1,
          "RestoId": 2,
        },
        {
          "photo": "https://firebasestorage.googleapis.com/v0/b/chomped-up.appspot.com/o/restaurants%2Ftatsu.jpeg?alt=media&token=8dc2f180-ea0b-4244-9cae-270f8c1a0ee5", 
          "title": "SUN NONG DANN", 
          "caption": "enak pol",
          "UserId": 1,
          "RestoId": 1,
        },
        {
          "photo": "https://firebasestorage.googleapis.com/v0/b/chomped-up.appspot.com/o/restaurants%2Fhanbat.jpg?alt=media&token=13edece8-644b-4241-a68a-2e85e9f34f8b", 
          "title": "Hanbat Sul Lun Tang", 
          "caption": "enak pol",
          "UserId": 5,
          "RestoId": 4,
        },
        {
          "photo": "https://firebasestorage.googleapis.com/v0/b/chomped-up.appspot.com/o/restaurants%2Fdennys.png?alt=media&token=f6d759b7-62f8-47ca-a861-11f27c1b0275", 
          "title": "Denny’s", 
          "caption": "enak pol",
          "UserId": 5,
          "RestoId": 3,
        },
        {
          "photo": "https://firebasestorage.googleapis.com/v0/b/chomped-up.appspot.com/o/restaurants%2Fkazunori.jpeg?alt=media&token=8525d32c-7339-4814-a63f-406882872ed0", 
          "title": "KAZUUNORI", 
          "caption": "enak pol",
          "UserId": 5,
          "RestoId": 2,
        },
      ]
            
      const result = []
      data.forEach(el => {
        result.push({
                      photo: el.photo,
                      title: el.title,
                      caption: el.caption,
                      UserId: el.UserId,
                      RestoId: el.RestoId,
                      createdAt: new Date(),
                      updatedAt: new Date(),
                    })
    })
      await queryInterface.bulkInsert('Posts', result, {})
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Posts', null, {})
  }
};