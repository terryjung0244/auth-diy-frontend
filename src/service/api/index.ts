import {
  ISignUpStateType,
  IVerifyOTPandEmailParams,
} from "../../signUp/SignUp.interface";

export const signUpAPI = async (signUpInput: ISignUpStateType) => {
  const response = await fetch("http://localhost:9010/auth/signUp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signUpInput),
  });
  const result = response.json();
  return result;
};

export const verifyEmailAPI = async ({
  verifyOTPInput,
  email,
}: IVerifyOTPandEmailParams) => {
  console.log(verifyOTPInput, email);
  const response = await fetch("http://localhost:9010/auth/verifyEmail", {
    method: "POST", // Security data
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      verifyOTPInput,
      email,
    }),
  });
  const result = response.json();
  return result;
};

export const resendOTPAPI = async ({
  verifyOTPInput,
  email,
}: IVerifyOTPandEmailParams) => {
  const response = await fetch("http://localhost:9010/auth/resendOTP", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      verifyOTPInput,
      email,
    }),
  });
  const result = response.json();
  return result;
};
