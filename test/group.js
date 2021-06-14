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

    it("should detect anime group in brackets", () => {
        const releaseName = "[AnimeRG] One Punch Man - 09 [720p].mkv";

        expect(parse(releaseName)).to.deep.include({ group: "AnimeRG" });
    });

    it("should detect anime group in brackets with underscores", () => {
        const releaseName = "[Mazui]_Hyouka_-_03_[DF5E813A].mkv";

        expect(parse(releaseName)).to.deep.include({ group: "Mazui" });
    });

    it("should detect anime group in brackets with numbers", () => {
        const releaseName = "[H3] Hunter x Hunter - 38 [1280x720] [x264]";

        expect(parse(releaseName)).to.deep.include({ group: "H3" });
    });

    it("should detect anime group in brackets with spaces", () => {
        const releaseName = "[KNK E MMS Fansubs] Nisekoi - 20 Final [PT-BR]";

        expect(parse(releaseName)).to.deep.include({ group: "KNK E MMS Fansubs" });
    });

    it("should detect anime group in brackets with a link", () => {
        const releaseName = "[HD-ELITE.NET] -  The.Art.Of.The.Steal.2014.DVDRip.XviD.Dual.Aud";

        expect(parse(releaseName)).to.deep.include({ group: "HD-ELITE.NET" });
    });

    it("should not detect brackets group when group is detected at the end of title", () => {
        const releaseName = "[Russ]Lords.Of.London.2014.XviD.H264.AC3-BladeBDP";

        expect(parse(releaseName)).to.deep.include({ group: "BladeBDP" });
    });

    it("should not detect brackets group when it contains other parsed parameters", () => {
        const releaseName = "[DVD-RIP] Kaavalan (2011) Sruthi XVID [700Mb] [TCHellRaiser]";

        expect(parse(releaseName)).to.not.have.property("group");
    });

    it("should not detect brackets group when it contains other parsed parameters", () => {
        const releaseName = "[DVD-RIP] Kaavalan (2011) Sruthi XVID [700Mb] [TCHellRaiser]";

        expect(parse(releaseName)).to.not.have.property("group");
    });

    it("should not detect brackets group when it contains other parsed parameters for series", () => {
        const releaseName = "[DvdMux - XviD - Ita Mp3 Eng Ac3 - Sub Ita Eng] Sanctuary S01e01";

        expect(parse(releaseName)).to.not.have.property("group");
    });
});
