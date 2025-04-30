import { create } from "zustand";
import {persist} from 'zustand/middleware'
import { CreateAuthSlice } from "./Slice/Auth.Slice";
import { CreateProgressSlice } from "./Slice/Progress.slice";
import { CreateLanguageSlice } from "./Slice/Language.slice";
import { CreateSkillSlice } from "./Slice/Skill.slice";
import { CreateNoteSlice } from "./Slice/Notes.slice";
import { CreateProjectSlice } from "./Slice/Project.Slice";

export const useAppStore=create(
    persist(
        (set,get)=>({
            ...CreateNoteSlice(set,get),
            ...CreateSkillSlice(set,get),
            ...CreateLanguageSlice(set,get),
            ...CreateAuthSlice(set,get),
            ...CreateProgressSlice(set,get),
            ...CreateProjectSlice(set,get)
        }),
        {
            name:'auth-storage',
            getStorage:()=>localStorage
        }
    )
)