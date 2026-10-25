import Button from '../components/Button';
import Card from '../components/Card';
import './Home.css';

const features = [
  { icon: '🎯', title: 'Matched to you', text: 'Answer a short quiz about your interests and skills and get careers that actually fit.' },
  { icon: '🗺️', title: 'A clear roadmap', text: 'See what to learn, in what order, and how long each step usually takes.' },
  { icon: '🏢', title: 'Real expectations', text: 'Know the salary range, entrance exams, and companies that hire for each role.' },
];

const steps = [
  'Tell us where you are',
  'Pick your interests and skills',
  'Get your matches and roadmap',
];

export default function Home() {
  return (
    <>
      <section className="hero container">
        <h1>Feeling lost about your career? Start here.</h1>
        <p>
          Whether you just finished 12th or you're rethinking your path,
          Rozgaar turns "I don't know what to do" into a step-by-step plan.
        </p>
        <div className="hero-actions">
          <Button to="/quiz">Take the quiz</Button>
          <Button to="/browse" variant="outline">Browse careers</Button>
        </div>
      </section>

      <section className="container section" aria-labelledby="features-title">
        <h2 id="features-title">Why Rozgaar</h2>
        <div className="grid">
          {features.map((f) => (
            <Card key={f.title} icon={f.icon} title={f.title}>{f.text}</Card>
          ))}
        </div>
      </section>

      <section className="container section" aria-labelledby="how-title">
        <h2 id="how-title">How it works</h2>
        <ol className="steps">
          {steps.map((s) => <li key={s}>{s}</li>)}
        </ol>
      </section>
    </>
  );
}