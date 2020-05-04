/* eslint-disable max-len */

import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import styled from 'styled-components';
import { IRepositoryNode, ILanguage } from '../interfaces/IUser';


const Heading = styled.h2`
  color: ${({ theme }): string => theme.accent};
  font-family: ${({ theme }): string => theme.fonts.heading};
  align-self: center;
  text-align: center;
`;

const ChartContainer = styled.div`
    display: flex;
    align-items: flex-end;
    &:first-chid{
      flex: 1;
      height: 350px;
    }
`;

const LabelContainer = styled.div`
  margin-left: ${({ theme }): string => theme.space[2]};
  flex: 1;
`;

const FlexContainer = styled.div`
  display:  flex; 
  align-items: flex-end;
  margin: ${({ theme }): string => theme.space[0]};
  p{
      margin: 0 12px;
  }

`;

const ColorContainer = styled.div`
  height: ${({ theme }): string => theme.space[2]};
  width: ${({ theme }): string => theme.space[2]};
  background-color: ${(props): string | undefined => props.color};
  border: 1px solid  ${({ theme }): string => theme.white};
`;

function flatten<T, U >(arr:Array<T>): Array<U> {
  return arr.reduce((flat: Array<U>, toFlatten: any) => flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten), []);
}

const Chart = ({ repositories, totalCount }: {repositories: Array<IRepositoryNode>, totalCount: number }): JSX.Element => {
  const languageEdges = repositories.reduce((acc: Array<ILanguage[]>, val: IRepositoryNode) => {
    acc.push(val.node.languages.edges);
    return acc;
  }, []);

  const allLanguageNodes: ILanguage[] = flatten(languageEdges);

  const languagesPerRepository = allLanguageNodes.reduce((acc: any, obj:ILanguage) => {
    const key = obj.node.name;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});

  // Remove language bugs from results (Hack, Smarty)
  delete languagesPerRepository.Hack;
  delete languagesPerRepository.Smarty;

  // Find percentile of languages used in all repositories
  // Create data for pieChart based on color and percentage of each language
  // Data model : {title: string, value, string, color: HEX as string }
  const chartpieData = Object.keys(languagesPerRepository).map((key: string) => ({ title: key, value: Math.round((languagesPerRepository[key]).length / (totalCount / 100)), color: languagesPerRepository[key][0].node.color }));

  return (
    <div>
      <Heading> Repos per Language </Heading>
      <ChartContainer>
        <div>

          <PieChart
            data={chartpieData}
            animate
            animationDuration={500}
            animationEasing="ease-out"
            center={[
              50,
              50,
            ]}
            label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
            labelStyle={{
              fill: '#F8DE92',
              fontFamily: 'sans-serif',
              fontSize: '6px',
            }}
            labelPosition={70}
            lengthAngle={360}
            lineWidth={15}
            paddingAngle={5}
            radius={50}
            startAngle={0}
            viewBoxSize={[
              100,
              100,
            ]}
          />
        </div>
        <LabelContainer>
          {chartpieData.map((label, index) => (
            <FlexContainer key={index}>
              <ColorContainer color={label.color} />
              <p>{label.title}</p>
            </FlexContainer>
          ))}
        </LabelContainer>
      </ChartContainer>
    </div>
  );
};


export default Chart;
