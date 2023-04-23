'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      const data = [
        {
          "RestoId": 5, 
          "UserId": 1,
        },
        {
          "RestoId": 4, 
          "UserId": 1,
        },
        {
          "RestoId": 3, 
          "UserId": 1,
        },
        {
          "RestoId": 2, 
          "UserId": 1,
        },
        {
          "RestoId": 1, 
          "UserId": 1,
        },
        {
          "RestoId": 5, 
          "UserId": 5,
        },
        {
          "RestoId": 4, 
          "UserId": 5,
        },
        {
          "RestoId": 3, 
          "UserId": 5,
        },
        {
          "RestoId": 2, 
          "UserId": 5,
        },
        {
          "RestoId": 1, 
          "UserId": 5,
        },
        {
          "RestoId": 5, 
          "UserId": 3,
        },
        {
          "RestoId": 4, 
          "UserId": 3,
        },
        {
          "RestoId": 3, 
          "UserId": 3,
        },
        {
          "RestoId": 2, 
          "UserId": 3,
        },
        {
          "RestoId": 1, 
          "UserId": 3,
        },
      ]
            
      const result = []
      data.forEach(el => {
        result.push({
                      UserId: el.UserId,
                      RestoId: el.RestoId,
                      createdAt: new Date(),
                      updatedAt: new Date(),
                    })
    })
      await queryInterface.bulkInsert('Wishlists', result, {})
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Wishlists', null, {})
  }
};