/**
 * this file used to initiate basic data inside the authentication service
 */
import { model } from "mongoose";
import config from "../config";

const User = model("User");

export function init() {
  const user = new User({
    tenant: process.env.TENANT,
    email: process.env.EMAIL || "test@test.com",
    name: "Administrator",
    password: process.env.PASSWORD || "admin",
    roles: [config.privilegedRoles[0]],
  });

  return user.save().then((lastUser) => {
    return lastUser;
  });
}

export function reset(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== "production") {
      User.deleteMany({}, {}, (err) => {
        if (err) {
          return reject(err);
        }
        User.syncIndexes({}, (errIdx) => {
          if (errIdx) {
            reject(errIdx);
          }
          resolve();
        });
      });
    } else {
      return reject(new Error("cannot reset production"));
    }
  });
}


