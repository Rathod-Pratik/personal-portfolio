type AdminSkillItem = {
  _id?: string;
  language: string;
  percentage: number | string;
  color: string;
  createdAt?: string;
  updatedAt?: string;
};

type SkillFormData = {
  _id: string | null;
  language: string;
  percentage: string;
  color: string;
};

type CreateOrUpdateSkillPayload = {
  _id?: string;
  language: string;
  percentage: number;
  color: string;
};

export type { AdminSkillItem, SkillFormData, CreateOrUpdateSkillPayload };
