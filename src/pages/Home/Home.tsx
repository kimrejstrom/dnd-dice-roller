import React from 'react';
import { Link } from 'react-router-dom';
import { Dice } from 'components/Dice/Dice';

export const Home: React.FC = () => {
  return (
    <div className="container mx-auto mt-8 max-w-xs p-4">
      <div className="text-center">
        <div className="text-white text-xl pb-4">
          The Ultimate RPG Dice Roller
        </div>
        <Dice />
        <p className="mx-auto w-full mb-6">
          The dice roller is very easy to use, simply type in the formula in the
          box and press enter. Nicer Dicer features support for a wide array of
          dice mechanics. For the complete list of available commands, visit the{' '}
          <Link className="text-yellow-500" to="/about">
            Help
          </Link>{' '}
          page.
        </p>
        <Dice />
        <Link
          to="roller"
          className="bg-transparent text-lg text-yellow-500 py-2 px-4 border border-yellow-700 rounded"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};
