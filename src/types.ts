export interface Login {
  email: string;
  password: string;
}
export interface TextProps {
  isValid: boolean;
}
export interface elementType {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type queryDataType = {
  data: queryDataType2;
};

type queryDataType2 = {
  data: elementType;
};
