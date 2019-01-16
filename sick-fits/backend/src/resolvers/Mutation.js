// const { v4: uuid } = require('uuid');
const { hash } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { forwardTo } = require('prisma-binding');



module.exports = {
  createItem: forwardTo('db'),
  updateItem: forwardTo('db'),
  deleteItem: forwardTo('db'),
  signup: async (parent, args, ctx, info) => {

    const email = args.email.toLowerCase().trim();
    const password = await hash(args.password, 10);
    const name = args.name.trim();

    const user = await ctx.db.mutation.createUser({
      data: {
        email,
        password,
        name,
        permissions: {
          set: ['USER']
        }
      }
    }, info);

    const token = sign({ userId: user.id }, process.env.APP_SECRET);

    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });

    return user;

  }
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
