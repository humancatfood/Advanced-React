// const { v4: uuid } = require('uuid');

const { forwardTo } = require('prisma-binding');



module.exports = {
  createItem: forwardTo('db'),
  updateItem: forwardTo('db'),
  // createItem: async (parent, args, ctx, info) => {
  //   const newItem = await ctx.db.mutation.createItem({
  //     data: {
  //       ...args.item
  //     }
  //   }, info);
  //   console.log('newItem:', newItem);
  //   return newItem;
  // },
};
