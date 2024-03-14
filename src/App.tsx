export default function App() {
  return (
    <main>
      <div className="sections">
        <KeySection />
        <ProgressionSection />
      </div>
    </main>
  );
}

const SHARP = "♯";
const FLAT = "♭";

const KeySection = () => {
  return (
    <section className="section key">
      <div className="content">
        C<span className="modifier">{SHARP}</span>
      </div>
      <div className="label">key</div>
    </section>
  );
};

const ProgressionSection = () => {
  return (
    <section className="section progression">
      <div className="content">I - iii - IV - vi</div>
      <div className="label">progression</div>
    </section>
  );
};
