import { describe, it, expect } from "vitest";
import { solidtorrentsMovies, solidtorrentsMusic } from "./solidtorrents";

describe("solidtorrentsMovies", () => {
  it("feeds Movies category", () => {
    expect(solidtorrentsMovies.id).toBe("solidtorrents-movies");
    expect(solidtorrentsMovies.groups).toEqual(["Movies"]);
    expect(solidtorrentsMovies.reportsHealth).toBe(true);
  });
});

describe("solidtorrentsMusic", () => {
  it("feeds Music category", () => {
    expect(solidtorrentsMusic.id).toBe("solidtorrents-music");
    expect(solidtorrentsMusic.groups).toEqual(["Music"]);
    expect(solidtorrentsMusic.reportsHealth).toBe(true);
  });
});
