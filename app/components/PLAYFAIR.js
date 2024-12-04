export function playfairEncrypt(keyword, message) {
  function createGrid(key) {
    const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
    const uniqueKey = [
      ...new Set(
        key
          .toUpperCase()
          .replace(/J/g, "I")
          .replace(/[^A-Z]/g, "")
      ),
    ];
    const grid = uniqueKey.concat(
      [...alphabet].filter((char) => !uniqueKey.includes(char))
    );
    const arr = Array.from({ length: 5 }, (_, i) =>
      grid.slice(i * 5, i * 5 + 5)
    );
    return arr;
  }

  function findPosition(grid, char) {
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (grid[row][col] === char) return [row, col];
      }
    }
    return null;
  }

  function prepareMessage(msg) {
    const cleanMessage = msg
      .toUpperCase()
      .replace(/J/g, "I")
      .replace(/[^A-Z]/g, "");

    const digraphs = [];
    for (let i = 0; i < cleanMessage.length; i += 2) {
      let first = cleanMessage[i];
      let second = cleanMessage[i + 1] || "X";
      if (first === second) {
        second = "X";
        i--;
      }
      digraphs.push(first + second);
    }
    return digraphs;
  }

  function encryptDigraph(grid, digraph) {
    const [first, second] = digraph.split("");
    const [r1, c1] = findPosition(grid, first);
    const [r2, c2] = findPosition(grid, second);

    if (r1 === r2) {
      return grid[r1][(c1 + 1) % 5] + grid[r2][(c2 + 1) % 5];
    } else if (c1 === c2) {
      return grid[(r1 + 1) % 5][c1] + grid[(r2 + 1) % 5][c2];
    } else {
      return grid[r1][c2] + grid[r2][c1];
    }
  }

  const grid = createGrid(keyword);
  const digraphs = prepareMessage(message);
  return digraphs.map((pair) => encryptDigraph(grid, pair)).join("");
}

export function playfairDecrypt(keyword, encryptedMessage) {
  function createGrid(key) {
    const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
    const uniqueKey = [
      ...new Set(
        key
          .toUpperCase()
          .replace(/J/g, "I")
          .replace(/[^A-Z]/g, "")
      ),
    ];
    const grid = uniqueKey.concat(
      [...alphabet].filter((char) => !uniqueKey.includes(char))
    );
    return Array.from({ length: 5 }, (_, i) => grid.slice(i * 5, i * 5 + 5));
  }

  function findPosition(grid, char) {
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (grid[row][col] === char) return [row, col];
      }
    }
    return null;
  }

  function decryptDigraph(grid, digraph) {
    const [first, second] = digraph.split("");
    const [r1, c1] = findPosition(grid, first);
    const [r2, c2] = findPosition(grid, second);

    if (r1 === r2) {
      return grid[r1][(c1 + 4) % 5] + grid[r2][(c2 + 4) % 5];
    } else if (c1 === c2) {
      return grid[(r1 + 4) % 5][c1] + grid[(r2 + 4) % 5][c2];
    } else {
      return grid[r1][c2] + grid[r2][c1];
    }
  }

  const grid = createGrid(keyword);
  const digraphs = encryptedMessage.match(/.{1,2}/g) || [];
  return digraphs.map((pair) => decryptDigraph(grid, pair)).join("");
}
