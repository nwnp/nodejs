const crypto = require("crypto");

const iterations = 1005;

const hashUtil = {
  makePasswordHash(password) {
    return new Promise((resolve, reject) => {
      if (!password) {
        reject(new Error("Not allowed null (password)"));
      }

      // salt
      const salt = crypto.randomBytes(64).toString("base64");

      // hash
      crypto.pbkdf2(
        password,
        salt,
        iterations,
        64,
        "sha256",
        (err, derivedKey) => {
          if (err) throw err;

          const hash = derivedKey.toString("hex");

          const encryptedPassword = `${salt}.${hash}`;
          resolve(encryptedPassword);
        }
      );
    });
  },
  checkPasswordHash(password, encryptedPassword) {
    return new Promise((resolve, reject) => {
      if (!password || !encryptedPassword) {
        reject(new Error("Not allowed null (password)"));
      }
      const encryptedPasswordSplit = encryptedPassword.split(".");
      const salt = encryptedPasswordSplit[0];
      const encryptedHash = encryptedPasswordSplit[1];

      crypto.pbkdf2(
        password,
        salt,
        iterations,
        64,
        "sha256",
        (err, derivedKey) => {
          if (err) throw err;

          const hash = derivedKey.toString("hex");

          if (hash === encryptedHash) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      );
    });
  },
};

module.exports = hashUtil;
