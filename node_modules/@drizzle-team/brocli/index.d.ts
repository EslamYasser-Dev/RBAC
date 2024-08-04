/**
 * Internal error class used to bypass runCli's logging without stack trace
 *
 * Used only for malformed commands and options
 */
declare class BroCliError extends Error {
    constructor(message: string | undefined);
}

type OptionType = 'string' | 'boolean' | 'number' | 'positional';
type OutputType = string | boolean | number | undefined;
type BuilderConfig<TType extends OptionType = OptionType> = {
    name?: string | undefined;
    aliases: string[];
    type: TType;
    description?: string;
    default?: OutputType;
    isHidden?: boolean;
    isRequired?: boolean;
    isInt?: boolean;
    minVal?: number;
    maxVal?: number;
    enumVals?: [string, ...string[]];
};
type ProcessedBuilderConfig = {
    name: string;
    aliases: string[];
    type: OptionType;
    description?: string;
    default?: OutputType;
    isHidden?: boolean;
    isRequired?: boolean;
    isInt?: boolean;
    minVal?: number;
    maxVal?: number;
    enumVals?: [string, ...string[]];
};
type BuilderConfigLimited = BuilderConfig & {
    type: Exclude<OptionType, 'positional'>;
};
declare class OptionBuilderBase<TBuilderConfig extends BuilderConfig = BuilderConfig, TOutput extends OutputType = string, TOmit extends string = '', TEnums extends string | undefined = undefined> {
    _: {
        config: TBuilderConfig;
        /**
         * Type-level only field
         *
         * Do not attempt to access at a runtime
         */
        $output: TOutput;
    };
    private config;
    constructor(config?: TBuilderConfig);
    string<TName extends string>(name: TName): Omit<OptionBuilderBase<BuilderConfig<'string'>, string | undefined, TOmit | OptionType | 'min' | 'max' | 'int'>, TOmit | OptionType | 'min' | 'max' | 'int'>;
    string(): Omit<OptionBuilderBase<BuilderConfig<'string'>, string | undefined, TOmit | OptionType | 'min' | 'max' | 'int'>, TOmit | OptionType | 'min' | 'max' | 'int'>;
    number<TName extends string>(name: TName): Omit<OptionBuilderBase<BuilderConfig<'number'>, number | undefined, TOmit | OptionType | 'enum'>, TOmit | OptionType | 'enum'>;
    number(): Omit<OptionBuilderBase<BuilderConfig<'number'>, string | undefined, TOmit | OptionType | 'enum'>, TOmit | OptionType | 'enum'>;
    boolean<TName extends string>(name: TName): Omit<OptionBuilderBase<BuilderConfig<'boolean'>, boolean | undefined, TOmit | OptionType | 'min' | 'max' | 'enum' | 'int'>, TOmit | OptionType | 'min' | 'max' | 'enum' | 'int'>;
    boolean(): Omit<OptionBuilderBase<BuilderConfig<'boolean'>, boolean | undefined, TOmit | OptionType | 'min' | 'max' | 'enum' | 'int'>, TOmit | OptionType | 'min' | 'max' | 'enum' | 'int'>;
    positional<TName extends string>(displayName: TName): Omit<OptionBuilderBase<BuilderConfig<'positional'>, string | undefined, TOmit | OptionType | 'min' | 'max' | 'int' | 'alias'>, TOmit | OptionType | 'min' | 'max' | 'int' | 'alias'>;
    positional(): Omit<OptionBuilderBase<BuilderConfig<'positional'>, string | undefined, TOmit | OptionType | 'min' | 'max' | 'int' | 'alias'>, TOmit | OptionType | 'min' | 'max' | 'int' | 'alias'>;
    alias(...aliases: string[]): Omit<OptionBuilderBase<TBuilderConfig, TOutput, TOmit | 'alias'>, TOmit | 'alias'>;
    desc<TDescription extends string>(description: TDescription): Omit<OptionBuilderBase<TBuilderConfig, TOutput, TOmit | 'desc'>, TOmit | 'desc'>;
    hidden(): Omit<OptionBuilderBase<TBuilderConfig, TOutput, TOmit | 'hidden'>, TOmit | 'hidden'>;
    required(): Omit<OptionBuilderBase<TBuilderConfig, Exclude<TOutput, undefined>, TOmit | 'required' | 'default'>, TOmit | 'required' | 'default'>;
    default<TDefVal extends TEnums extends undefined ? Exclude<TOutput, undefined> : TEnums>(value: TDefVal): Omit<OptionBuilderBase<TBuilderConfig, Exclude<TOutput, undefined>, TOmit | 'enum' | 'required' | 'default', TEnums>, TOmit | 'enum' | 'required' | 'default'>;
    enum<TValues extends [string, ...string[]]>(...values: TValues): Omit<OptionBuilderBase<TBuilderConfig, TValues[number], TOmit | 'enum', TValues[number]>, TOmit | 'enum'>;
    min(value: number): Omit<OptionBuilderBase<TBuilderConfig, TOutput, TOmit | 'min'>, TOmit | 'min'>;
    max(value: number): Omit<OptionBuilderBase<TBuilderConfig, TOutput, TOmit | 'max'>, TOmit | 'max'>;
    int(): Omit<OptionBuilderBase<TBuilderConfig, TOutput, TOmit | 'int'>, TOmit | 'int'>;
}
type GenericBuilderInternalsFields = {
    /**
     * Type-level only field
     *
     * Do not attempt to access at a runtime
     */
    $output: OutputType;
    config: BuilderConfig;
};
type GenericBuilderInternals = {
    _: GenericBuilderInternalsFields;
};
type GenericBuilderInternalsFieldsLimited = {
    /**
     * Type-level only field
     *
     * Do not attempt to access at a runtime
     */
    $output: OutputType;
    config: BuilderConfigLimited;
};
type GenericBuilderInternalsLimited = {
    _: GenericBuilderInternalsFieldsLimited;
};
type ProcessedOptions<TOptionConfig extends Record<string, GenericBuilderInternals> = Record<string, GenericBuilderInternals>> = {
    [K in keyof TOptionConfig]: K extends string ? {
        config: ProcessedBuilderConfig;
        /**
         * Type-level only field
         *
         * Do not attempt to access at a runtime
         */
        $output: TOptionConfig[K]['_']['$output'];
    } : never;
};
type Simplify<T> = {
    [K in keyof T]: T[K];
} & {};
type TypeOf<TOptions extends Record<string, GenericBuilderInternals>> = Simplify<{
    [K in keyof TOptions]: TOptions[K]['_']['$output'];
}>;
declare function string<TName extends string>(name: TName): Omit<OptionBuilderBase<BuilderConfig<'string'>, string | undefined, OptionType | 'min' | 'max' | 'int'>, OptionType | 'min' | 'max' | 'int'>;
declare function string(): Omit<OptionBuilderBase<BuilderConfig<'string'>, string | undefined, OptionType | 'min' | 'max' | 'int'>, OptionType | 'min' | 'max' | 'int'>;
declare function number<TName extends string>(name: TName): Omit<OptionBuilderBase<BuilderConfig<'number'>, number | undefined, OptionType | 'enum'>, OptionType | 'enum'>;
declare function number(): Omit<OptionBuilderBase<BuilderConfig<'number'>, number | undefined, OptionType | 'enum'>, OptionType | 'enum'>;
declare function boolean<TName extends string>(name: TName): Omit<OptionBuilderBase<BuilderConfig<'boolean'>, boolean | undefined, OptionType | 'min' | 'max' | 'int' | 'enum'>, OptionType | 'min' | 'max' | 'int' | 'enum'>;
declare function boolean(): Omit<OptionBuilderBase<BuilderConfig<'boolean'>, boolean | undefined, OptionType | 'min' | 'max' | 'int' | 'enum'>, OptionType | 'min' | 'max' | 'int' | 'enum'>;
declare function positional<TName extends string>(displayName: TName): Omit<OptionBuilderBase<BuilderConfig<'positional'>, string | undefined, OptionType | 'min' | 'max' | 'int' | 'alias'>, OptionType | 'min' | 'max' | 'int' | 'alias'>;
declare function positional(): Omit<OptionBuilderBase<BuilderConfig<'positional'>, string | undefined, OptionType | 'min' | 'max' | 'int' | 'alias'>, OptionType | 'min' | 'max' | 'int' | 'alias'>;

