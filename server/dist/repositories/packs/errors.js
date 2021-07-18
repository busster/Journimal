"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackInviteExpired = exports.PackInviteNotExist = exports.NotMemberOfPack = exports.CouldNotUpdatePack = exports.CouldNotCreatePack = exports.PackDoesNotExist = void 0;
exports.PackDoesNotExist = new Error('Pack does not exist');
exports.CouldNotCreatePack = new Error('Could not create pack');
exports.CouldNotUpdatePack = new Error('Could not update pack');
exports.NotMemberOfPack = new Error('Not member of pack');
exports.PackInviteNotExist = new Error('Pack invite does not exist');
exports.PackInviteExpired = new Error('Pack invite expired');
//# sourceMappingURL=errors.js.map