import { SkillsModel } from "../Model/skills.model.js";

export const CreateSkill=async(req,res)=>{
    try { 
        const {language,color}=req.body;
        
        if(!language || !color){
            return res.status(400).send("All the Details is required")
        }

        const Skills=await SkillsModel.create({language,color});

        if(Skills){
            return res.status(200).json({success:true,data:Skills});
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error,
          });
    }

}
export const EditSkill=async(req,res)=>{
    try { 
        const {_id,language,color}=req.body;
        
        if(!_id){
            return res.status(400).send("_id is required")
        }
        
        const EditData={};
        if(language)EditData.language=language
        if(color)EditData.color=color

        const Skills=await SkillsModel.findByIdAndUpdate(_id,EditData,{
            new:true
        });

        if(Skills){
            return res.status(200).json({success:true,data:Skills});
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error,
          });
    }

}
export const DeleteSkill=async(req,res)=>{
    try { 
        const {_id}=req.params;
        
        if(!_id){
            return res.status(400).send("_id is required")
        }
        const Skills=await SkillsModel.findByIdAndDelete(_id);

        if(Skills){
            return res.status(200).json({success:true,message:"Skill deleted successfully"});
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error,
          });
    }

}
export const GetSkill=async(req,res)=>{
    try { 
        const Skills=await SkillsModel.find(_id);

        if(Skills){
            return res.status(200).json({success:true,message:Skills});
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error,
          });
    }

}