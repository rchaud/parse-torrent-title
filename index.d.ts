declare namespace ParseTorrentTitle {

    interface ParserOptions {
        skipIfAlreadyFound?: boolean;
        remove?: boolean;
    }

    interface DefaultParserResult {
        title: string;
        year?: number;
        resolution?: string;
        extended?: boolean;
        unrated?: boolean;
        proper?: boolean;
        repack?: boolean;
        convert?: boolean;
        hardcoded?: boolean;
        retail?: boolean;
        remastered?: boolean;
        complete?: boolean;
        region?: string;
        container?: string;
        source?: string;
        codec?: string;
        audio?: string;
        group?: string;
        volumes?: Array<number>;
        seasons?: Array<number>;
        season?: number;
        episodes?: Array<number>;
        episode?: number;
        language?: string;
    }

    interface Handler<ParserResult = DefaultParserResult> {
        (input: { title: string, result: ParserResult, matched: Array<string> }): void;
        (input: { title: string }): void;
        (input: { result: ParserResult }): void;
    }

    interface ParseFunction<ParserResult = DefaultParserResult> {
        (title: string): ParserResult;
    }

    interface Transformer {
        (input: string): any;
    }

    interface AddHandlerFunction<ParserResult = DefaultParserResult> {
        (handlerName: string, handler: RegExp, transformer?: Transformer, options?: ParserOptions): void;
        (handlerName: string, handler: RegExp, transformer?: Transformer): void;
        (handlerName: string, handler: RegExp, options?: ParserOptions): void;
        (handlerName: string, handler: Handler<ParserResult>): void;
        (handler: Handler<ParserResult>): void;
    }

    interface AddDefaultsFunction {
        (parser: Parser): void;
    }

    class Parser<ParserResult = DefaultParserResult> {

        constructor();

        addHandler: AddHandlerFunction<ParserResult>;
        parse: ParseFunction<ParserResult>;
    }
}

declare module "parse-torrent-title" {

    export interface DefaultParserResult extends ParseTorrentTitle.DefaultParserResult { }
    export class Parser<ParserResult = DefaultParserResult> extends ParseTorrentTitle.Parser<ParserResult> { }
    export const parse: ParseTorrentTitle.ParseFunction;
    export const addHandler: ParseTorrentTitle.AddHandlerFunction;
    export const addDefaults: ParseTorrentTitle.AddDefaultsFunction;
}
