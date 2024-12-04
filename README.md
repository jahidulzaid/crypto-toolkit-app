# Crypto Toolkit App

Crypto Toolkit App is a web application built with Next.js and Tailwind CSS that allows users to encrypt and decrypt messages using various cryptographic algorithms. The application features a responsive design with both light and dark themes.

## Features

- Support for multiple encryption algorithms:
  - MD5 (one-way hash)
  - Playfair (one-way hash)
  - RSA (public-key cryptography)
- Real-time encryption and decryption
- Optimized algorithm implementations for better performance
- Responsive design for all devices
- Light and dark theme support with persistent user preference
- Error handling and processing states
- Copy to clipboard functionality

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/crypto-toolkit-app.git
   ```

2. Navigate to the project directory:

```shellscript
 cd crypto-toolkit-app
```

3. Install the dependencies:

```shellscript
 npm install
```

### Running the Application

To run the application in development mode:

```shellscript
 npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Building for Production

To create a production build:

```shellscript
 npm run build
```

To start the production server:

```shellscript
 npm start
```

## Usage

1. Select an encryption algorithm from the available options (MD5, Playfair, RSA).
2. For MD5 and Playfair:

3. Enter the text you want to hash in the input field
4. Click "Encrypt" to generate the hash
5. Use the "Copy" button to copy the hash to your clipboard

6. For RSA:

7. Enter the text you want to encrypt
8. Provide the required parameters:

9. p (a prime number)
10. q (another prime number)
11. e (coprime to φ(n))

12. Click "Encrypt" to generate the encrypted text
13. Use the decryption panel to decrypt the message using the generated keys

14. Theme Toggle:

15. Click the sun/moon icon in the top-right corner to switch between light and dark themes
16. Your theme preference will be saved and persisted across sessions

## Technical Details

### Optimizations

- Efficient implementations of cryptographic algorithms using:

- TypedArrays (Uint32Array) for MD5 and Playfair
- BigInt for RSA calculations

- Asynchronous processing to prevent UI blocking
- Optimized state management using React hooks
- Responsive design with Tailwind CSS
- Error handling and user feedback

### Security Note

The cryptographic implementations in this project are for educational purposes only and should not be used for securing sensitive information. In particular:

- MD5 is considered cryptographically broken and should not be used for secure hashing
- Playfair is secure but should be used with a proper salt for password hashing
- The RSA implementation is simplified and uses smaller key sizes than recommended for real-world applications

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

```plaintext
MIT License

Copyright (c) 2024 Md. Maruf Sarker

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
