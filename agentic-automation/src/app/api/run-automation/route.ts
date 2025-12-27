import { NextResponse } from "next/server";
import { runAutomation } from "@/lib/pipeline";
import type { AutomationRequestOptions } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as Partial<AutomationRequestOptions>;
    const result = await runAutomation({
      generateShort: body.generateShort ?? true,
      generateLong: body.generateLong ?? true,
      upload: body.upload ?? false,
    });

    return NextResponse.json(
      {
        success: true,
        result,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[api/run-automation] pipeline failed", error);
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message ?? "Unknown error",
      },
      { status: 500 },
    );
  }
}
