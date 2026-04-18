export const CreateSkillSlice=(set)=>({
    skill:[],
    setSkill:(skill)=>set({skill}),

    addSkills:(newSkill)=>
        set((state)=>{
            if(state.skill.some((item)=>item._id===newSkill._id)) return state;
            return {skill:[...state.skill,newSkill]}
        }),
    updateSkill:(_id,updateSkill)=>
        set((state)=>({
            skill:state.skill.map((item)=>
            item._id===_id? updateSkill:item
        ),
        })),
        removeSkill:(_id)=>
            set((state)=>({
                skill:state.skill.filter((item)=>item._id !== _id)
            }))
})