import React, { useState } from "react";
import { signUpAPI, verifyEmailAPI } from "../service/api";

export interface ISignUpStateType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IVerifyInputStateType {
  statusCode: boolean | number;
  verifyOTPInput: string;
}

export interface IVerifyOTPandEmailParams {
  verifyOTPInput: string;
  email: string;
}

const SignUp = () => {
  const [verifyInput, setVerifyInput] = useState<IVerifyInputStateType>({
    statusCode: false,
    verifyOTPInput: "",
  });
  const [signUpInput, setSignUpInput] = useState<ISignUpStateType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSignUpInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpInput({ ...signUpInput, [e.target.name]: e.target.value });
  };

  const handleVerifyOTPInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerifyInput({ ...verifyInput, [e.target.name]: e.target.value });
  };

  const handleVerifyEmail = async () => {
    await verifyEmailAPI({
      verifyOTPInput: verifyInput.verifyOTPInput,
      email: signUpInput.email,
    });
  };

  const handleSignUp = async () => {
    const result = await signUpAPI(signUpInput);
    console.log(result);
    if (result.statusCode === 200) {
      setVerifyInput({ ...verifyInput, statusCode: true });
      return;
    }
    alert(result.message);
  };

  return (
    <div style={{ marginLeft: "100px", marginTop: "100px" }}>
      <h2>Sign Up</h2>
      <div style={{ display: "flex", flexDirection: "column", width: "250px" }}>
        <input
          placeholder="First Name"
          name="firstName"
          value={signUpInput.firstName}
          onChange={handleSignUpInput}
        />
        <input
          placeholder="Last Name"
          name="lastName"
          value={signUpInput.lastName}
          onChange={handleSignUpInput}
        />
        <input
          placeholder="Email"
          name="email"
          value={signUpInput.email}
          onChange={handleSignUpInput}
        />
        <input
          placeholder="Password"
          name="password"
          value={signUpInput.password}
          onChange={handleSignUpInput}
        />
        <button onClick={handleSignUp}>Create Account</button>
      </div>
      {verifyInput.statusCode && (
        <div>
          <input
            placeholder="Verify 4 digits OTP"
            name="verifyOTPInput"
            value={verifyInput.verifyOTPInput}
            onChange={handleVerifyOTPInput}
          />
          <button onClick={handleVerifyEmail}>Verify</button>
        </div>
      )}
    </div>
  );
};

export default SignUp;
