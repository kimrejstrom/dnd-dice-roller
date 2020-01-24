import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga';
import { Dice } from 'vendor/nicer-dicer-engine';
import { Alert } from 'components/Alert/Alert';
import { RollResult } from 'features/rollResult/RollResult';
import { useDispatch, useSelector } from 'react-redux';
import { addRoll, setCurrentRoll } from 'features/rollInput/rollInputSlice';
import { RollList } from 'features/rollList/RollList';
import { RootState } from 'app/rootReducer';
import { useQuery } from 'utils/customHooks';
import { useHistory } from 'react-router-dom';

export const RollInput = () => {
  const dispatch = useDispatch();

  const [result, setResult] = useState();
  const [error, setError] = useState();

  // Get currentRoll from Redux
  const { currentRoll, rolls } = useSelector((state: RootState) => state.rolls);
  const query = useQuery();
  const history = useHistory();

  useEffect(() => {
    const rollQuery = query.get('roll');
    if (rollQuery && !rolls.length) {
      const queryRoll = decodeURIComponent(rollQuery);
      dispatch(setCurrentRoll(queryRoll));
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dice = new Dice(undefined, undefined, {
      renderExpressionDecorators: true,
    });
    try {
      const rollResult = dice.roll(currentRoll);
      setResult(rollResult);
      setError(undefined);
      dispatch(addRoll(currentRoll));
      ReactGA.event({
        category: 'Roll',
        action: 'Roll Submit',
        transport: 'beacon',
      });
      history.push(`/roller?roll=${encodeURIComponent(currentRoll)}`);
    } catch (error) {
      setError(error);
    }
  };

  // Render
  return (
    <div className="m-auto py-4">
      <div className="flex flex-col items-center">
        <form className="text-center w-full" onSubmit={handleSubmit}>
          <label className="text-3xl">
            Enter formula
            <input
              className="text-lg w-full appearance-none text-sm font-mono flex bg-secondary-dark text-white text-center font-bold py-2 px-4 rounded mt-2 border border-yellow-700 focus:outline-none focus:border-yellow-400"
              type="text"
              value={currentRoll}
              onChange={e => dispatch(setCurrentRoll(e.target.value))}
            />
          </label>
          <input
            className="hover:bg-secondary-dark bg-transparent w-full text-2xl text-white py-1 mt-2 px-4 border border-yellow-700 rounded"
            type="submit"
            value="Roll"
          />
        </form>
        <div className="w-full text-wrap">
          {error ? (
            <div className="font-mono mb-6 m-auto">
              <Alert title={'Something went wrong'} body={error.message} />
            </div>
          ) : (
            <>
              <RollResult result={result} />
              <RollList />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
