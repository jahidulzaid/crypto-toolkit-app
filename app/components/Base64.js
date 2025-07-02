
function base64Encode(str) {
  try {
    return btoa(str);
  } catch (e) {
    console.error("Failed to encode to Base64:", e);
    return "";
  }
}

function base64Decode(str) {
  try {
    return atob(str);
  } catch (e) {
    console.error("Failed to decode from Base64:", e);
    return "";
  }
}

export { base64Encode, base64Decode };
