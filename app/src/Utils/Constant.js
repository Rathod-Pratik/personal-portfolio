export const  HOST= import.meta.env.VITE_API_HOST;

export const LOGIN='auth/login'
export const CONTECT_fORM=`${HOST}/api/form`;
export const FETCH_PDF=`${HOST}/api/pdf`;
export const FETCH_PROJECT=`${HOST}/api/project/code`;
export const FETCH_CODE=`${HOST}/api/project/code`;

export const GET_LANGUAGE='language/getlanguage'
export const CREATE_LANGUAGE='language/createlanguage'
export const UPDATE_LANGUAGE='language/editlanguage'
export const DELETE_LANGUAGE='language/deletelanguage'

export const CREATE_SKILL='skills/createskill'
export const GET_SKILL='skills/getskills'
export const UPDATE_SKILL='skills/editskills'
export const DELETE_SKILL='skills/deleteskill'

export const GET_NOTES='note/getnotes'
export const CREATE_NOTES='note/createNote'
export const EDIT_NOTES='note/editNote'
export const DELETE_NOTES='note/deleteNote'

export const GET_CONTACT='contact/getcontact'
export const CREATE_CONTACT='contact/createcontact'
export const DELETE_CONTACT='contact/deletecontact'

export const GET_CV='CV/GetCV'
export const CREATE_CV='CV/AddCV'
export const UPDATE_CV='CV/UpdateCV'

export const CREATE_PROJECT='project/createProject'
export const GET_PROJECT='project/getProject'
export const EDIT_PROJECT='project/editProject'
export const DELETE_PROJECT='project/deleteProject'
export const GET_PROJECT_DATA='project/projectdata'

export const CREATE_CODE='code/createCodeData'
export const GET_CODE='code/Getcode'
export const UPDATE_CODE='code/editcodeData'
export const DELETE_CODE='code/deleteCodeData'