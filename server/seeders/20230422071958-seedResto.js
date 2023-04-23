'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      const data = [
        {
          "photo": "https://firebasestorage.googleapis.com/v0/b/chomped-up.appspot.com/o/restaurants%2Fsunnongdan.jpg?alt=media&token=76a9d41b-6e46-41a5-bdf0-1ab8eb9114a2", 
          "title": "Sun Nong Dan", 
          "timeOfOperation": "9-10",
          "location": "Korea Town", 
          "price": "mediocre"
        },
        {
          "photo": "https://firebasestorage.googleapis.com/v0/b/chomped-up.appspot.com/o/restaurants%2Fkazunori.jpeg?alt=media&token=8525d32c-7339-4814-a63f-406882872ed0", 
          "title": "Kazunori", 
          "timeOfOperation": "10-8",
          "location": "Westwood", 
          "price": "expensive"
        },
        {
          "photo": "https://firebasestorage.googleapis.com/v0/b/chomped-up.appspot.com/o/restaurants%2Fdennys.png?alt=media&token=f6d759b7-62f8-47ca-a861-11f27c1b0275", 
          "title": "Denny’s", 
          "timeOfOperation": "12-12",
          "location": "Westwood", 
          "price": "cheap"
        },
        {
          "photo": "https://firebasestorage.googleapis.com/v0/b/chomped-up.appspot.com/o/restaurants%2Fhanbat.jpg?alt=media&token=13edece8-644b-4241-a68a-2e85e9f34f8b", 
          "title": "Hanbat Sul Lun Tang", 
          "timeOfOperation": "9-9",
          "location": "Korea Town", 
          "price": "cheap"
        },
        {
          "photo": "https://firebasestorage.googleapis.com/v0/b/chomped-up.appspot.com/o/restaurants%2Ftatsu.jpeg?alt=media&token=8dc2f180-ea0b-4244-9cae-270f8c1a0ee5", 
          "title": "Tatsu Ramen", 
          "timeOfOperation": "9-2",
          "location": "Sawtelle", 
          "price": "mediocre"
        },
        {
          "photo": "https://firebasestorage.googleapis.com/v0/b/chomped-up.appspot.com/o/restaurants%2FBCD.webp?alt=media&token=50d1b592-eab5-4d99-81be-1351ef616aa0", 
          "title": "BCD Tofu House", 
          "timeOfOperation": "10-12",
          "location": "Korea Town", 
          "price": "mediocre"
        },
        {
          "photo": "https://firebasestorage.googleapis.com/v0/b/chomped-up.appspot.com/o/restaurants%2Fraisingcanes.webp?alt=media&token=0abbb8bc-9f95-458f-b96f-f5aa93a24d80", 
          "title": "Raising Cane’s", 
          "timeOfOperation": "12-12",
          "location": "Torrance", 
          "price": "cheap"
        },
        {
          "photo": "https://firebasestorage.googleapis.com/v0/b/chomped-up.appspot.com/o/restaurants%2Fgogobop.jpeg?alt=media&token=f5e954aa-9513-47c6-8db1-7765d2e8204b", 
          "title": "Gogobop", 
          "timeOfOperation": "10-9",
          "location": "Westwood", 
          "price": "mediocre"
        },
        {
          "photo": "https://firebasestorage.googleapis.com/v0/b/chomped-up.appspot.com/o/restaurants%2Fjinsol.jpeg?alt=media&token=53ffece8-169d-4e6a-8735-f05cab299a8a", 
          "title": "Jinsol Gukbap", 
          "timeOfOperation": "11-10",
          "location": "Korea Town", 
          "price": "mediocre"
        },
        {
          "photo": "https://firebasestorage.googleapis.com/v0/b/chomped-up.appspot.com/o/restaurants%2Fbesti.jpeg?alt=media&token=7e65eb77-3ef6-407e-9d80-c5821f104be7", 
          "title": "Bestia", 
          "timeOfOperation": "12-8",
          "location": "Beverly Hills", 
          "price": "expensive"
        },
      ]
            
      const result = []
      data.forEach(el => {
        result.push({
                      photo: el.photo,
                      title: el.title,
                      timeOfOperation: el.timeOfOperation,
                      location: el.location,
                      price: el.price,
                      createdAt: new Date(),
                      updatedAt: new Date(),
                    })
    })
      await queryInterface.bulkInsert('Restaurants', result, {})
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Restaurants', null, {})
  }
};
