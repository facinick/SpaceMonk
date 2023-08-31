import crypto from 'crypto';

function generateRandomUUID(): string {
    const randomBytes = crypto.randomBytes(16);
    randomBytes[6] = (randomBytes[6] & 0x0f) | 0x40; // Version 4
    randomBytes[8] = (randomBytes[8] & 0x3f) | 0x80; // Variant 10
  
    return randomBytes.toString('hex').match(/(.{8})(.{4})(.{4})(.{4})(.{12})/)!.slice(1).join('-');
}

export { generateRandomUUID };
