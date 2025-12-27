import { NextResponse } from "next/server";
import { getTrendingTopics } from "@/lib/trending";

export const revalidate = 60;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? Number.parseInt(limitParam, 10) : 12;

  const topics = await getTrendingTopics({ limit });
  return NextResponse.json({
    success: true,
    count: topics.length,
    topics,
  });
}
