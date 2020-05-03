/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */

import React from 'react';
import { IRepositoryNode, ILanguage } from '../interfaces/IUser';


function flatten<T, U >(arr:Array<T>): Array<U> {
  return arr.reduce((flat: Array<U>, toFlatten: any) => flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten), []);
}


const Chart = ({ repositories, totalCount }: {repositories: Array<IRepositoryNode>, totalCount: number }): JSX.Element => {
  const languageEdges = repositories.reduce((acc: Array<ILanguage[]>, val: IRepositoryNode) => {
    acc.push(val.node.languages.edges);
    return acc;
  }, []);

  const allLanguageNodes: ILanguage[] = flatten(languageEdges);

  const languagesPerRepository = allLanguageNodes.reduce((acc:any, obj:ILanguage) => {
    const key = obj.node.name;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});

  // Remove language bugs from result as Hack
  delete languagesPerRepository.Hack;


  return (
    <>
      {Object.keys(languagesPerRepository).map((key: string, index: number) => {
        const procentage = (languagesPerRepository[key]).length / (totalCount / 100);
        return (

          <p key={index}>
            {key}
            {' '}
            {procentage}
          </p>
        );
      })}
    </>

  );
};


export default Chart;
