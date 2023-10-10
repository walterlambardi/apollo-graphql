"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatreProductMutation = exports.ProductsQuery = exports.ProductType = void 0;
const nexus_1 = require("nexus");
const Product_1 = require("../entities/Product");
const User_1 = require("../entities/User");
exports.ProductType = (0, nexus_1.objectType)({
    name: 'Product',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('name');
        t.nonNull.float('price');
        t.nonNull.int('creatorId');
        t.field('createdBy', {
            type: 'User',
            async resolve(parent, _args, _context, _info) {
                return await User_1.User.findOne({ where: { id: parent.creatorId } });
            }
        });
    }
});
exports.ProductsQuery = (0, nexus_1.extendType)({
    type: 'Query',
    definition(t) {
        t.nonNull.list.nonNull.field('products', {
            type: 'Product',
            async resolve(_parent, _args, context, _info) {
                const { conn } = context;
                return await conn.query('select * from products');
            }
        });
    }
});
exports.CreatreProductMutation = (0, nexus_1.extendType)({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('CreateProduct', {
            type: 'Product',
            args: {
                name: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                price: (0, nexus_1.nonNull)((0, nexus_1.floatArg)())
            },
            async resolve(_parent, args, context, _info) {
                const { name, price } = args;
                const { userId } = context;
                if (userId == null) {
                    throw new Error("Can't create product without logging in.");
                }
                return await Product_1.Product.create({ name, price, creatorId: userId }).save();
            }
        });
    }
});
//# sourceMappingURL=Products.js.map