export async function GET() {
  const API_KEY = process.env.NINJA_API_KEY;
  const API_URL = "https://api.api-ninjas.com/v1/jokes";

  try {
    const response = await fetch(API_URL, {
      headers: { "X-Api-Key": API_KEY },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch joke");
    }

    const data = await response.json();
    return Response.json(data[0]); // Return first joke
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
