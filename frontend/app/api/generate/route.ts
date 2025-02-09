import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:9080";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const prompt = formData.get("text");

    if (!prompt) {
      return NextResponse.json(
        { error: "No text prompt provided" },
        { status: 400 }
      );
    }

    const url = new URL(`${BACKEND_URL}/text-to-image`);
    url.searchParams.append("text", prompt.toString());

    const response = await fetch(url, {
      method: "POST",
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
} 