import React from 'react';
import dict from '@asl/dictionary';
import JoinAcronyms from '../views/components/join-acronyms';

export const joinAcronyms = val => <JoinAcronyms>{ val }</JoinAcronyms>;

export const labelFromCode = value => ({
  label: `${dict[value.toUpperCase()]} (${value.toUpperCase()})`,
  value: value.toUpperCase()
});

export const define = arr => (
  <ul>
    {
      arr.map((val, key) =>
        <li key={key}>{`${dict[val]} (${val})`}</li>
      )
    }
  </ul>
);
