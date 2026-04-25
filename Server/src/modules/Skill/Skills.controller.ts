import { SkillsModel } from './skills.model.ts';
import type { Request, Response } from 'express';
import type {
    CreateSkillRequestBody,
    DeleteSkillRequestParams,
    EditSkillRequestBody,
    UpdateSkillData,
} from '@type';

const toErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }

    return String(error);
};

export const CreateSkill = async (
    req: Request<Record<string, never>, unknown, CreateSkillRequestBody>,
    res: Response,
) => {
    try { 
        const {language,color,percentage}=req.body;
        
        if(!language || !color || !percentage){
            return res.status(400).send("All the Details is required")
        }

        const Skills=await SkillsModel.create({language,color,percentage});

        if(Skills){
            return res.status(200).json({success:true,data:Skills});
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: toErrorMessage(error),
          });
    }

}
export const EditSkill = async (
    req: Request<Record<string, never>, unknown, EditSkillRequestBody>,
    res: Response,
) => {
    try { 
        const {_id,language,color,percentage}=req.body;
        
        if(!_id){
            return res.status(400).send("_id is required")
        }
        
        const EditData: UpdateSkillData = {};
        if(language)EditData.language=language
        if(color)EditData.color=color
        if(percentage !== undefined)EditData.percentage=percentage

        const Skills=await SkillsModel.findByIdAndUpdate(_id,EditData,{
            new:true
        });

        if(Skills){
            return res.status(200).json({success:true,data:Skills});
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: toErrorMessage(error),
          });
    }

}
export const DeleteSkill = async (
    req: Request<DeleteSkillRequestParams>,
    res: Response,
) => {
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
            message: toErrorMessage(error),
          });
    }

}
export const GetSkill = async (_req: Request, res: Response) => {
    try { 
        const Skills=await SkillsModel.find();

        if(Skills){
            return res.status(200).json({success:true,data:Skills});
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
                        message: toErrorMessage(error),
          });
    }

}