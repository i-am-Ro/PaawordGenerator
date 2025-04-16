import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-lg mx-auto mt-12 p-6 rounded-2xl bg-zinc-900 text-orange-400 shadow-2xl">
        <h1 className="text-white text-2xl font-semibold text-center mb-6">
          Password Generator
        </h1>

        <div className="flex items-center bg-zinc-800 rounded-lg overflow-hidden shadow-inner mb-6">
          <input
            type="text"
            value={password}
            className="flex-1 bg-transparent text-white px-4 py-2 outline-none"
            placeholder="Generated password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 transition-all"
            onClick={copyPasswordToClipBoard}
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm">
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer accent-orange-500"
              onChange={(e) => setLength(e.target.value)}
            />
            <span className="text-white font-medium">Length: {length}</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="accent-orange-500"
            />
            <label htmlFor="numberInput" className="text-white">
              Numbers
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => setCharAllowed((prev) => !prev)}
              className="accent-orange-500"
            />
            <label htmlFor="characterInput" className="text-white">
              Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
