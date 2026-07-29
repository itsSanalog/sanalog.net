#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { createCipheriv, createHmac, pbkdf2Sync, randomBytes } from "node:crypto";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const ITERATIONS = 600_000;
const [, , plaintextPath, ...args] = process.argv;
const passwordArgumentIndex = args.indexOf("--password");
const password = passwordArgumentIndex === -1 ? null : args[passwordArgumentIndex + 1];

if (!plaintextPath || (passwordArgumentIndex !== -1 && !password)) {
  console.error("Usage: node scripts/encrypt-limerent.mjs <plaintext-file> [--password <password>]");
  process.exit(1);
}

const plaintext = readFileSync(plaintextPath);
let encryptionPassword = password;

if (encryptionPassword === null) {
  const prompt = createInterface({ input, output });
  encryptionPassword = await prompt.question("Password: ");
  prompt.close();
}

if (!encryptionPassword) {
  console.error("The password cannot be empty.");
  process.exit(1);
}

const format = "limerent/v2/pbkdf2-sha256";
const salt = randomBytes(16);
const counter = randomBytes(16);
const derived = pbkdf2Sync(encryptionPassword, salt, ITERATIONS, 64, "sha256");
const encryptionKey = derived.subarray(0, 32);
const authenticationKey = derived.subarray(32, 64);
const cipher = createCipheriv("aes-256-ctr", encryptionKey, counter);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const encode = (value) => value.toString("base64url");
const authenticatedData = Buffer.from(`${format}/${ITERATIONS}/${encode(salt)}/${encode(counter)}/${encode(encrypted)}`);
const tag = createHmac("sha256", authenticationKey).update(authenticatedData).digest();

console.log(`${authenticatedData.toString()}/${encode(tag)}`);
