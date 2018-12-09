const { v4: uuid } = require('uuid');



module.exports = {
  createDog: (parent, args, ctx, info) => {
    console.log('createDog:', args);
    return {
      id: uuid(),
      name: args.dog.name,
      age: args.dog.age,
    };
  }
};
