function md5(str) {
  function rotateLeft(lValue, shiftBits) {
    return (lValue << shiftBits) | (lValue >>> (32 - shiftBits));
  }

  function addUnsigned(lX, lY) {
    const lX4 = lX & 0x40000000;
    const lY4 = lY & 0x40000000;
    const lX8 = lX & 0x80000000;
    const lY8 = lY & 0x80000000;
    const result = (lX & 0x3fffffff) + (lY & 0x3fffffff);
    if (lX4 & lY4) return result ^ 0x80000000 ^ lX8 ^ lY8;
    if (lX4 | lY4) {
      if (result & 0x40000000) {
        return result ^ 0xc0000000 ^ lX8 ^ lY8;
      } else {
        return result ^ 0x40000000 ^ lX8 ^ lY8;
      }
    } else {
      return result ^ lX8 ^ lY8;
    }
  }

  function F(x, y, z) {
    return (x & y) | (~x & z);
  }

  function G(x, y, z) {
    return (x & z) | (y & ~z);
  }

  function H(x, y, z) {
    return x ^ y ^ z;
  }

  function I(x, y, z) {
    return y ^ (x | ~z);
  }

  function transform(func, a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(func(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function convertToWordArray(string) {
    let lWordCount;
    const lMessageLength = string.length;
    const lNumberOfWordsTemp1 = lMessageLength + 8;
    const lNumberOfWordsTemp2 =
      (lNumberOfWordsTemp1 - (lNumberOfWordsTemp1 % 64)) / 64;
    const lNumberOfWords = (lNumberOfWordsTemp2 + 1) * 16;
    const lWordArray = new Array(lNumberOfWords - 1);
    let lBytePosition = 0;
    let lByteCount = 0;

    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] =
        (lWordArray[lWordCount] |
          (string.charCodeAt(lByteCount) << lBytePosition)) >>>
        0;
      lByteCount++;
    }

    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  }

  function wordToHex(lValue) {
    let wordToHexValue = "";
    let wordToHexValueTemp = "";
    let lByte;
    let lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255;
      wordToHexValueTemp = "0" + lByte.toString(16);
      wordToHexValue =
        wordToHexValue +
        wordToHexValueTemp.substr(wordToHexValueTemp.length - 2, 2);
    }
    return wordToHexValue;
  }

  const x = convertToWordArray(str);
  let a = 0x67452301;
  let b = 0xefcdab89;
  let c = 0x98badcfe;
  let d = 0x10325476;

  const S11 = 7,
    S12 = 12,
    S13 = 17,
    S14 = 22;
  const S21 = 5,
    S22 = 9,
    S23 = 14,
    S24 = 20;
  const S31 = 4,
    S32 = 11,
    S33 = 16,
    S34 = 23;
  const S41 = 6,
    S42 = 10,
    S43 = 15,
    S44 = 21;

  for (let k = 0; k < x.length; k += 16) {
    const AA = a;
    const BB = b;
    const CC = c;
    const DD = d;
    a = transform(F, a, b, c, d, x[k + 0], S11, 0xd76aa478);
    d = transform(F, d, a, b, c, x[k + 1], S12, 0xe8c7b756);
    c = transform(F, c, d, a, b, x[k + 2], S13, 0x242070db);
    b = transform(F, b, c, d, a, x[k + 3], S14, 0xc1bdceee);
    a = transform(F, a, b, c, d, x[k + 4], S11, 0xf57c0faf);
    d = transform(F, d, a, b, c, x[k + 5], S12, 0x4787c62a);
    c = transform(F, c, d, a, b, x[k + 6], S13, 0xa8304613);
    b = transform(F, b, c, d, a, x[k + 7], S14, 0xfd469501);
    a = transform(F, a, b, c, d, x[k + 8], S11, 0x698098d8);
    d = transform(F, d, a, b, c, x[k + 9], S12, 0x8b44f7af);
    c = transform(F, c, d, a, b, x[k + 10], S13, 0xffff5bb1);
    b = transform(F, b, c, d, a, x[k + 11], S14, 0x895cd7be);
    a = transform(F, a, b, c, d, x[k + 12], S11, 0x6b901122);
    d = transform(F, d, a, b, c, x[k + 13], S12, 0xfd987193);
    c = transform(F, c, d, a, b, x[k + 14], S13, 0xa679438e);
    b = transform(F, b, c, d, a, x[k + 15], S14, 0x49b40821);

    a = transform(G, a, b, c, d, x[k + 1], S21, 0xf61e2562);
    d = transform(G, d, a, b, c, x[k + 6], S22, 0xc040b340);
    c = transform(G, c, d, a, b, x[k + 11], S23, 0x265e5a51);
    b = transform(G, b, c, d, a, x[k + 0], S24, 0xe9b6c7aa);
    a = transform(G, a, b, c, d, x[k + 5], S21, 0xd62f105d);
    d = transform(G, d, a, b, c, x[k + 10], S22, 0x02441453);
    c = transform(G, c, d, a, b, x[k + 15], S23, 0xd8a1e681);
    b = transform(G, b, c, d, a, x[k + 4], S24, 0xe7d3fbc8);
    a = transform(G, a, b, c, d, x[k + 9], S21, 0x21e1cde6);
    d = transform(G, d, a, b, c, x[k + 14], S22, 0xc33707d6);
    c = transform(G, c, d, a, b, x[k + 3], S23, 0xf4d50d87);
    b = transform(G, b, c, d, a, x[k + 8], S24, 0x455a14ed);
    a = transform(G, a, b, c, d, x[k + 13], S21, 0xa9e3e905);
    d = transform(G, d, a, b, c, x[k + 2], S22, 0xfcefa3f8);
    c = transform(G, c, d, a, b, x[k + 7], S23, 0x676f02d9);
    b = transform(G, b, c, d, a, x[k + 12], S24, 0x8d2a4c8a);

    a = transform(H, a, b, c, d, x[k + 5], S31, 0xfffa3942);
    d = transform(H, d, a, b, c, x[k + 8], S32, 0x8771f681);
    c = transform(H, c, d, a, b, x[k + 11], S33, 0x6d9d6122);
    b = transform(H, b, c, d, a, x[k + 14], S34, 0xfde5380c);
    a = transform(H, a, b, c, d, x[k + 1], S31, 0xa4beea44);
    d = transform(H, d, a, b, c, x[k + 4], S32, 0x4bdecfa9);
    c = transform(H, c, d, a, b, x[k + 7], S33, 0xf6bb4b60);
    b = transform(H, b, c, d, a, x[k + 10], S34, 0xbebfbc70);
    a = transform(H, a, b, c, d, x[k + 13], S31, 0x289b7ec6);
    d = transform(H, d, a, b, c, x[k + 0], S32, 0xeaa127fa);
    c = transform(H, c, d, a, b, x[k + 3], S33, 0xd4ef3085);
    b = transform(H, b, c, d, a, x[k + 6], S34, 0x04881d05);
    a = transform(H, a, b, c, d, x[k + 9], S31, 0xd9d4d039);
    d = transform(H, d, a, b, c, x[k + 12], S32, 0xe6db99e5);
    c = transform(H, c, d, a, b, x[k + 15], S33, 0x1fa27cf8);
    b = transform(H, b, c, d, a, x[k + 2], S34, 0xc4ac5665);

    a = transform(I, a, b, c, d, x[k + 0], S41, 0xf4292244);
    d = transform(I, d, a, b, c, x[k + 7], S42, 0x432aff97);
    c = transform(I, c, d, a, b, x[k + 14], S43, 0xab9423a7);
    b = transform(I, b, c, d, a, x[k + 5], S44, 0xfc93a039);
    a = transform(I, a, b, c, d, x[k + 12], S41, 0x655b59c3);
    d = transform(I, d, a, b, c, x[k + 3], S42, 0x8f0ccc92);
    c = transform(I, c, d, a, b, x[k + 10], S43, 0xffeff47d);
    b = transform(I, b, c, d, a, x[k + 1], S44, 0x85845dd1);
    a = transform(I, a, b, c, d, x[k + 8], S41, 0x6fa87e4f);
    d = transform(I, d, a, b, c, x[k + 15], S42, 0xfe2ce6e0);
    c = transform(I, c, d, a, b, x[k + 6], S43, 0xa3014314);
    b = transform(I, b, c, d, a, x[k + 13], S44, 0x4e0811a1);
    a = transform(I, a, b, c, d, x[k + 4], S41, 0xf7537e82);
    d = transform(I, d, a, b, c, x[k + 11], S42, 0xbd3af235);
    c = transform(I, c, d, a, b, x[k + 2], S43, 0x2ad7d2bb);
    b = transform(I, b, c, d, a, x[k + 9], S44, 0xeb86d391);

    a = addUnsigned(a, AA);
    b = addUnsigned(b, BB);
    c = addUnsigned(c, CC);
    d = addUnsigned(d, DD);
  }

  const md5Hash = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
  return md5Hash.toLowerCase();
}

// Test MD5 Hash Function
console.log("MD5 Hash of 'hello':", md5("hello"));
console.log("MD5 Hash of 'maruf':", md5("maruf"));

export default md5;
