export interface IResume {
  CV: string;
}

export interface AddCVRequestBody {
  CV: string;
}

export interface UpdateCVRequestBody {
  _id: string;
  CV: string;
}
