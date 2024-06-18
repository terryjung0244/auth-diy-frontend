import React, { useState } from "react";
import { resendOTPAPI, signUpAPI, verifyEmailAPI } from "../service/api";
import { ISignUpStateType, IVerifyInputStateType } from "./SignUp.interface";

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
    const result = await verifyEmailAPI({
      verifyOTPInput: verifyInput.verifyOTPInput,
      email: signUpInput.email,
    });
    alert(result.message);
  };

  const handleCreateAccount = async () => {
    const result = await signUpAPI(signUpInput);
    if (result.statusCode === 200) {
      setVerifyInput({ ...verifyInput, statusCode: true });
      return;
    }
    alert(result.message);
  };

  const handleResendOTP = async () => {
    const result = await resendOTPAPI({
      verifyOTPInput: verifyInput.verifyOTPInput,
      email: signUpInput.email,
    });
    alert(result.message);
  };

  return (
    <div style={{ marginLeft: "100px", marginTop: "100px" }}>
      <h2>Sign Up</h2>
      {/* <button onClick={}>Delete All Data</button> */}
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
        <button onClick={handleCreateAccount}>Create Account</button>
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
          <button onClick={handleResendOTP}>Resend OTP</button>
        </div>
      )}
    </div>
  );
};

export default SignUp;
