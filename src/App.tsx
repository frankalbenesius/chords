import React, { useReducer } from "react";

const scales = [
  "C",
  "C♯/D♭",
  "D",
  "D♯/E♭",
  "E",
  "F",
  "F♯/G♭",
  "G",
  "G♯/A♭",
  "A",
  "A♯/B♭",
  "B",
] as const;
type Scale = (typeof scales)[number];

const chords = ["I", "ii", "iii", "IV", "V", "vi", "vii°"] as const;
type Chord = (typeof chords)[number];

type State = {
  scale: Scale;
  progression: Chord[];
};

type Action = {
  type: "RANDOMIZE";
  payload: State;
};

type Reducer = (state: State, action: Action) => State;

const reducer: Reducer = (state, action) => {
  switch (action.type) {
    case "RANDOMIZE":
      return {
        ...state,
        scale: action.payload.scale,
        progression: action.payload.progression,
      };
    default:
      return state;
  }
};

const getRandomState = (): State => {
  const progression: Chord[] = ["I"];

  for (let i = 0; i < 3; i++) {
    progression.push(getRandomChord({ exclude: progression }));
  }

  if (Math.random() > 0.5) {
    progression.reverse();
  }

  return {
    scale: scales[Math.floor(Math.random() * scales.length)],
    progression: progression,
  };
};

const getRandomChord = ({ exclude }: { exclude: Chord[] }): Chord => {
  const eligibleChords = chords.filter((chord) => !exclude.includes(chord));
  return eligibleChords[Math.floor(Math.random() * eligibleChords.length)];
};

export default function App() {
  const [state, dispatch] = useReducer<Reducer>(reducer, getRandomState());

  const randomize = () => {
    dispatch({
      type: "RANDOMIZE",
      payload: getRandomState(),
    });
  };

  return (
    <main>
      <div className="sections">
        <KeySection scale={state.scale} />
        <ProgressionSection progression={state.progression} />
        <button type="button" onClick={randomize}>
          Randomize
        </button>
      </div>
    </main>
  );
}

const SHARP = "♯";
// const FLAT = "♭";

const KeySection: React.FC<{
  scale: Scale;
}> = ({ scale }) => {
  return (
    <section className="section key">
      <div className="content">
        {scale}
        <span className="modifier">{SHARP}</span>
      </div>
      <div className="label">key</div>
    </section>
  );
};

const ProgressionSection: React.FC<{
  progression: Chord[];
}> = ({ progression }) => {
  return (
    <section className="section progression">
      <div className="content">{progression.join(" - ")}</div>
      <div className="label">progression</div>
    </section>
  );
};
