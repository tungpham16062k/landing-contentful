import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

const KEY_SIZE = 128 / 32;
const INTERACTION_COUNT = 10000;
const SALT = '88b1e2071884c5622dedb5ef5b2c6c9575d4109c2c2e3762';
const IV = 'F27D5C9927726BCEFE7510B1BDD3D137';

const generateKey = (salt, passPhrase) => CryptoJS.PBKDF2(passPhrase, CryptoJS.enc.Hex.parse(salt), { keySize: KEY_SIZE, iterations: INTERACTION_COUNT });

export const encryptAES = (passPhrase, plainText) => {
    let encrypted = CryptoJS.AES.encrypt(plainText, generateKey(SALT, passPhrase), { iv: CryptoJS.enc.Hex.parse(IV) });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
};

export const decryptAES = (passPhrase, cipherText) => {
    let cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext: CryptoJS.enc.Base64.parse(cipherText) });
    let decrypted = CryptoJS.AES.decrypt(cipherParams, generateKey(SALT, passPhrase), { iv: CryptoJS.enc.Hex.parse(IV) });
    return decrypted.toString(CryptoJS.enc.Utf8);
};

export const isJwtToken = (data) => { if (!data) { return false; } try { return !!jwt.decode(data); } catch (error) { return false; } }

export const jwtEncode = (data) => jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60), data: data }, 'secret');

export const jwtDecode = (data) => data ? jwt.decode(data) : null;

export const deCookie = (token) => { const jw = jwt.decode(token); if (jw.data) return jw.data; else return null; }