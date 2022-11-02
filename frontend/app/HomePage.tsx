'use client';

import { useContext } from 'react';

import { AuthContext } from './authContext';

export default function HomePage() {
  const auth = useContext(AuthContext);

  return <div>Hello Home</div>;
}
