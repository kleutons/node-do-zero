"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _DatabaseMemory_videos;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseMemory = void 0;
const crypto_1 = require("crypto");
class DatabaseMemory {
    constructor() {
        _DatabaseMemory_videos.set(this, new Map());
    }
    list(search) {
        return Array.from(__classPrivateFieldGet(this, _DatabaseMemory_videos, "f").entries())
            .map((videoArray) => {
            const id = videoArray[0];
            const data = videoArray[1];
            return Object.assign({ id }, data);
        })
            .filter(video => {
            if (search) {
                return video.title.includes(search);
            }
            return true;
        });
    }
    create(video) {
        //UUID -> Universal Unique ID
        const videosId = (0, crypto_1.randomUUID)();
        __classPrivateFieldGet(this, _DatabaseMemory_videos, "f").set(videosId, video);
    }
    update(id, video) {
        __classPrivateFieldGet(this, _DatabaseMemory_videos, "f").set(id, video);
    }
    delete(id) {
        __classPrivateFieldGet(this, _DatabaseMemory_videos, "f").delete(id);
    }
}
exports.DatabaseMemory = DatabaseMemory;
_DatabaseMemory_videos = new WeakMap();
