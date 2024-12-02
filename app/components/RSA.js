// rsa.js

// Utility function to compute the greatest common divisor
const gcd = (a, b) => {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };
  
  // Compute modular multiplicative inverse
  const modInverse = (a, m) => {
    for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) return x;
    }
    throw new Error("No modular inverse found");
  };
  
  // Check if a number is prime
  const isPrime = (num) => {
    if (num <= 1) return false;
    if (num <= 3) return true;
  
    if (num % 2 === 0 || num % 3 === 0) return false;
  
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
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
  
  // Encrypt message using RSA
  function rsaEncrypt(message, publicKey) {
    const { e, n } = publicKey;
  
    // Convert each character into a number, encrypt, and join into a continuous string
    const encrypted = Array.from(message)
      .map((char) => {
        const m = char.charCodeAt(0);
        return (BigInt(m) ** BigInt(e) % BigInt(n)).toString().padStart(5, "0");
      })
      .join("");
  
    return encrypted;
  }
  
  // Decrypt message using RSA
  function rsaDecrypt(cipherText, privateKey) {
    const { d, n } = privateKey;
  
    // Split ciphertext into blocks of 5, decrypt, and convert back to characters
    const decrypted = cipherText
      .match(/.{1,5}/g)
      .map((block) => {
        const c = BigInt(block);
        return String.fromCharCode(Number(BigInt(c) ** BigInt(d) % BigInt(n)));
      })
      .join("");
  
    return decrypted;
  }
  
  export { generateKeys, rsaEncrypt, rsaDecrypt };
  