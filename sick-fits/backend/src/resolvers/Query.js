// const { v4: uuid } = require('uuid');

const { forwardTo } = require('prisma-binding');


module.exports = {
  items: forwardTo('db'),
  // items: async (parent, args, ctx, info) => {
  //   const items = await ctx.db.query.items();
  //   console.log('items:', items);
  //   return items;
  // },
};
