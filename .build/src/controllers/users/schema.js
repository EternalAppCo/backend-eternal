"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema = {
    type: "object",
    properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        wallet: {
            type: 'object',
            properties: {
                balance: { type: 'number' },
            },
        },
    },
    required: ['name', 'email']
};
exports.default = schema;
//# sourceMappingURL=schema.js.map