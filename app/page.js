import QuoteDisplay from "./quote-display";
import JokeDisplay from "./joke-display";

export default async function Home() {
  const [quoteResponse, jokeResponse] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quote`, {
      cache: "no-store",
    }),
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/joke`, {
      cache: "no-store",
    }),
  ]);

  const serverQuote = await quoteResponse.json();
  const serverJoke = await jokeResponse.json();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-lg bg-white p-6 rounded-xl shadow-md text-center mb-6">
        <h1 className="text-2xl font-bold">Quote of the Day</h1>
        <QuoteDisplay serverQuote={serverQuote} />
      </div>
      <div className="max-w-lg bg-white p-6 rounded-xl shadow-md text-center">
        <h1 className="text-2xl font-bold">Joke of the Day</h1>
        <JokeDisplay serverJoke={serverJoke} />
      </div>
    </main>
  );
}
