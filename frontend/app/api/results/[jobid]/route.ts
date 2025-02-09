import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:9080";

type Props = {
  params: Promise<{ jobid: string }> | { jobid: string }
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const jobid = resolvedParams.jobid;
    
    // Validate the jobid parameter
    if (!jobid || typeof jobid !== 'string') {
      return NextResponse.json(
        { error: "Invalid job ID format" },
        { status: 400 }
      );
    }

    // Create URL object to ensure proper URL construction
    const url = new URL(`${BACKEND_URL}/results/${jobid}`);
    
    const response = await fetch(url.toString(), {
      // Add cache: 'no-store' to prevent caching
      cache: 'no-store'
    });
    
    if (response.status === 404) {
      return NextResponse.json(
        { status: "PENDING", message: "Job still processing" },
        { status: 200 }
      );
    }
    
    if (!response.ok) {
      throw new Error(`Backend responded with status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching results:", error);
    return NextResponse.json(
      { error: "Failed to fetch results" },
      { status: 500 }
    );
  }
} 