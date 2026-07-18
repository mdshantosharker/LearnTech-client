import { GoogleGenerativeAI } from "@google/generative-ai";

// Simple keyword-based fallback response generator when API key is missing
function getMockAIResponse(userMessage: string, coursesContext: string): string {
  const query = userMessage.toLowerCase();
  
  let coursesParsed: any[] = [];
  try {
    const lines = coursesContext.split("\n");
    for (const line of lines) {
      if (line.startsWith("- Title:")) {
        const titleMatch = line.match(/Title:\s*"([^"]+)"/);
        const categoryMatch = line.match(/Category:\s*"([^"]+)"/);
        const priceMatch = line.match(/Price:\s*\$(\d+)/);
        const levelMatch = line.match(/Level:\s*"([^"]+)"/);
        const durationMatch = line.match(/Duration:\s*"([^"]+)"/);
        const linkMatch = line.match(/Link:\s*\[[^\]]+\]\(([^)]+)\)/);
        
        if (titleMatch) {
          coursesParsed.push({
            title: titleMatch[1],
            category: categoryMatch ? categoryMatch[1] : "N/A",
            price: priceMatch ? priceMatch[1] : "N/A",
            level: levelMatch ? levelMatch[1] : "N/A",
            duration: durationMatch ? durationMatch[1] : "N/A",
            link: linkMatch ? linkMatch[1] : "/allcourses",
          });
        }
      }
    }
  } catch (e) {
    console.error("Error parsing courses context in mock", e);
  }

  // 1. Greetings
  if (query.includes("hello") || query.includes("hi ") || query.includes("hey") || query === "hi") {
    return `Hello! Welcome to LearnTech. I'm your virtual AI Assistant. I can help you find engineering courses, navigate the site, or answer general questions. 

Here are some suggested topics we can discuss:
- Tell me about available [All Courses](/allcourses).
- How do I [Add a Course](/add)?
- Suggest a beginner-friendly course.
What would you like to know?`;
  }

  // 2. Adding / Creating courses
  if (query.includes("add") || query.includes("create") || query.includes("publish")) {
    return `To create or add a new course on LearnTech, you must be logged in. 
    
You can access the [Add Course](/add) portal directly to submit details like title, syllabus, price, duration, and thumbnail. If you are logged in, you can also oversee all course listings on the [Manage Courses](/manage-courses) page.`;
  }

  // 3. Managing / Deleting courses
  if (query.includes("manage") || query.includes("delete") || query.includes("edit")) {
    return `You can oversee, edit, and delete courses from the [Manage Courses](/manage-courses) page. Please ensure you are signed into your account first to access these controls.`;
  }

  // 4. Navigation assistance
  if (query.includes("navigate") || query.includes("go to") || query.includes("page") || query.includes("route")) {
    return `Here are the main pages you can visit on LearnTech:
- **Home**: [/](/)
- **All Courses**: [/allcourses](/allcourses)
- **Add Course**: [/add](/add) (login required)
- **Manage Courses**: [/manage-courses](/manage-courses) (login required)
- **About Us**: [/about](/about)
- **Blog Section**: [/blog](/blog)
- **Sign In**: [/login](/login) or **Sign Up**: [/signup](/signup)`;
  }

  // 5. Cheapest course query
  if (query.includes("cheapest") || query.includes("cheap") || query.includes("lowest price")) {
    if (coursesParsed.length > 0) {
      const sorted = [...coursesParsed].sort((a, b) => Number(a.price) - Number(b.price));
      const c = sorted[0];
      return `Our most affordable course is **[${c.title}](${c.link})** at only **$${c.price}**! It is a ${c.duration} ${c.level} course in *${c.category}*.`;
    }
  }

  // 6. Level specific queries
  if (query.includes("beginner") || query.includes("easy") || query.includes("start")) {
    const beginners = coursesParsed.filter(c => c.level.toLowerCase() === "beginner");
    if (beginners.length > 0) {
      let response = `We have **${beginners.length}** beginner-friendly course(s) to get you started:\n\n`;
      beginners.forEach(c => {
        response += `- **[${c.title}](${c.link})** ($${c.price}) - ${c.category} (${c.duration})\n`;
      });
      return response;
    }
  }
  if (query.includes("intermediate") || query.includes("medium")) {
    const intermediates = coursesParsed.filter(c => c.level.toLowerCase() === "intermediate");
    if (intermediates.length > 0) {
      let response = `Here are our **${intermediates.length}** intermediate courses:\n\n`;
      intermediates.forEach(c => {
        response += `- **[${c.title}](${c.link})** ($${c.price}) - ${c.category} (${c.duration})\n`;
      });
      return response;
    }
  }
  if (query.includes("advanced") || query.includes("hard") || query.includes("expert")) {
    const advanced = coursesParsed.filter(c => c.level.toLowerCase() === "advanced");
    if (advanced.length > 0) {
      let response = `Here is our **${advanced.length}** advanced/expert-level program:\n\n`;
      advanced.forEach(c => {
        response += `- **[${c.title}](${c.link})** ($${c.price}) - ${c.category} (${c.duration})\n`;
      });
      return response;
    }
  }

  // 7. Specific course search matching
  if (coursesParsed.length > 0) {
    const matches = coursesParsed.filter(c => 
      query.includes(c.title.toLowerCase()) || 
      query.includes(c.category.toLowerCase())
    );
    
    if (matches.length > 0) {
      let response = `I found **${matches.length}** course(s) matching your request:\n\n`;
      matches.forEach(c => {
        response += `### **${c.title}** (${c.level})\n`;
        response += `- **Category**: ${c.category}\n`;
        response += `- **Price**: $${c.price}\n`;
        response += `- **Duration**: ${c.duration}\n`;
        response += `- [Explore Details & Sign Up](${c.link})\n\n`;
      });
      return response;
    }
  }

  // 8. General course listing / catalog
  if (query.includes("course") || query.includes("list") || query.includes("catalog") || query.includes("what do you have")) {
    if (coursesParsed.length > 0) {
      let response = `We have some fantastic courses available on LearnTech! Here is the full list:\n\n`;
      coursesParsed.forEach(c => {
        response += `- **[${c.title}](${c.link})** (${c.level}): A ${c.duration} program in *${c.category}* priced at $${c.price}.\n`;
      });
      response += `\nYou can explore details for any course by clicking its name, or view the complete catalog on our [All Courses](/allcourses) page!`;
      return response;
    }
  }

  // 9. Pricing / cost queries general
  if (query.includes("price") || query.includes("cost") || query.includes("fee") || query.includes("dollars") || query.includes("$")) {
    if (coursesParsed.length > 0) {
      let response = `Here are the prices for our available courses:\n\n`;
      coursesParsed.forEach(c => {
        response += `- **${c.title}**: $${c.price} ([View course detail](${c.link}))\n`;
      });
      return response;
    }
  }

  // 10. Fallback response
  return `I understand you're asking about "${userMessage}". Since I am running in demo mode (no Gemini API key detected), I want to make sure you can find what you need. 

You can browse all our courses on the [All Courses Page](/allcourses), add new courses on the [Add Course Page](/add), or read more about us on the [About Us Page](/about). 

*(Note: To unlock full contextual reasoning and conversational capabilities, please configure the \`GEMINI_API_KEY\` in the \`.env\` file.)*`;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "Messages history is required" }, { status: 400 });
    }

    const latestMessage = messages[messages.length - 1].content;

    // 1. Fetch courses list from server to build dynamic context
    let coursesContext = "No courses are currently available in the database.";
    try {
      const coursesRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/courses`, {
        cache: "no-store",
      });
      if (coursesRes.ok) {
        const courses = await coursesRes.json();
        coursesContext = courses
          .map((c: any) => {
            return `- Title: "${c.title}" | Category: "${c.category}" | Level: "${c.level}" | Price: $${c.price} | Duration: "${c.duration}" | Link: [/allcourses/${c._id}](/allcourses/${c._id})`;
          })
          .join("\n");
      }
    } catch (err) {
      console.error("Failed to fetch courses for AI context:", err);
    }

    // 2. Build system instructions
    const systemPrompt = `You are LearnTech AI Assistant, an intelligent, helpful conversational assistant integrated into the LearnTech application.
Your goal is to answer user questions, assist with navigation, and provide help using the application context.

Context Information:
- Current available courses in our database:
${coursesContext}

- Application Navigation Links (Internal Routes):
  - Home Page: [/](/)
  - All Courses: [/allcourses](/allcourses)
  - Add Course: [/add](/add) (requires user login)
  - Manage Courses: [/manage-courses](/manage-courses) (requires user login)
  - About Us: [/about](/about)
  - Blog Section: [/blog](/blog)
  - Login Page: [/login](/login)
  - Registration Page: [/signup](/signup)

Capabilities & Formatting Rules:
1. When recommending a course, provide its name, category, price, level, and duration, and always link to its detail page using markdown links, e.g. [View Details](/allcourses/<course_id>).
2. When the user asks how to navigate, sign up, log in, or manage courses, guide them and provide markdown links, e.g. "You can add a course on the [Add Course Page](/add)."
3. Feel free to perform follow-up reasoning based on user requests.
4. Keep your responses friendly, concise, and structured. Always use Markdown.
5. You are also a fully capable general-purpose AI assistant. If the user asks about topics outside of LearnTech (such as general knowledge, programming/coding questions, coding assistance, or chat), answer their questions fully, creatively, and accurately. Do not restrict yourself only to LearnTech.
6. Crucial: Make sure to answer queries about prices, duration, category, and levels accurately based ONLY on the provided courses list.`;

    // 3. Check for API key. If not present, run mock streaming simulation
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY not found in environment. Running AI Chat in demo simulation mode.");
      
      const responseText = getMockAIResponse(latestMessage, coursesContext);
      
      const stream = new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder();
          const words = responseText.split(" ");
          
          for (const word of words) {
            controller.enqueue(encoder.encode(word + " "));
            // Yield control back briefly to simulate network/AI streaming latency
            await new Promise((resolve) => setTimeout(resolve, 30 + Math.random() * 30));
          }
          controller.close();
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
        },
      });
    }

    // 4. Connect to real Gemini API
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash",
      systemInstruction: systemPrompt,
    });

    // Prepare previous history for Gemini (roles must alternate user/model, starting with user)
    let history = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    // Gemini startChat history must start with user role
    const firstUserIdx = history.findIndex((h: any) => h.role === "user");
    if (firstUserIdx !== -1) {
      history = history.slice(firstUserIdx);
    } else {
      history = [];
    }

    const chat = model.startChat({ history });
    const result = await chat.sendMessageStream(latestMessage);

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            controller.enqueue(encoder.encode(text));
          }
        } catch (err) {
          console.error("Stream generation error:", err);
          controller.enqueue(encoder.encode("\n\n*Error: Failed to stream response from AI model.*"));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });

  } catch (error: any) {
    console.error("Chat API error:", error);
    return Response.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
