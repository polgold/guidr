import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Gemini API key not configured" },
      { status: 501 }
    );
  }

  try {
    const { image } = await req.json();
    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const base64Data = image.includes(",") ? image.split(",")[1] : image;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Data,
            },
          },
          {
            text: "Extract the first name, last name, and ID number from this identification document. Return standard JSON.",
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            firstName: { type: Type.STRING },
            lastName: { type: Type.STRING },
            idNumber: { type: Type.STRING },
          },
          required: ["firstName", "lastName", "idNumber"],
        },
      },
    });

    const parsed = response.text ? JSON.parse(response.text) : null;
    return NextResponse.json(parsed ?? { error: "No data extracted" });
  } catch (error) {
    console.error("Gemini extraction failed:", error);
    return NextResponse.json(
      { error: "Extraction failed" },
      { status: 500 }
    );
  }
}
