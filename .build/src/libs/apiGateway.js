"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatJSONResponse = void 0;
var http_status_codes_1 = require("http-status-codes");
var formatJSONResponse = function (response, statusCode) {
    if (statusCode === void 0) { statusCode = http_status_codes_1.StatusCodes.OK; }
    return {
        statusCode: statusCode,
        body: JSON.stringify(response)
    };
};
exports.formatJSONResponse = formatJSONResponse;
//# sourceMappingURL=apiGateway.js.map