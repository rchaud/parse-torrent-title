const { expect } = require("chai");
const parse = require("../index").parse;

describe("Parsing hdr", () => {
    it("should detect the HDR source correctly", () => {
        const releaseName = "The.Mandalorian.S01E06.4K.HDR.2160p 4.42GB";
        expect(parse(releaseName)).to.deep.include({ hdr: "HDR" });
    });

    it("should detect the HDR10 source correctly", () => {
        const releaseName = "Spider-Man - Complete Movie Collection (2002-2022) 1080p.HEVC.HDR10.1920x800.x265. DTS-HD";
        expect(parse(releaseName)).to.deep.include({ hdr: "HDR", bitDepth: "10bit" });
    });
});
