import styled from 'styled-components';
import { ReactElement, ReactNode } from 'react';
import tw from 'tailwind-styled-components';

function Box({ children }: { children: ReactNode }) {
  return <div className="h-10 w-full bg-red-300">{children}</div>;
}

const StyledBox = tw.div<{ $primary: boolean }>`
  ${(p) => (p.$primary ? 'bg-green-600' : 'bg-green-300')}
  h-10
  w-full
`;

const BasicStyledBox = styled.div`
  width: 100%;
  height: 2.5rem;
  background-color: yellow;
`;

export default function Home() {
  return (
    <div className="w-full h-screen bg-cyan-400">
      <div className="grid grid-cols-3 gap-4">
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
        <StyledBox $primary={true}>4</StyledBox>
        <BasicStyledBox>5</BasicStyledBox>
      </div>
    </div>
  );
}
