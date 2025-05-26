import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("categoryId");

  return NextResponse.json({
    data: [
      {
        id: 1,
        name: "Soccer",
        description:
          "Soccer is a team sport played between two teams of eleven players with a spherical ball.",
        image: "/images/football.png",
      },
      {
        id: 2,
        name: "Basketball",
        description:
          "Basketball is a team sport in which two teams, most commonly of five players each, opposing one another on a rectangular court.",
        image: "/images/basketball.png",
      },
      {
        id: 3,
        name: "Tennis",
        description:
          "Tennis is a racket sport that can be played individually against a single opponent or between two teams of two players each.",
        image: "/images/tennis.png",
      },
      {
        id: 4,
        name: "Badminton",
        description:
          "Badminton is a racket sport played using rackets to hit a shuttlecock across a net.",
        image: "/images/badminton.png",
      },
      {
        id: 5,
        name: "Baseball",
        description:
          "Baseball is a bat-and-ball game played between two opposing teams who take turns batting and fielding.",
        image: "/images/baseball.png",
      },
    ],
  });
}
