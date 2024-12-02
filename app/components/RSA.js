// rsa.js

// Utility functions
const gcd = (a, b) => {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };
  
  const modInverse = (a, m) => {
    for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) return x;
    }
    throw new Error("No modular inverse found");
  };
  
  // Generate RSA keys
  function generateKeys(p, q, e) {
    p = parseInt(p, 10);
    q = parseInt(q, 10);
    e = parseInt(e, 10);
  
    if (!isPrime(p) || !isPrime(q)) {
      throw new Error("p and q must be prime numbers");
    }
  
    const n = p * q;
    const phi = (p - 1) * (q - 1);
  
    if (gcd(e, phi) !== 1) {
      throw new Error("e must be coprime to φ(n)");
    }
  
    const d = modInverse(e, phi);
  
    return {
      publicKey: { e, n },
      privateKey: { d, n },
    };
  }
  
  // Encrypt with RSA
  function rsaEncrypt(message, publicKey) {
    const { e, n } = publicKey;
    const messageCodes = Array.from(message).map((char) =>
      char.charCodeAt(0)
    );
    const encrypted = messageCodes.map((m) => Math.pow(m, e) % n);
    return encrypted.join(",");
  }
  
  // Decrypt with RSA
  function rsaDecrypt(cipherText, privateKey) {
    const { d, n } = privateKey;
    const encryptedCodes = cipherText.split(",").map(Number);
    const decrypted = encryptedCodes.map((c) => Math.pow(c, d) % n);
    return String.fromCharCode(...decrypted);
  }
  
  // Check if a number is prime
  function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
  
    if (num % 2 === 0 || num % 3 === 0) return false;
  
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  }
  
  export { generateKeys, rsaEncrypt, rsaDecrypt };
  