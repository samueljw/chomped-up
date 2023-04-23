'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      const data = [
        {
          "rating": 3, 
          "RestoId": 5, 
          "UserId": 1,
        },
        {
          "rating": 5, 
          "RestoId": 4, 
          "UserId": 1,
        },
        {
          "rating": 3, 
          "RestoId": 3, 
          "UserId": 1,
        },
        {
          "rating": 4, 
          "RestoId": 2, 
          "UserId": 1,
        },
        {
          "rating": 2, 
          "RestoId": 1, 
          "UserId": 1,
        },
        {
          "rating": 3, 
          "RestoId": 6, 
          "UserId": 1,
        },
        {
          "rating": 5, 
          "RestoId": 7, 
          "UserId": 1,
        },
        {
          "rating": 3, 
          "RestoId": 8, 
          "UserId": 1,
        },
        {
          "rating": 4, 
          "RestoId": 9, 
          "UserId": 1,
        },
        {
          "rating": 2, 
          "RestoId": 10, 
          "UserId": 1,
        },
        {
          "rating": 3, 
          "RestoId": 5, 
          "UserId": 1,
        },
        {
          "rating": 5, 
          "RestoId": 4, 
          "UserId": 5,
        },
        {
          "rating": 3, 
          "RestoId": 3, 
          "UserId": 5,
        },
        {
          "rating": 4, 
          "RestoId": 2, 
          "UserId": 5,
        },
        {
          "rating": 2, 
          "RestoId": 1, 
          "UserId": 1,
        },
        {
          "rating": 3, 
          "RestoId": 6, 
          "UserId": 1,
        },
        {
          "rating": 5, 
          "RestoId": 7, 
          "UserId": 1,
        },
        {
          "rating": 3, 
          "RestoId": 8, 
          "UserId": 1,
        },
        {
          "rating": 4, 
          "RestoId": 9, 
          "UserId": 1,
        },
        {
          "rating": 2, 
          "RestoId": 10, 
          "UserId": 1,
        },
      ]
            
      const result = []
      data.forEach(el => {
        result.push({
                      rating: el.rating,
                      UserId: el.UserId,
                      RestoId: el.RestoId,
                      createdAt: new Date(),
                      updatedAt: new Date(),
                    })
    })
      await queryInterface.bulkInsert('Ratings', result, {})
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Ratings', null, {})
  }
};