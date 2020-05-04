export interface IRepositoryInfo {
  description: string;
  id: string;
  name: string;
  url: string;
  issues: {
    totalcount: number;
  },
  watchers: {
    totalCount: number
  },
  stargazers: {
    totalCount: number
  }
}

export interface IRepository{
  cursor: string;
  node: IRepositoryInfo;
}

export interface IPageInfo{
  startCursor: string;
  hasNextPage: boolean;
  endCursor: string;
}

export interface ISearch{
  search : {
    repositoryCount: number;
    pageInfo : IPageInfo;
    edges:IRepository[];
  }
}
