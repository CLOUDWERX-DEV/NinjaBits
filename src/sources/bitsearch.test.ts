import { describe, it, expect } from "vitest";
import { mapBitsearchResults, bitsearchMovies } from "./bitsearch";

describe("mapBitsearchResults", () => {
  it("maps an API row to a torrent result with a built magnet, tagged by source id", () => {
    const [r] = mapBitsearchResults(
      [
        {
          infohash: "4E60BE2D0B87C93EA6FC20D123D74BF9E9379999",
          title: "Old School (2003)",
          size: 733698385,
          seeders: 41,
          leechers: 5,
          updatedAt: "2026-01-23T22:28:03.159Z",
        },
      ],
      "bitsearch-movies",
    );
    expect(r).toMatchObject({
      infoHash: "4e60be2d0b87c93ea6fc20d123d74bf9e9379999",
      name: "Old School (2003)",
      sizeBytes: 733698385,
      seeders: 41,
      leechers: 5,
      source: "bitsearch-movies",
    });
    expect(r!.magnet).toContain("xt=urn:btih:4e60be2d0b87c93ea6fc20d123d74bf9e9379999");
    expect(r!.added).toBe(Math.floor(Date.parse("2026-01-23T22:28:03.159Z") / 1000));
  });

  it("defaults missing seeders/size to 0", () => {
    const [r] = mapBitsearchResults(
      [{ infohash: "a".repeat(40), title: "x" }],
      "bitsearch-movies",
    );
    expect(r).toMatchObject({ seeders: 0, leechers: 0, sizeBytes: 0 });
  });

  it("drops rows without a valid 40-char info hash", () => {
    expect(
      mapBitsearchResults(
        [{ title: "no hash" }, { infohash: "tooshort", title: "bad" }],
        "bitsearch-movies",
      ),
    ).toEqual([]);
  });

  it("falls back to the info hash when the name is missing", () => {
    const [r] = mapBitsearchResults([{ infohash: "b".repeat(40) }], "bitsearch-movies");
    expect(r!.name).toBe("b".repeat(40));
  });
});

describe("bitsearchMovies", () => {
  it("feeds Movies only", () => {
    expect(bitsearchMovies.id).toBe("bitsearch-movies");
    expect(bitsearchMovies.groups).toEqual(["Movies"]);
    expect(bitsearchMovies.groups).not.toContain("Games");
    expect(bitsearchMovies.groups).not.toContain("Anime");
    expect(bitsearchMovies.reportsHealth).toBe(true);
  });
});
