'use client';

import { ReactNode, useContext } from 'react';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';

import { AuthContext } from './authContext';

export default function HomePage() {
  const auth = useContext(AuthContext);

  return (
    <>
      <Container>
        <div className="text-3xl font-bold underline">Hello Home</div>
      </Container>
      <div>heasads2</div>
    </>
  );
}

const Container = styled.div`
  min-height: 100vh;
`;
