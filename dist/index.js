"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const schema_1 = require("./schema");
const typeorm_config_1 = __importDefault(require("./typeorm.config"));
const auth_1 = require("./middlewares/auth");
const boot = async () => {
    const conn = await typeorm_config_1.default.initialize();
    const server = new apollo_server_1.ApolloServer({
        schema: schema_1.schema,
        context: ({ req }) => {
            var _a;
            const token = (((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) != null) ? (0, auth_1.auth)(req.headers.authorization) : null;
            return { conn, userId: token === null || token === void 0 ? void 0 : token.userId };
        }
    });
    await server.listen(3000).then(({ url }) => { console.log('Listening on ', url); });
};
boot().catch((err) => {
    console.log('Error:', err);
});
//# sourceMappingURL=index.js.map