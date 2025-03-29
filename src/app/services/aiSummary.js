import axios from "axios";

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY; // Store this in .env.local

export async function generateSummaryWithHF(tasks) {
  try {
    const today = new Date().toISOString().split("T")[0];
    const firstDayOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    )
      .toISOString()
      .split("T")[0];

    const todaysTasks = tasks.filter((task) =>
      task.created_at.startsWith(today)
    );
    const monthsTasks = tasks.filter(
      (task) => task.created_at >= firstDayOfMonth
    );
    console.log(HF_API_KEY);
    console.log(todaysTasks);

    console.log(monthsTasks);

    const prompt = `Hey! Let's reflect on your progress.
    Today's tasks: ${JSON.stringify(todaysTasks)}
    This month's tasks: ${JSON.stringify(monthsTasks)}
    
    Summarize today's accomplishments in a friendly and motivational way. Then, provide a big-picture reflection on how the user is progressing this month. If there are few or no tasks, offer encouragement to stay on track.`;

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3",
      {
        inputs: prompt,
        parameters: { max_new_tokens: 300 },
        options: { response_format: "trailing" }, // Ensure only AI-generated text is returned
      },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data[0].generated_text.split(
      "offer encouragement to stay on track."
    )[1]; // Extract AI-generated text
  } catch (error) {
    console.error("Hugging Face API Error:", error);
    return "Could not generate a summary. Try again later!";
  }
}
