'use client';
import React from 'react';
import SearchForm from './SearchForm';
import Sort from './Sort';

const Feature = ({}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        margin: '30px 0',
      }}
    >
      <SearchForm />
      <Sort />
    </div>
  );
};
export default Feature;
