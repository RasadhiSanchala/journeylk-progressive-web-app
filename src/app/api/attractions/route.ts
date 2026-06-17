import { NextResponse } from "next/server";
import { attractions } from "@/data/attraction";
import type { AttractionCategory } from "@/types";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") as AttractionCategory | null;
  const search = searchParams.get("search")?.toLowerCase().trim() ?? "";
  const id = searchParams.get("id");

  if (id) {
    const attraction = attractions.find((item) => item.id === Number(id));

    if (!attraction) {
      return NextResponse.json(
        { message: "Attraction not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(attraction);
  }

  const filteredAttractions = attractions.filter((attraction) => {
    const matchesCategory =
      !category ||
      category === "All" ||
      attraction.category === category;

    const matchesSearch =
      !search ||
      attraction.name.toLowerCase().includes(search) ||
      attraction.city.toLowerCase().includes(search) ||
      attraction.location.toLowerCase().includes(search) ||
      attraction.category.toLowerCase().includes(search);

    return matchesCategory && matchesSearch;
  });

  return NextResponse.json(filteredAttractions);
}