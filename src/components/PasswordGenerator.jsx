import React, { useState, useRef } from "react";
import { TiClipboard } from "react-icons/ti";
import { upperCase, lowerCase, numbers, symbols } from "./AllCharacters";
import { Toaster, toast } from "react-hot-toast";

const PasswordGenerator = () => {
  const [range, setRange] = useState(8);
  const [password, setPassword] = useState("");
  const [checks, setChecks] = useState({
    uppercase: true,
    lowercase: true,
    numbers: false,
    symbols: false,
  });

  // used inputref for select the password when user click on copy button ( for provide the better user experience ).
  const inputRef = useRef(null);

  const generatePasswordHandler = () => {
    if (
      !checks.uppercase &&
      !checks.lowercase &&
      !checks.numbers &&
      !checks.symbols
    ) {
      toast.error("Please  Select Atleast One CheckBox", {
        duration: 2000,
      });
      return;
    } else {
      let characters = "";
      if (checks.uppercase) {
        characters += upperCase;
      }
      if (checks.lowercase) {
        characters += lowerCase;
      }
      if (checks.numbers) {
        characters += numbers;
      }
      if (checks.symbols) {
        characters += symbols;
      }
      setPassword(finalPassword(characters));
    }
  };

  const finalPassword = (chars) => {
    let pass = "";
    for (let i = 1; i <= range; i++) {
      pass += chars.charAt(Math.round(Math.random() * chars.length));
    }
    return pass;
  };

  const copyToClipboardHandler = () => {
    if (password != "" && password.length > 0) {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }

      navigator.clipboard.writeText(password);
      toast.success("Password Coppied To clipboard!", {
        duration: 2000,
      });
    } else {
      toast.error("First Generate The Password!", {
        duration: 2000,
      });
    }
  };

  return (
    <div className=" px-4 text-white rounded-md bg-slate-900 h-[90vh]  justify-center  md:h-[70vh] md:min-w-[50vh] gap-2 py-4 flex items-center md:px-10 flex-col">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className=" text-3xl my-3 mb-8 font-bold">Password Generator</h1>
      <div className=" flex items-center gap-2">
        <input
          placeholder="Your Password"
          type="text"
          readOnly
          value={password}
          className=" focus:outline-none text-center  bg-blue-500 px-2  h-[4vh] md:w-[28vw] w-64 rounded-md"
          ref={inputRef}
        />
        <TiClipboard
          className=" cursor-pointer"
          color="#fff"
          size={26}
          title="Copy to clipboard"
          onClick={copyToClipboardHandler}
        />
      </div>
      <div className=" py-4">
        <div className="flex md:relative md:left-2  opacity-65">
          Password Length : {range}
        </div>
        <div className=" md:w-[30vw] bg-slate-600 flex justify-center h-9 px-4 rounded-md">
          <input
            type="range"
            className=" md:w-[30vw]"
            onChange={(e) => {
              setRange(e.target.value);
            }}
            value={range}
            min={5}
            max={25}
          />
        </div>
      </div>
      <div>
        <div className=" my-4 rounded-md md:w-[30vw]  h-12  flex items-center gap-4 bg-slate-600 px-2">
          <input
            id="uppercase"
            onChange={(e) => {
              setChecks({ ...checks, uppercase: e.target.checked });
            }}
            checked={checks.uppercase}
            type="checkbox"
            value=""
            className="w-4 h-4 "
          />
          <label htmlFor="uppercase">Include UpperCase</label>
        </div>
        <div className="my-4 rounded-md md:w-[30vw]  h-12 flex items-center gap-4 bg-slate-600 px-2">
          <input
            id="lowercase"
            onChange={(e) => {
              setChecks({ ...checks, lowercase: e.target.checked });
            }}
            checked={checks.lowercase}
            type="checkbox"
            value=""
            className="w-4 h-4"
          />
          <label htmlFor="lowercase">Include LowerCase</label>
        </div>
        <div className="my-4 rounded-md md:w-[30vw]  h-12  flex items-center gap-4 bg-slate-600 px-2">
          <input
            id="numbers"
            onChange={(e) => {
              setChecks({ ...checks, numbers: e.target.checked });
            }}
            checked={checks.numbers}
            type="checkbox"
            value=""
            className="w-4 h-4"
          />
          <label htmlFor="numbers">Include Numbers</label>
        </div>
        <div className="my-4 rounded-md md:w-[30vw]  h-12  flex items-center gap-4 bg-slate-600 px-2">
          <input
            id="symbols"
            onChange={(e) => {
              setChecks({ ...checks, symbols: e.target.checked });
            }}
            checked={checks.symbols}
            type="checkbox"
            value=""
            className="w-4 h-4"
          />
          <label htmlFor="symbols">Include Symbols</label>
        </div>
        <div className=" flex justify-center mt-8">
          <button
            className=" p-2 bg-blue-700 rounded-md"
            onClick={generatePasswordHandler}
          >
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
