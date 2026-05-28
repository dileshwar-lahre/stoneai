import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {

  try {

    const body = await req.json();

    const message = body.message;

    const completion =
      await groq.chat.completions.create({

        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "system",
            content: `
You are Stonenox AI assistant.

About company:
- AI Automation
- SaaS Development
- Web Development
- Seo
- Google Ads
- Meta Ads
- Branding
- Digital Marketing

Rules:
- Speak Hindi + English
- Keep replies short
- Sound modern
- Help users professionally
            `,
          },

          {
            role: "user",
            content: message,
          },
        ],

        temperature: 0.7,
        max_tokens: 300,
      });

    return Response.json({
      success: true,
      reply:
        completion.choices[0].message.content,
    });

  } catch (error) {

    console.log(error);

    return Response.json({
      success: false,
      reply: error.message,
    });

  }

}