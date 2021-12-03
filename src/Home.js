import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <button type="button">Add portfolio</button>
      <Link to="/portfolio/1">Create</Link>
    </div>
  );
}