type HelpHandler = (calledFor: Command | Command[]) => any;
type CommandHandler<TOpts extends Record<string, GenericBuilderInternals> | undefined = Record<string, GenericBuilderInternals> | undefined> = (options: TOpts extends Record<string, GenericBuilderInternals> ? TypeOf<TOpts> : undefined) => any;
type CommandInfo = {
    name: string;
    aliases?: [string, ...string[]];
    description?: string;
    hidden?: boolean;
    options?: Record<string, ProcessedBuilderConfig>;
    metaInfo?: string;
    subcommands?: CommandsInfo;
};
type CommandsInfo = Record<string, CommandInfo>;
type EventType = 'pre' | 'post';
type BroCliConfig = {
    argSource?: string[];
    help?: HelpHandler;
    version?: string | Function;
    omitKeysOfUndefinedOptions?: boolean;
    hook?: (event: EventType, command: Command) => any;
};
type GenericCommandHandler = (options?: Record<string, OutputType> | undefined) => any;
type RawCommand<TOpts extends Record<string, GenericBuilderInternals> | undefined = Record<string, GenericBuilderInternals> | undefined, TOptsData = TOpts extends Record<string, GenericBuilderInternals> ? TypeOf<TOpts> : undefined, TTransformed = TOptsData extends undefined ? undefined : TOptsData> = {
    name?: string;
    aliases?: [string, ...string[]];
    description?: string;
    hidden?: boolean;
    options?: TOpts;
    help?: string | Function;
    transform?: (options: TOptsData) => TTransformed;
    handler?: (options: Awaited<TTransformed>) => any;
    subcommands?: [Command, ...Command[]];
    metaInfo?: string;
};
type AnyRawCommand<TOpts extends Record<string, GenericBuilderInternals> | undefined = Record<string, GenericBuilderInternals> | undefined> = {
    name?: string;
    aliases?: [string, ...string[]];
    description?: string;
    hidden?: boolean;
    options?: TOpts;
    help?: string | Function;
    transform?: GenericCommandHandler;
    handler?: GenericCommandHandler;
    subcommands?: [Command, ...Command[]];
    metaInfo?: string;
};
type Command<TOptsType = any, TTransformedType = any> = {
    name: string;
    aliases?: [string, ...string[]];
    description?: string;
    hidden?: boolean;
    options?: ProcessedOptions;
    help?: string | Function;
    transform?: GenericCommandHandler;
    handler: GenericCommandHandler;
    subcommands?: [Command, ...Command[]];
    parent?: Command;
    metaInfo?: string;
};
type CommandCandidate = {
    data: string;
    originalIndex: number;
};
type InnerCommandParseRes = {
    command: Command | undefined;
    args: string[];
};
type TestResult<THandlerInput> = {
    type: 'handler';
    options: THandlerInput;
} | {
    type: 'help' | 'version';
} | {
    type: 'error';
    error: unknown;
};
declare const command: <TOpts extends Record<string, GenericBuilderInternals> | undefined, TOptsData = TOpts extends Record<string, GenericBuilderInternals> ? { [K_1 in keyof { [K in keyof TOpts]: TOpts[K]["_"]["$output"]; }]: { [K in keyof TOpts]: TOpts[K]["_"]["$output"]; }[K_1]; } : undefined, TTransformed = TOptsData>(command: RawCommand<TOpts, TOptsData, TTransformed>) => Command<TOptsData, Awaited<TTransformed>>;
/**
 * Runs CLI commands
 *
 * @param commands - command collection
 *
 * @param argSource - source of cli arguments, optionally passed as a parameter for testing purposes and compatibility with custom environments
 */
declare const run: (commands: Command[], config?: BroCliConfig) => Promise<void>;
declare const handler: <TOpts extends Record<string, GenericBuilderInternals>>(options: TOpts, handler: CommandHandler<TOpts>) => CommandHandler<TOpts>;
declare const test: <TOpts, THandlerInput>(command: Command<TOpts, THandlerInput>, args: string) => Promise<TestResult<THandlerInput>>;
declare const commandsInfo: (commands: Command[]) => CommandsInfo;

export { type AnyRawCommand, type BroCliConfig, BroCliError, type BuilderConfig, type BuilderConfigLimited, type Command, type CommandCandidate, type CommandHandler, type CommandInfo, type CommandsInfo, type EventType, type GenericBuilderInternals, type GenericBuilderInternalsFields, type GenericBuilderInternalsFieldsLimited, type GenericBuilderInternalsLimited, type GenericCommandHandler, type HelpHandler, type InnerCommandParseRes, OptionBuilderBase, type OptionType, type OutputType, type ProcessedBuilderConfig, type ProcessedOptions, type RawCommand, type Simplify, type TestResult, type TypeOf, boolean, command, commandsInfo, handler, number, positional, run, string, test };
