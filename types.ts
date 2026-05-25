
export interface Quiz {
  theme: string;
  optionA: string;
  optionB: string;
}

export interface MoshimoTopic {
  theme:string;
  title: string;
}

export interface ThemeTopic {
  title: string;
}

export interface YesNoTopic {
  title: string;
  genre?: string;
}
