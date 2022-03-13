const { expect } = require("chai");
const parse = require("../index").parse;

describe("Parsing hdr", () => {
    it("should detect the HDR source correctly", () => {
        const releaseName = "The.Mandalorian.S01E06.4K.HDR.2160p 4.42GB";
        expect(parse(releaseName)).to.deep.include({ hdr: true });
    });
});
