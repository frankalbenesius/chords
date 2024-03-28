import React, { useReducer } from "react";

const scales = [
  "C",
  "G",
  "D",
  "A",
  "E",
  "B/C♭",
  "F♯/G♭",
  "C♯/D♭",
  "A♭",
  "E♭",
  "B♭",
  "F",
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
};

type Reducer = (state: State, action: Action) => State;

const reducer: Reducer = (state, action) => {
  switch (action.type) {
    case "RANDOMIZE": {
      const randomState = getRandomState();
      return {
        ...state,
        ...randomState,
      };
    }
    default:
      return state;
  }
};

const getRandomState = (): State => {
  const progression: Chord[] = ["I"];

  const getRandomChord = ({ exclude }: { exclude: Chord[] }): Chord => {
    let eligibleChords = chords.filter((chord) => !exclude.includes(chord));
    if (Math.random() > 0.3) {
      eligibleChords = eligibleChords.filter((chord) => chord !== "vii°");
    }
    const randomChord =
      eligibleChords[Math.floor(Math.random() * eligibleChords.length)];
    return randomChord;
  };

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

export default function App() {
  const [state, dispatch] = useReducer<Reducer>(reducer, getRandomState());

  const randomize = () => {
    dispatch({
      type: "RANDOMIZE",
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

const KeySection: React.FC<{
  scale: Scale;
}> = ({ scale }) => {
  return (
    <section className="section key">
      <div className="content">{scale}</div>
      <div className="label">key</div>
    </section>
  );
};

const ProgressionSection: React.FC<{
  progression: Chord[];
}> = ({ progression }) => {
  return (
    <section className="section progression">
      <div className="content">
        {progression.map((chord, index) => (
          <div key={index} className="chord">
            {chord}
          </div>
        ))}
      </div>
      <div className="label">progression</div>
    </section>
  );
};
