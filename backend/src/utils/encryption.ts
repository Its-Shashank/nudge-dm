import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;

const getEncryptionKey = (): Buffer => {
  const keyHex = process.env.ENCRYPTION_KEY;
  if (!keyHex) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("ENCRYPTION_KEY environment variable is required in production!");
    }
    // 32-byte fallback key for local dev
    return Buffer.alloc(32, 0);
  }
  try {
    const key = Buffer.from(keyHex, "hex");
    if (key.length !== 32) {
      throw new Error("Key must be 32 bytes");
    }
    return key;
  } catch (error) {
    throw new Error("Invalid ENCRYPTION_KEY, must be a 64-character hex string.");
  }
};

export const encrypt = (text: string): string => {
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  
  const authTag = cipher.getAuthTag().toString("hex");
  
  // Format: iv:encryptedText:authTag
  return `${iv.toString("hex")}:${encrypted}:${authTag}`;
};

export const decrypt = (encryptedText: string): string => {
  try {
    const key = getEncryptionKey();
    const parts = encryptedText.split(":");
    if (parts.length !== 3) {
      throw new Error("Invalid format");
    }
    
    const iv = Buffer.from(parts[0], "hex");
    const encrypted = parts[1];
    const authTag = Buffer.from(parts[2], "hex");
    
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    
    return decrypted;
  } catch (error: any) {
    throw new Error(`Failed to decrypt: ${error.message}`);
  }
};
