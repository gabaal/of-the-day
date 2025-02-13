"use client";
import { useEffect, useState } from "react";

export default function JokeDisplay({ serverJoke }) {
  const [joke, setJoke] = useState(null);

  useEffect(() => {
    try {
      const storedJoke = localStorage.getItem("dailyJoke");
      const storedDate = localStorage.getItem("jokeDate");
      const today = new Date().toISOString().split("T")[0];

      if (storedJoke && storedDate === today) {
        setJoke(JSON.parse(storedJoke));
      } else {
        setJoke(serverJoke);
        localStorage.setItem("dailyJoke", JSON.stringify(serverJoke));
        localStorage.setItem("jokeDate", today);
      }
    } catch (error) {
      console.error("Error parsing stored joke:", error);
      setJoke(serverJoke);
    }
  }, [serverJoke]);

  if (!joke) return <p className="mt-4 text-gray-500">Loading...</p>;

  return <p className="mt-4 text-lg">&ldquo;{joke.joke}&rdquo;</p>;
}
