//import OpenAI from "openai"

 const OutfitIdeas = async () => {
  // const openai = new OpenAI({
  //   apiKey: process.env.OPENAI_API_KEY,
  // })

  const aiQueryData = {
    weather: {
      temperature: "24",
      unit: "celsius",
      location: "Waterloo, ON, Canada",
      windSpeed: "24 km/h",
      humidex: "60",
    },
    gender: "Unisex",
    style: "Streetwear",
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an assistant designed to provide an average person general outfit 
        deas based on parameters specified in the user prompt. Those parameters may include things such as weather, 
        preferred styles, gender / unisex and will be provided as a JSON object of strings. 
        Provide exactly three ideas that are appropriate for the conditions provided only in an array of strings, 
        in JSON without any formatting.`,
      },
      {
        role: "user",
        content: JSON.stringify(aiQueryData),
      },
    ],
  })

  const result: Array<string> | null = JSON.parse(
    completion.choices[0].message.content || "null",
  )
  return result ? (
    <div className="m-4 p-2">
      <h1 className=" text-xl ">Outfit Ideas</h1>
      <li>{result[0] || ""}</li>
      <li>{result[1] || ""}</li>
      <li>{result[2] || ""}</li>
    </div>
  ) : (
    <div></div>
  )
}

export default OutfitIdeas
