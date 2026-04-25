export const HOST = import.meta.env.VITE_API_HOST;

export const LOGIN = "auth/login";
export const LOGIN_VERIFY_OTP = "auth/login-verify";
export const LOGOUT = "auth/logout";
export const FORGOT_PASSWORD = "auth/forgot-password";
export const VERIFY_OTP = "auth/verify-otp";
export const RESET_PASSWORD = "auth/reset-password";
export const CONTECT_fORM = `${HOST}/api/form`;

export const FETCH_PDF = `${HOST}/api/pdf`;
export const FETCH_PROJECT = `${HOST}/api/project/code`;
export const FETCH_CODE = `${HOST}/api/project/code`;

export const GET_LANGUAGE = "language/getlanguage";
export const CREATE_LANGUAGE = "language/createlanguage";
export const UPDATE_LANGUAGE = "language/editlanguage";
export const DELETE_LANGUAGE = "language/deletelanguage";

export const CREATE_SKILL = "skills/createskill";
export const GET_SKILL = "skills/getskills";
export const UPDATE_SKILL = "skills/editskills";
export const DELETE_SKILL = "skills/deleteskill";

export const GET_NOTES = "note/getnotes";
export const CREATE_NOTES = "note/createNote";
export const EDIT_NOTES = "note/editNote";
export const DELETE_NOTES = "note/deleteNote";

export const GET_CONTACT = "contact/getcontact";
export const CREATE_CONTACT = "contact/createcontact";
export const DELETE_CONTACT = "contact/deletecontact";

export const GET_CV = "CV/GetCV";
export const CREATE_CV = "CV/AddCV";
export const UPDATE_CV = "CV/UpdateCV";

export const CREATE_PROJECT = "project/createProject";
export const GET_PROJECT = "project/getProject";
export const EDIT_PROJECT = "project/editProject";
export const DELETE_PROJECT = "project/deleteProject";
export const GET_PROJECT_DATA = "project/projectdata";

export const CREATE_BLOG = "blogs/create";
export const GET_BLOG = "blogs/get";
export const GET_BLOG_DETAILS = "blogs";
export const UPDATE_BLOG = "blogs";
export const DELETE_BLOG = "blogs";

export const GET_ADMIN_DETAIL = "states";
export const INCREMENT_VIEW_URL = "states/view";

export const CREATE_EXPERIENCE = "experiences";
export const GET_EXPERIENCE = "experiences";
export const GET_EXPERIENCE_DETAILS = "experiences";
export const UPDATE_EXPERIENCE = "experiences";
export const DELETE_EXPERIENCE = "experiences";

export const GET_HERO = "hero";
export const UPDATE_HERO = "hero";

export const CREATE_EXPERTISE = "expertise";
export const GET_EXPERTISE = "expertise";
export const UPDATE_EXPERTISE = "expertise";
export const DELETE_EXPERTISE = "expertise";

export const GET_ABOUT = "about";
export const UPDATE_ABOUT = "about";
