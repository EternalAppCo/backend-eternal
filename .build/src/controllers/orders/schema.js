"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema = {
    type: "object",
    properties: {
        client_id: { type: 'string' },
        products: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    product_id: { type: 'string' },
                    quantity: { type: 'number', default: 1 }
                },
                required: ['product_id']
            }
        },
    },
    required: ['client_id', 'products']
};
exports.default = schema;
//# sourceMappingURL=schema.js.map