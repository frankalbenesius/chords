import React, { useReducer } from "react";

const Scale = {
  C: 0,
  "C♯/D♭": 1,
  D: 2,
  "D♯/E♭": 3,
  E: 4,
  F: 5,
  "F♯/G♭": 6,
  G: 7,
  "G♯/A♭": 8,
  A: 9,
  "A♯/B♭": 10,
  B: 11,
} as const;
type Scale = (typeof Scale)[keyof typeof Scale];

const MajorChord = {
  I: 0,
  ii: 1,
  iii: 2,
  IV: 3,
  V: 4,
  vi: 5,
  "vii°": 6,
} as const;
type MajorChord = (typeof MajorChord)[keyof typeof MajorChord];

type State = {
  scale: Scale;
  progression: MajorChord[];
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

export default function App() {
  const [state, dispatch] = useReducer<Reducer>(reducer, {
    scale: Scale.C,
    progression: [MajorChord.I, MajorChord.I, MajorChord.I, MajorChord.I],
  });

  return (
    <main>
      <div className="sections">
        <KeySection scale={state.scale} />
        <ProgressionSection />
        <button
          type="button"
          onClick={() =>
            dispatch({
              type: "RANDOMIZE",
              payload: {
                scale: Math.floor(Math.random() * 12) as Scale,
                progression: [
                  MajorChord.I,
                  MajorChord.I,
                  MajorChord.I,
                  MajorChord.I,
                ].map(() => Math.floor(Math.random() * 7) as MajorChord),
              },
            })
          }
        >
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

const ProgressionSection = () => {
  return (
    <section className="section progression">
      <div className="content">{MajorChord["vii°"]}</div>
      <div className="label">progression</div>
    </section>
  );
};
