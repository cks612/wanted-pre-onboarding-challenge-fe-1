export interface elementType {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  selectors: string[];
  type: string;
}

export interface Props {
  isCorrect: boolean;
  resultStyle: string;
  disabled: boolean;
}

export type queryDataType = {
  data: queryDataType2;
};

type queryDataType2 = {
  results: elementType[];
};

export interface ChartType {
  id: string;
  label: string;
  value: number;
  color: string;
}

export interface ButtonType {
  id: number;
  data: string;
}
