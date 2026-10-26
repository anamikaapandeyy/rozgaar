import Button from '../components/Button';
import usePageTitle from '../hooks/usePageTitle';

export default function NotFound() {
  usePageTitle('Page not found');

  return (
    <section className="container" style={{ paddingBlock: '4rem', textAlign: 'center' }}>
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Button to="/">Go home</Button>
    </section>
  );
}