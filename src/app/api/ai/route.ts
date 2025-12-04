export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { texto, tipo } = body;

    if (!texto || !tipo) {
      return Response.json({ error: "Faltan datos" }, { status: 400 });
    }

    const prompt =
      tipo === "resumir"
        ? `Resumí este texto en pocas líneas y en español:\n\n${texto}`
        : `Mejorá la redacción de este texto sin cambiar el significado, manteniendo el mismo idioma:\n\n${texto}`;

    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    const raw = await groqRes.text();

    if (!groqRes.ok) {
      return Response.json(
        { error: "Groq falló", details: raw },
        { status: 500 }
      );
    }

    const data = JSON.parse(raw);

    return Response.json({
      resultado: data.choices[0].message.content,
    });

  } catch (error) {
    console.error("ERROR TOTAL:", error);
    return Response.json({ error: "Error IA total" }, { status: 500 });
  }
}
