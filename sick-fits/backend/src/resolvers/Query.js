// const { v4: uuid } = require('uuid');

const { forwardTo } = require('prisma-binding');


module.exports = {
  item: forwardTo('db'),
  items: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  // items: async (parent, args, ctx, info) => {
  //   const items = await ctx.db.query.items();
  //   console.log('items:', items);
  //   return items;
  // },
  me: async (parent, args, ctx, info) => {

    const { userID } = ctx.request;

    if (userID) {
      return await ctx.db.query.user({
        where: {
          id: userID
        }
      }, info);
    } else {
      return null;
    }
  }
};
