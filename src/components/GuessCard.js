// @flow

import React from 'react'
import type { Card } from '../reducers/initialState'
import { addHiddenClass } from '../utils/index'
import type {
  StartGame,
  UpdateGuess,
  NextCard,
  ShowScore
} from '../actions/index'

const GuessCard = ({
  current,
  guess,
  apiUrl,
  deckLegth,
  loading,
  startGame,
  updateGuess,
  nextCard,
  showScore
}: {
  apiUrl: string,
  current: Card,
  guess: string,
  deckLegth: number,
  loading: boolean,
  startGame: () => StartGame,
  updateGuess: () => UpdateGuess,
  nextCard: () => NextCard,
  showScore: () => ShowScore
}) => {
  const nextVisible = (deckLegth > 0)
  const startVisible = (
    Object.keys(current).length === 0 && current.constructor === Object
  )
  const inputProps = {
    value: guess,
    onChange: updateGuess,
    className: addHiddenClass(!startVisible, 'GuessCard-input'),
    type: 'text',
    autoFocus: 'autofocus',
    placeholder: 'e.g. Hank'
  }
  const nextButtonProps = {
    disabled: (guess.length === 0),
    className: addHiddenClass((nextVisible && !startVisible), 'GuessCardButton GuessCardButton-next'),
    onClick: nextCard
  }

  const startButtonProps = {
    className: addHiddenClass(startVisible, 'GuessCardButton GuessCardButton-start'),
    onClick: startGame,
    disabled: loading
  }
  const showScoreButtonProps = {
    className: addHiddenClass((!startVisible && !nextVisible), 'GuessCardButton GuessCardButton-score'),
    onClick: showScore
  }

  return (
    <article className='GuessCard-article'>
      <img className='GuessCard-image' src={`${apiUrl}/images/${current.picture}`} />
      <input {...inputProps} />
      <div className='GuessCard-buttons'>
        <button {...nextButtonProps}> Next ></button>
        <button {...startButtonProps}> Start!</button>
        <button {...showScoreButtonProps}> Last one!</button>
      </div>
    </article>
  )
}

export default GuessCard
