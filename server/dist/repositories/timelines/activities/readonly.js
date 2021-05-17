"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActivityTypesService = void 0;
const collections_1 = require("../../collections");
const CouldNotFetchActivityTypes = new Error('Could not fetch activity types');
exports.getActivityTypesService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activityTypes = yield collections_1.activityTypesCollection.get();
        return activityTypes.docs.map(activityType => {
            const activityTypeData = activityType.data();
            return {
                type: activityTypeData.type,
                icon: activityTypeData.icon
            };
        });
    }
    catch (ex) {
        throw CouldNotFetchActivityTypes;
    }
});
//# sourceMappingURL=readonly.js.map