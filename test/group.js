const { expect } = require("chai");
const parse = require("../index").parse;

describe("Parsing group", () => {
    it("should detect the HD2 group correctly", () => {
        const releaseName = "Nocturnal Animals 2016 VFF 1080p BluRay DTS HEVC-HD2";

        expect(parse(releaseName)).to.deep.include({ group: "HD2" });
    });

    it("should detect the HDH group correctly", () => {
        const releaseName = "Gold 2016 1080p BluRay DTS-HD MA 5 1 x264-HDH";

        expect(parse(releaseName)).to.deep.include({ group: "HDH" });
    });

    it("should detect the YIFY group correctly", () => {
        const releaseName = "Hercules (2014) 1080p BrRip H264 - YIFY";

        expect(parse(releaseName)).to.deep.include({ group: "YIFY" });
    });

    it("should detect group before container file type", () => {
        const releaseName = "The.Expanse.S05E02.720p.WEB.x264-Worldmkv.mkv";

        expect(parse(releaseName)).to.deep.include({ group: "Worldmkv" });
    });

    it("should detect group with site source tag", () => {
        const releaseName = "The.Expanse.S05E02.PROPER.720p.WEB.h264-KOGi[rartv]";

        expect(parse(releaseName)).to.deep.include({ group: "KOGi" });
    });

    it("should detect group with site source tag before container file type", () => {
        const releaseName = "The.Expanse.S05E02.1080p.AMZN.WEB.DDP5.1.x264-NTb[eztv.re].mp4";

        expect(parse(releaseName)).to.deep.include({ group: "NTb" });
    });

    it("should detect when there is no group", () => {
        const releaseName = "Western - L'homme qui n'a pas d'étoile-1955.Multi.DVD9";

        expect(parse(releaseName)).to.not.have.property("group");
    });

    it("should detect when there is no group with hyphen separator", () => {
        const releaseName = "Power (2014) - S02E03.mp4";

        expect(parse(releaseName)).to.not.have.property("group");
    });

    it("should detect when there is no group with hyphen separator and no container", () => {
        const releaseName = "Power (2014) - S02E03";

        expect(parse(releaseName)).to.not.have.property("group");
    });

    it("should detect when there is no group when it is episode", () => {
        const releaseName = "3-Nen D-Gumi Glass no Kamen - 13";

        expect(parse(releaseName)).to.not.have.property("group");
    });

    it("should detect when there is no group when it is ep symbol", () => {
        const releaseName = "3-Nen D-Gumi Glass no Kamen - Ep13";

        expect(parse(releaseName)).to.not.have.property("group");
    });
});
