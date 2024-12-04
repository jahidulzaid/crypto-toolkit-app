"use client";
import { useState, useEffect, useCallback } from "react";
import { Moon, Sun, Lock } from "lucide-react";
import md5 from "./components/MD5";
import * as RSA from "./components/RSA";
import { playfairEncrypt } from "./components/PLAYFAIR";

export default function CryptoConverter() {
  const [selectedAlgo, setSelectedAlgo] = useState("md5");
  const [plainText, setPlainText] = useState("");
  const [keyWord, setKeyWord] = useState("");
  const [cipherText, setCipherText] = useState("");
  const [theme, setTheme] = useState("light");
  const [rsaParams, setRsaParams] = useState({ p: "", q: "", e: "" });
  const [rsaKeys, setRsaKeys] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const algorithms = ["md5", "playfair", "rsa"];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  }, [theme]);

  const encrypt = useCallback(() => {
    setIsProcessing(true);
    setError("");

    setTimeout(() => {
      try {
        let result = "";
        switch (selectedAlgo) {
          case "md5":
            result = md5(plainText);
            break;
          case "playfair":
            result = playfairEncrypt(keyWord, plainText);
            break;
          case "rsa":
            if (rsaParams.p && rsaParams.q && rsaParams.e) {
              const keys = RSA.generateKeys(
                rsaParams.p,
                rsaParams.q,
                rsaParams.e
              );
              setRsaKeys(keys);
              result = RSA.rsaEncrypt(plainText, keys.publicKey);
            } else {
              throw new Error("Please enter all RSA parameters");
            }
            break;
        }
        setCipherText(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsProcessing(false);
      }
    }, 0);
  }, [plainText, selectedAlgo, rsaParams]);

  const decrypt = useCallback(() => {
    setIsProcessing(true);
    setError("");

    setTimeout(() => {
      try {
        if (selectedAlgo === "rsa" && rsaKeys) {
          const result = RSA.rsaDecrypt(cipherText, rsaKeys.privateKey);
          setPlainText(result);
        } else {
          throw new Error("Decryption is only available for RSA");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsProcessing(false);
      }
    }, 0);
  }, [cipherText, selectedAlgo, rsaKeys]);

  const copyToClipboard = useCallback((text) => {
    navigator.clipboard.writeText(text);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto p-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Crypto Toolkit App
          </h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
          >
            {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
          </button>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div
            className={`w-full ${
              selectedAlgo === "rsa" ? "lg:w-1/2" : ""
            } p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md`}
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              Encryption
            </h2>
            <div className="mb-4 flex flex-wrap gap-2">
              {algorithms.map((algo) => (
                <button
                  key={algo}
                  onClick={() => setSelectedAlgo(algo)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedAlgo === algo
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-900"
                  }`}
                >
                  {algo.toUpperCase()}
                </button>
              ))}
            </div>
            {selectedAlgo === "playfair" ? (
              <div className="w-full items-center justify-center py-4">
                <input
                  value={keyWord}
                  onChange={(e) => setKeyWord(e.target.value)}
                  placeholder="Enter keyword"
                  className="p-2 w-full"
                />
              </div>
            ) : null}
            <div className="mb-4">
              <textarea
                value={plainText}
                onChange={(e) => setPlainText(e.target.value)}
                placeholder="Enter plain text"
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                rows={4}
              />
            </div>
            {selectedAlgo === "rsa" && (
              <div className="mb-4 grid grid-cols-3 gap-2">
                <input
                  type="number"
                  value={rsaParams.p}
                  onChange={(e) =>
                    setRsaParams({ ...rsaParams, p: e.target.value })
                  }
                  placeholder="p (prime)"
                  className="p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                />
                <input
                  type="number"
                  value={rsaParams.q}
                  onChange={(e) =>
                    setRsaParams({ ...rsaParams, q: e.target.value })
                  }
                  placeholder="q (prime)"
                  className="p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                />
                <input
                  type="number"
                  value={rsaParams.e}
                  onChange={(e) =>
                    setRsaParams({ ...rsaParams, e: e.target.value })
                  }
                  placeholder="e (coprime to φ(n))"
                  className="p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                />
              </div>
            )}
            <div className="mb-4 flex gap-2">
              <button
                onClick={encrypt}
                disabled={isProcessing}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200 disabled:bg-gray-400"
              >
                {isProcessing ? "Processing..." : "Encrypt"}
              </button>
              <button
                onClick={() => copyToClipboard(cipherText)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
              >
                Copy Cipher Text
              </button>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div>
              <textarea
                value={cipherText}
                readOnly
                className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                rows={4}
              />
            </div>
          </div>
          {selectedAlgo === "rsa" ? (
            <div className="w-full lg:w-1/2 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                Decryption
              </h2>
              <div className="mb-4">
                <textarea
                  value={cipherText}
                  onChange={(e) => setCipherText(e.target.value)}
                  placeholder="Enter cipher text"
                  className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                  rows={4}
                />
              </div>
              <div className="mb-4">
                <button
                  onClick={decrypt}
                  disabled={isProcessing}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200 disabled:bg-gray-400"
                >
                  {isProcessing ? "Processing..." : "Decrypt"}
                </button>
              </div>
              <div>
                <textarea
                  value={plainText}
                  readOnly
                  className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                  rows={4}
                />
              </div>
            </div>
          ) : (
            <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <div className="text-center">
                <Lock
                  size={100}
                  className="mx-auto text-gray-400 dark:text-gray-600"
                />
                <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
                  Secure Encryption
                </p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                  Your data is securely encrypted using advanced algorithms
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
