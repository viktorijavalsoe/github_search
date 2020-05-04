
export interface IContributionCalendar {
  colors: Array<string>;
  totalContributions: number;
}

export interface ILanguage{
  node: {
    name: string;
    color: string;
  }
}

export interface ILanguages {
  edges: Array<ILanguage>
}

export interface IRepositoryNode{
  node: {
    languages: ILanguages
  }
}

export interface IUserInfo {
  id: string;
  bio: string;
  createdAt: string;
  repositories: {
    totalCount: number;
    name: string;
    edges: Array <IRepositoryNode>
  };
//   contributionsCollection: {
//     contributionCalendar: IContributionCalendar;
//   };
}

export interface IUser{
  node: IUserInfo;
}
