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
