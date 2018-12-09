const { v4: uuid } = require('uuid');



module.exports = {
  dogs: (parent, args, ctx, info) => {
    console.log('dogs:', parent, args, ctx, info);
    return [
      {
        id: uuid(),
        name: 'Hans Dog',
        age: 5,
      },
      {
        id: uuid(),
        name: 'Klaus Dog',
        age: 6,
      },
      {
        id: uuid(),
        name: 'Yussuf Dog',
        age: 8,
      },
    ];
  }
};
