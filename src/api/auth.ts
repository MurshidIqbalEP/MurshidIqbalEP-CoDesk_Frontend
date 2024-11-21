import errorHandle from "./error";
import Api from "../services/axios";
import authRoutes from "../services/endpoints/auth";

export const sign_up = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    let response = await Api.post(authRoutes.signup, {
      name,
      email,
      password,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const submitOtp = async (email:string,otp:string)=>{
  try {

    let response = await Api.post(authRoutes.submitOtp, {
      otp,
      email,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}

export const resentOtp = async (email:string)=>{
  try {

    let response = await Api.post(authRoutes.resendOtp, {
      email,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}

export const login = async (email:string,password:string)=>{
  try {

    let response = await Api.post(authRoutes.login, {
      email,password
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}

export const logout = async ()=>{
  try {
    let response = await Api.post(authRoutes.logout);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
}