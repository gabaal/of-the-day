export async function GET() {
  const API_KEY = process.env.NINJA_API_KEY;
  const API_URL = "https://api.api-ninjas.com/v1/quotes";

  try {
    const response = await fetch(API_URL, {
      headers: { "X-Api-Key": API_KEY },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch quote");
    }

    const data = await response.json();
    return Response.json(data[0]); // Return first quote
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
