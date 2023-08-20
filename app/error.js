'use client';
import React from 'react';

const Error = ({ error, reset }) => {
  return (
    <div>
      <h1>{error.message}</h1>
      <button type="button" onClick={reset}>
        Try Again
      </button>
    </div>
  );
};

export default Error;
