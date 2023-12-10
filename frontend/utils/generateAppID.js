const crypto = require("crypto");

const generateRandomBigInt = () => {
  // Generate a random string of 20 bytes
  const randomHex = crypto.randomBytes(20).toString("hex");

  // Parse the hex string to a decimal number
  const decimalNumber = parseInt(randomHex, 16);

  // Convert the decimal number to a BigInt
  const randomBigInt = BigInt(decimalNumber);

  return randomBigInt;
};

// Generate a random BigInt
const app_id = generateRandomBigInt().toString();

console.log(app_id);
