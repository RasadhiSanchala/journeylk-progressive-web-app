import { NextResponse } from "next/server";
import { attractions } from "@/data/attraction";

export function GET() {
  return NextResponse.json(attractions);
}