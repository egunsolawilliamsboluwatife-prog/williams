import Link from "next/link";

export default function NotFound() {
  return (
    <main className="missing">
      <p className="kicker">Missing reel</p>
      <h1>This frame is empty.</h1>
      <Link className="btn solid" href="/">
        Back to the cut room
      </Link>
    </main>
  );
}
