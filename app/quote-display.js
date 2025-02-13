"use client";
import { useEffect, useState } from "react";

export default function QuoteDisplay({ serverQuote }) {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    try {
      const storedQuote = localStorage.getItem("dailyQuote");
      const storedDate = localStorage.getItem("quoteDate");
      const today = new Date().toISOString().split("T")[0];

      if (storedQuote && storedDate === today) {
        // If storedQuote is not a valid string, use an empty object or a default quote
        const parsedQuote = storedQuote
          ? JSON.parse(storedQuote)
          : { quote: "Default Quote", author: "Anonymous" };

        // Ensure the parsedQuote has the expected structure
        if (parsedQuote && parsedQuote.quote && parsedQuote.author) {
          setQuote(parsedQuote);
        } else {
          setQuote(serverQuote);
          localStorage.setItem("dailyQuote", JSON.stringify(serverQuote));
        }
      } else {
        setQuote(serverQuote);
        localStorage.setItem("dailyQuote", JSON.stringify(serverQuote));
        localStorage.setItem("quoteDate", today);
      }
    } catch (error) {
      console.error("Error parsing stored quote:", error);
      setQuote(serverQuote); // fallback to the server quote
    }
  }, [serverQuote]);

  if (!quote) return <p className="mt-4 text-gray-500">Loading...</p>;

  return (
    <blockquote className="mt-4 text-lg italic">
      &ldquo;{quote.quote}&rdquo;
      <br />
      <span className="mt-2 block font-semibold">- {quote.author}</span>
    </blockquote>
  );
}
