'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      const data = [
        {
          "status": "Accepted", 
          "User1": 5, 
          "User2": 1,
        },
        {
          "status": "Accepted", 
          "User1": 5, 
          "User2": 2,
        },
        {
          "status": "Accepted", 
          "User1": 5, 
          "User2": 3,
        },
        {
          "status": "Accepted", 
          "User1": 5, 
          "User2": 4,
        },
        {
          "status": "Accepted", 
          "User1": 5, 
          "User2": 5,
        },
        {
          "status": "Accepted", 
          "User1": 5, 
          "User2": 6,
        },
        {
          "status": "Accepted", 
          "User1": 5, 
          "User2": 7,
        },

      ]
            
      const result = []
      data.forEach(el => {
        result.push({
                      status: el.status,
                      User1: el.User1,
                      User2: el.User2,
                      createdAt: new Date(),
                      updatedAt: new Date(),
                    })
    })
      await queryInterface.bulkInsert('Friendships', result, {})
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Friendships', null, {})
  }
};
