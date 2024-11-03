import OpenAI from "openai"

const OutfitIdeas = async () => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are an assistant designed to provide an average person general outfit 
        deas based on parameters specified in the user prompt. Those parameters may include things such as weather, 
        preferred styles, gender / unisex. Provide 2 or 3 ideas only in an array of strings, in JSON without any formatting.`,
      },
      {
        role: "user",
        content:
          "Weather: 24 degrees celcius, sunny. Gender: Unisex. No other requirement.",
      },
    ],
  })
  const result = JSON.parse(completion.choices[0].message.content || "")

  return <div>{result[0]}</div>
}

export default OutfitIdeas
