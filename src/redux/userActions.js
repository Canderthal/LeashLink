import { createAction } from "@reduxjs/toolkit";

export const loginUser = createAction("user/login");
export const logoutUser = createAction("user/logout");
export const registerUser = createAction("user/register");