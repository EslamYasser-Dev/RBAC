var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/clone@2.1.2/node_modules/clone/clone.js
var require_clone = __commonJS({
  "node_modules/.pnpm/clone@2.1.2/node_modules/clone/clone.js"(exports, module) {
    "use strict";
    var clone2 = function() {
      "use strict";
      function _instanceof(obj, type) {
        return type != null && obj instanceof type;
      }
      var nativeMap;
      try {
        nativeMap = Map;
      } catch (_) {
        nativeMap = function() {
        };
      }
      var nativeSet;
      try {
        nativeSet = Set;
      } catch (_) {
        nativeSet = function() {
        };
      }
      var nativePromise;
      try {
        nativePromise = Promise;
      } catch (_) {
        nativePromise = function() {
        };
      }
      function clone3(parent, circular, depth, prototype, includeNonEnumerable) {
        if (typeof circular === "object") {
          depth = circular.depth;
          prototype = circular.prototype;
          includeNonEnumerable = circular.includeNonEnumerable;
          circular = circular.circular;
        }
        var allParents = [];
        var allChildren = [];
        var useBuffer = typeof Buffer != "undefined";
        if (typeof circular == "undefined")
          circular = true;
        if (typeof depth == "undefined")
          depth = Infinity;
        function _clone(parent2, depth2) {
          if (parent2 === null)
            return null;
          if (depth2 === 0)
            return parent2;
          var child;
          var proto;
          if (typeof parent2 != "object") {
            return parent2;
          }
          if (_instanceof(parent2, nativeMap)) {
            child = new nativeMap();
          } else if (_instanceof(parent2, nativeSet)) {
            child = new nativeSet();
          } else if (_instanceof(parent2, nativePromise)) {
            child = new nativePromise(function(resolve, reject) {
              parent2.then(function(value) {
                resolve(_clone(value, depth2 - 1));
              }, function(err) {
                reject(_clone(err, depth2 - 1));
              });
            });
          } else if (clone3.__isArray(parent2)) {
            child = [];
          } else if (clone3.__isRegExp(parent2)) {
            child = new RegExp(parent2.source, __getRegExpFlags(parent2));
            if (parent2.lastIndex) child.lastIndex = parent2.lastIndex;
          } else if (clone3.__isDate(parent2)) {
            child = new Date(parent2.getTime());
          } else if (useBuffer && Buffer.isBuffer(parent2)) {
            if (Buffer.allocUnsafe) {
              child = Buffer.allocUnsafe(parent2.length);
            } else {
              child = new Buffer(parent2.length);
            }
            parent2.copy(child);
            return child;
          } else if (_instanceof(parent2, Error)) {
            child = Object.create(parent2);
          } else {
            if (typeof prototype == "undefined") {
              proto = Object.getPrototypeOf(parent2);
              child = Object.create(proto);
            } else {
              child = Object.create(prototype);
              proto = prototype;
            }
          }
          if (circular) {
            var index = allParents.indexOf(parent2);
            if (index != -1) {
              return allChildren[index];
            }
            allParents.push(parent2);
            allChildren.push(child);
          }
          if (_instanceof(parent2, nativeMap)) {
            parent2.forEach(function(value, key) {
              var keyChild = _clone(key, depth2 - 1);
              var valueChild = _clone(value, depth2 - 1);
              child.set(keyChild, valueChild);
            });
          }
          if (_instanceof(parent2, nativeSet)) {
            parent2.forEach(function(value) {
              var entryChild = _clone(value, depth2 - 1);
              child.add(entryChild);
            });
          }
          for (var i in parent2) {
            var attrs;
            if (proto) {
              attrs = Object.getOwnPropertyDescriptor(proto, i);
            }
            if (attrs && attrs.set == null) {
              continue;
            }
            child[i] = _clone(parent2[i], depth2 - 1);
          }
          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(parent2);
            for (var i = 0; i < symbols.length; i++) {
              var symbol = symbols[i];
              var descriptor = Object.getOwnPropertyDescriptor(parent2, symbol);
              if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
                continue;
              }
              child[symbol] = _clone(parent2[symbol], depth2 - 1);
              if (!descriptor.enumerable) {
                Object.defineProperty(child, symbol, {
                  enumerable: false
                });
              }
            }
          }
          if (includeNonEnumerable) {
            var allPropertyNames = Object.getOwnPropertyNames(parent2);
            for (var i = 0; i < allPropertyNames.length; i++) {
              var propertyName = allPropertyNames[i];
              var descriptor = Object.getOwnPropertyDescriptor(parent2, propertyName);
              if (descriptor && descriptor.enumerable) {
                continue;
              }
              child[propertyName] = _clone(parent2[propertyName], depth2 - 1);
              Object.defineProperty(child, propertyName, {
                enumerable: false
              });
            }
          }
          return child;
        }
        return _clone(parent, depth);
      }
      clone3.clonePrototype = function clonePrototype(parent) {
        if (parent === null)
          return null;
        var c = function() {
        };
        c.prototype = parent;
        return new c();
      };
      function __objToStr(o) {
        return Object.prototype.toString.call(o);
      }
      clone3.__objToStr = __objToStr;
      function __isDate(o) {
        return typeof o === "object" && __objToStr(o) === "[object Date]";
      }
      clone3.__isDate = __isDate;
      function __isArray(o) {
        return typeof o === "object" && __objToStr(o) === "[object Array]";
      }
      clone3.__isArray = __isArray;
      function __isRegExp(o) {
        return typeof o === "object" && __objToStr(o) === "[object RegExp]";
      }
      clone3.__isRegExp = __isRegExp;
      function __getRegExpFlags(re) {
        var flags = "";
        if (re.global) flags += "g";
        if (re.ignoreCase) flags += "i";
        if (re.multiline) flags += "m";
        return flags;
      }
      clone3.__getRegExpFlags = __getRegExpFlags;
      return clone3;
    }();
    if (typeof module === "object" && module.exports) {
      module.exports = clone2;
    }
  }
});

// node_modules/.pnpm/shell-quote@1.8.1/node_modules/shell-quote/quote.js
var require_quote = __commonJS({
  "node_modules/.pnpm/shell-quote@1.8.1/node_modules/shell-quote/quote.js"(exports, module) {
    "use strict";
    module.exports = function quote(xs) {
      return xs.map(function(s) {
        if (s && typeof s === "object") {
          return s.op.replace(/(.)/g, "\\$1");
        }
        if (/["\s]/.test(s) && !/'/.test(s)) {
          return "'" + s.replace(/(['\\])/g, "\\$1") + "'";
        }
        if (/["'\s]/.test(s)) {
          return '"' + s.replace(/(["\\$`!])/g, "\\$1") + '"';
        }
        return String(s).replace(/([A-Za-z]:)?([#!"$&'()*,:;<=>?@[\\\]^`{|}])/g, "$1\\$2");
      }).join(" ");
    };
  }
});

// node_modules/.pnpm/shell-quote@1.8.1/node_modules/shell-quote/parse.js
var require_parse = __commonJS({
  "node_modules/.pnpm/shell-quote@1.8.1/node_modules/shell-quote/parse.js"(exports, module) {
    "use strict";
    var CONTROL = "(?:" + [
      "\\|\\|",
      "\\&\\&",
      ";;",
      "\\|\\&",
      "\\<\\(",
      "\\<\\<\\<",
      ">>",
      ">\\&",
      "<\\&",
      "[&;()|<>]"
    ].join("|") + ")";
    var controlRE = new RegExp("^" + CONTROL + "$");
    var META = "|&;()<> \\t";
    var SINGLE_QUOTE = '"((\\\\"|[^"])*?)"';
    var DOUBLE_QUOTE = "'((\\\\'|[^'])*?)'";
    var hash = /^#$/;
    var SQ = "'";
    var DQ = '"';
    var DS = "$";
    var TOKEN = "";
    var mult = 4294967296;
    for (i = 0; i < 4; i++) {
      TOKEN += (mult * Math.random()).toString(16);
    }
    var i;
    var startsWithToken = new RegExp("^" + TOKEN);
    function matchAll(s, r) {
      var origIndex = r.lastIndex;
      var matches = [];
      var matchObj;
      while (matchObj = r.exec(s)) {
        matches.push(matchObj);
        if (r.lastIndex === matchObj.index) {
          r.lastIndex += 1;
        }
      }
      r.lastIndex = origIndex;
      return matches;
    }
    function getVar(env, pre, key) {
      var r = typeof env === "function" ? env(key) : env[key];
      if (typeof r === "undefined" && key != "") {
        r = "";
      } else if (typeof r === "undefined") {
        r = "$";
      }
      if (typeof r === "object") {
        return pre + TOKEN + JSON.stringify(r) + TOKEN;
      }
      return pre + r;
    }
    function parseInternal(string2, env, opts) {
      if (!opts) {
        opts = {};
      }
      var BS = opts.escape || "\\";
      var BAREWORD = "(\\" + BS + `['"` + META + `]|[^\\s'"` + META + "])+";
      var chunker = new RegExp([
        "(" + CONTROL + ")",
        // control chars
        "(" + BAREWORD + "|" + SINGLE_QUOTE + "|" + DOUBLE_QUOTE + ")+"
      ].join("|"), "g");
      var matches = matchAll(string2, chunker);
      if (matches.length === 0) {
        return [];
      }
      if (!env) {
        env = {};
      }
      var commented = false;
      return matches.map(function(match) {
        var s = match[0];
        if (!s || commented) {
          return void 0;
        }
        if (controlRE.test(s)) {
          return { op: s };
        }
        var quote = false;
        var esc = false;
        var out = "";
        var isGlob = false;
        var i2;
        function parseEnvVar() {
          i2 += 1;
          var varend;
          var varname;
          var char = s.charAt(i2);
          if (char === "{") {
            i2 += 1;
            if (s.charAt(i2) === "}") {
              throw new Error("Bad substitution: " + s.slice(i2 - 2, i2 + 1));
            }
            varend = s.indexOf("}", i2);
            if (varend < 0) {
              throw new Error("Bad substitution: " + s.slice(i2));
            }
            varname = s.slice(i2, varend);
            i2 = varend;
          } else if (/[*@#?$!_-]/.test(char)) {
            varname = char;
            i2 += 1;
          } else {
            var slicedFromI = s.slice(i2);
            varend = slicedFromI.match(/[^\w\d_]/);
            if (!varend) {
              varname = slicedFromI;
              i2 = s.length;
            } else {
              varname = slicedFromI.slice(0, varend.index);
              i2 += varend.index - 1;
            }
          }
          return getVar(env, "", varname);
        }
        for (i2 = 0; i2 < s.length; i2++) {
          var c = s.charAt(i2);
          isGlob = isGlob || !quote && (c === "*" || c === "?");
          if (esc) {
            out += c;
            esc = false;
          } else if (quote) {
            if (c === quote) {
              quote = false;
            } else if (quote == SQ) {
              out += c;
            } else {
              if (c === BS) {
                i2 += 1;
                c = s.charAt(i2);
                if (c === DQ || c === BS || c === DS) {
                  out += c;
                } else {
                  out += BS + c;
                }
              } else if (c === DS) {
                out += parseEnvVar();
              } else {
                out += c;
              }
            }
          } else if (c === DQ || c === SQ) {
            quote = c;
          } else if (controlRE.test(c)) {
            return { op: s };
          } else if (hash.test(c)) {
            commented = true;
            var commentObj = { comment: string2.slice(match.index + i2 + 1) };
            if (out.length) {
              return [out, commentObj];
            }
            return [commentObj];
          } else if (c === BS) {
            esc = true;
          } else if (c === DS) {
            out += parseEnvVar();
          } else {
            out += c;
          }
        }
        if (isGlob) {
          return { op: "glob", pattern: out };
        }
        return out;
      }).reduce(function(prev, arg) {
        return typeof arg === "undefined" ? prev : prev.concat(arg);
      }, []);
    }
    module.exports = function parse(s, env, opts) {
      var mapped = parseInternal(s, env, opts);
      if (typeof env !== "function") {
        return mapped;
      }
      return mapped.reduce(function(acc, s2) {
        if (typeof s2 === "object") {
          return acc.concat(s2);
        }
        var xs = s2.split(RegExp("(" + TOKEN + ".*?" + TOKEN + ")", "g"));
        if (xs.length === 1) {
          return acc.concat(xs[0]);
        }
        return acc.concat(xs.filter(Boolean).map(function(x) {
          if (startsWithToken.test(x)) {
            return JSON.parse(x.split(TOKEN)[1]);
          }
          return x;
        }));
      }, []);
    };
  }
});

// node_modules/.pnpm/shell-quote@1.8.1/node_modules/shell-quote/index.js
var require_shell_quote = __commonJS({
  "node_modules/.pnpm/shell-quote@1.8.1/node_modules/shell-quote/index.js"(exports) {
    "use strict";
    exports.quote = require_quote();
    exports.parse = require_parse();
  }
});

// src/brocli-error.ts
var BroCliError = class extends Error {
  constructor(message) {
    const errPrefix = "BroCli error: ";
    super(message === void 0 ? message : `${errPrefix}${message}`);
  }
};

// src/command-core.ts
var import_clone = __toESM(require_clone(), 1);
var import_shell_quote = __toESM(require_shell_quote(), 1);

// src/help-themes.ts
var defaultTheme = (calledFor) => {
  if (Array.isArray(calledFor)) {
    const cmds = calledFor.filter((cmd) => !cmd.hidden);
    const tableCmds = cmds.map((cmd) => ({
      name: cmd.name,
      aliases: cmd.aliases ? cmd.aliases.join(", ") : "-",
      description: cmd.description ?? "-"
    }));
    console.log(`Here's the list of all available commands:`);
    console.table(tableCmds);
    console.log(
      "To read the details about any particular command type: [commandName] --help"
    );
  } else {
    const options = calledFor.options ? Object.values(calledFor.options).filter((opt) => !opt.config?.isHidden).map(
      ({ config: opt }) => ({
        name: opt.name,
        aliases: opt.aliases.length ? `${opt.aliases.join(", ")}` : "-",
        description: opt.description ?? "-",
        type: opt.type,
        required: opt.isRequired ? "\u2713" : "\u2717"
      })
    ) : void 0;
    console.log(
      `Command: ${calledFor.name}${calledFor.aliases ? ` [${calledFor.aliases.join(", ")}]` : ""}${calledFor.description ? ` - ${calledFor.description}` : ""}`
    );
    if (!options?.length) return;
    console.log("\nOptions:");
    console.table(options);
  }
};

// src/util.ts
function isInt(value) {
  return value === Math.floor(value);
}

// src/command-core.ts
var unknownCommand = (caller) => {
  const msg = `Unknown command: '${caller}'.
Type '--help' to get help on the cli.`;
  return new Error(msg);
};
var unknownSubcommand = (command2, caller) => {
  const name = getCommandNameRecursive(command2);
  const msg = `Unknown command: ${name} ${caller}.
Type '${name} --help' to get the help on command.`;
  new Error(
    msg
  );
  return new Error(msg);
};
var missingRequired = (command2, missingOpts) => {
  const msg = `Command '${command2.name}' is missing following required options: ${missingOpts.map((opt) => {
    const name = opt.shift();
    const aliases = opt;
    if (aliases.length) return `${name} [${aliases.join(", ")}]`;
    return name;
  }).join(", ")}`;
  return new Error(msg);
};
var unrecognizedOptions = (command2, unrecognizedArgs) => {
  const msg = `Unrecognized options for command '${command2.name}': ${unrecognizedArgs.join(", ")}`;
  return new Error(msg);
};
var invalidBooleanSyntax = (matchedName) => {
  return new Error(
    `Invalid syntax: boolean type argument '${matchedName}' must have it's value passed in the following formats: ${matchedName}=<value> | ${matchedName} <value> | ${matchedName}.
Allowed values: true, false, 0, 1`
  );
};
var invalidStringSyntax = (matchedName) => {
  return new Error(
    `Invalid syntax: string type argument '${matchedName}' must have it's value passed in the following formats: ${matchedName}=<value> | ${matchedName} <value>`
  );
};
var enumViolation = (matchedName, data, values) => {
  return new Error(
    `Invalid value: value for the argument '${matchedName}' must be either one of the following: ${values.join(", ")}; Received: ${data}`
  );
};
var enumViolationPos = (matchedName, data, values) => {
  return new Error(
    `Invalid value: value for the argument '${matchedName}' must be either one of the following: ${values.join(", ")}; Received: ${data}`
  );
};
var invalidNumberSyntax = (matchedName) => {
  return new Error(
    `Invalid syntax: number type argument '${matchedName}' must have it's value passed in the following formats: ${matchedName}=<value> | ${matchedName} <value>`
  );
};
var invalidNumberValue = (matchedName, data) => {
  return new Error(
    `Invalid value: number type argument '${matchedName}' expects a number as an input, got: ${data}`
  );
};
var invalidInteger = (matchedName, data) => {
  return new Error(
    `Invalid value: number type argument '${matchedName}' expects an integer as an input, got: ${data}`
  );
};
var belowMin = (matchedName, data, min) => {
  return new Error(
    `Invalid value: number type argument '${matchedName}' expects minimal value of ${min} as an input, got: ${data}`
  );
};
var aboveMax = (matchedName, data, max) => {
  return new Error(
    `Invalid value: number type argument '${matchedName}' expects maximal value of ${max} as an input, got: ${data}`
  );
};
var generatePrefix = (name) => name.startsWith("-") ? name : name.length > 1 ? `--${name}` : `-${name}`;
var validateOptions = (config) => {
  const cloned = (0, import_clone.default)(config);
  const entries = [];
  const storedNames = {};
  const cfgEntries = Object.entries(cloned);
  for (const [key, value] of cfgEntries) {
    const cfg = value._.config;
    if (cfg.name === void 0) cfg.name = key;
    if (cfg.type === "positional") continue;
    if (cfg.name.includes("=")) {
      throw new BroCliError(
        `Can't define option ${cfg.name} - option names and aliases cannot contain '='!`
      );
    }
    for (const alias of cfg.aliases) {
      if (alias.includes("=")) {
        throw new BroCliError(
          `Can't define option ${cfg.name} - option names and aliases cannot contain '='!`
        );
      }
    }
    cfg.name = generatePrefix(cfg.name);
    cfg.aliases = cfg.aliases.map((a) => generatePrefix(a));
  }
  for (const [key, value] of cfgEntries) {
    const cfg = value._.config;
    if (cfg.type === "positional") {
      entries.push([key, { config: cfg, $output: void 0 }]);
      continue;
    }
    const reservedNames = ["--help", "-h", "--version", "-v"];
    const allNames = [cfg.name, ...cfg.aliases];
    for (const name of allNames) {
      const match = reservedNames.find((n) => n === name);
      if (match) throw new BroCliError(`Can't define option ${cfg.name} - name '${match}' is reserved!`);
    }
    const storageVals = Object.values(storedNames);
    for (const storage of storageVals) {
      const nameOccupier = storage.find((e) => e === cfg.name);
      if (!nameOccupier) continue;
      throw new BroCliError(
        `Can't define option '${cfg.name}': name is already in use by option '${storage[0]}'!`
      );
    }
    for (const alias of cfg.aliases) {
      for (const storage of storageVals) {
        const nameOccupier = storage.find((e) => e === alias);
        if (!nameOccupier) continue;
        throw new BroCliError(
          `Can't define option '${cfg.name}': alias '${alias}' is already in use by option '${storage[0]}'!`
        );
      }
    }
    storedNames[cfg.name] = [cfg.name, ...cfg.aliases];
    storedNames[cfg.name].forEach((name, idx) => {
      if (storedNames[cfg.name].findIndex((e) => e === name) === idx) return;
      throw new BroCliError(
        `Can't define option '${cfg.name}': duplicate aliases '${name}'!`
      );
    });
    entries.push([key, { config: cfg, $output: void 0 }]);
  }
  return Object.fromEntries(entries);
};
var assignParent = (parent, subcommands) => subcommands.forEach((e) => {
  e.parent = parent;
  if (e.subcommands) assignParent(e, e.subcommands);
});
var command = (command2) => {
  const allNames = command2.aliases ? [command2.name, ...command2.aliases] : [command2.name];
  const cmd = (0, import_clone.default)(command2);
  if (command2.subcommands && command2.options && Object.values(command2.options).find((opt) => opt._.config.type === "positional")) {
    throw new BroCliError(
      `Can't define command '${cmd.name}' - command can't have subcommands and positional args at the same time!`
    );
  }
  const processedOptions = command2.options ? validateOptions(command2.options) : void 0;
  cmd.options = processedOptions;
  cmd.name = cmd.name ?? cmd.aliases?.shift();
  if (!cmd.name) throw new BroCliError(`Can't define command without name!`);
  cmd.aliases = cmd.aliases?.length ? cmd.aliases : void 0;
  if (!cmd.handler) throw new BroCliError(`Can't define command '${cmd.name}' - command must have a handler!`);
  if (cmd.name.startsWith("-")) {
    throw new BroCliError(`Can't define command '${cmd.name}' - command name can't start with '-'!`);
  }
  cmd.aliases?.forEach((a) => {
    if (a.startsWith("-")) {
      throw new BroCliError(`Can't define command '${cmd.name}' - command aliases can't start with '-'!`);
    }
  });
  allNames.forEach((n, i) => {
    if (n === "help") {
      throw new BroCliError(
        `Can't define command '${cmd.name}' - 'help' is a reserved name. If you want to redefine help message - do so in runCli's config.`
      );
    }
    const lCaseName = n?.toLowerCase();
    if (lCaseName === "0" || lCaseName === "1" || lCaseName === "true" || lCaseName === "false") {
      throw new BroCliError(
        `Can't define command '${cmd.name}' - '${n}' is a reserved for boolean values name!`
      );
    }
    const idx = allNames.findIndex((an) => an === n);
    if (idx !== i) throw new BroCliError(`Can't define command '${cmd.name}' - duplicate alias '${n}'!`);
  });
  if (cmd.subcommands) {
    assignParent(cmd, cmd.subcommands);
  }
  return cmd;
};
var getCommandInner = (commands, candidates, args) => {
  const { data: arg, originalIndex: index } = candidates.shift();
  const command2 = commands.find((c) => {
    const names = c.aliases ? [c.name, ...c.aliases] : [c.name];
    const res = names.find((name) => name === arg);
    return res;
  });
  if (!command2) {
    return {
      command: command2,
      args
    };
  }
  const newArgs = removeByIndex(args, index);
  if (!candidates.length || !command2.subcommands) {
    return {
      command: command2,
      args: newArgs
    };
  }
  const newCandidates = candidates.map((c) => ({ data: c.data, originalIndex: c.originalIndex - 1 }));
  const subcommand = getCommandInner(command2.subcommands, newCandidates, newArgs);
  if (!subcommand.command) throw unknownSubcommand(command2, candidates[0].data);
  return subcommand;
};
var getCommand = (commands, args) => {
  const candidates = [];
  for (let i = 0; i < args.length; ++i) {
    const arg = args[i];
    if (arg === "--help" || arg === "-h" || arg === "--version" || arg === "-v") {
      const lCaseNext = args[i + 1]?.toLowerCase();
      if (lCaseNext === "0" || lCaseNext === "1" || lCaseNext === "true" || lCaseNext === "false") ++i;
      continue;
    }
    if (arg?.startsWith("-")) {
      if (!arg.includes("=")) ++i;
      continue;
    }
    candidates.push({
      data: arg,
      originalIndex: i
    });
  }
  if (!candidates.length) {
    return {
      command: void 0,
      args
    };
  }
  const firstCandidate = candidates[0];
  if (firstCandidate.data === "help") {
    return {
      command: "help",
      args: removeByIndex(args, firstCandidate.originalIndex)
    };
  }
  const { command: command2, args: argsRes } = getCommandInner(commands, candidates, args);
  if (!command2) throw unknownCommand(firstCandidate.data);
  return {
    command: command2,
    args: argsRes
  };
};
var parseArg = (options, positionals, arg, nextArg) => {
  let data = void 0;
  const argSplit = arg.split("=");
  const hasEq = arg.includes("=");
  const namePart = argSplit.shift();
  const dataPart = hasEq ? argSplit.join("=") : nextArg;
  let skipNext = !hasEq;
  if (namePart === "--help" || namePart === "-h") {
    return {
      isHelp: true
    };
  }
  if (namePart === "--version" || namePart === "-v") {
    return {
      isVersion: true
    };
  }
  if (!arg.startsWith("-")) {
    if (!positionals.length) return {};
    const pos = positionals.shift();
    if (pos[1].enumVals && !pos[1].enumVals.find((val) => val === dataPart)) {
      throw enumViolationPos(pos[1].name, arg, pos[1].enumVals);
    }
    data = arg;
    return {
      data,
      skipNext: false,
      name: pos[0],
      option: pos[1]
    };
  }
  const option = options.find(([optKey, opt]) => {
    const names = [opt.name, ...opt.aliases];
    if (opt.type === "boolean") {
      const match = names.find((name) => name === namePart);
      if (!match) return false;
      let lcaseData = dataPart?.toLowerCase();
      if (!hasEq && nextArg?.startsWith("-")) {
        data = true;
        skipNext = false;
        return true;
      }
      if (lcaseData === void 0 || lcaseData === "" || lcaseData === "true" || lcaseData === "1") {
        data = true;
        return true;
      }
      if (lcaseData === "false" || lcaseData === "0") {
        data = false;
        return true;
      }
      if (!hasEq) {
        data = true;
        skipNext = false;
        return true;
      }
      throw invalidBooleanSyntax(match);
    } else {
      const match = names.find((name) => name === namePart);
      if (!match) return false;
      if (opt.type === "string") {
        if (!hasEq && nextArg === void 0) throw invalidStringSyntax(match);
        if (opt.enumVals && !opt.enumVals.find((val) => val === dataPart)) {
          throw enumViolation(match, dataPart, opt.enumVals);
        }
        data = dataPart;
        return true;
      }
      if (!hasEq && nextArg === void 0) throw invalidNumberSyntax(match);
      const numData = Number(dataPart);
      if (isNaN(numData)) throw invalidNumberValue(match, dataPart);
      if (opt.isInt && !isInt(numData)) throw invalidInteger(match, dataPart);
      if (opt.minVal !== void 0 && numData < opt.minVal) throw belowMin(match, dataPart, opt.minVal);
      if (opt.maxVal !== void 0 && numData > opt.maxVal) throw aboveMax(match, dataPart, opt.maxVal);
      data = dataPart;
      return true;
    }
  });
  return {
    data,
    skipNext,
    name: option?.[0],
    option: option?.[1]
  };
};
var parseOptions = (command2, args, omitKeysOfUndefinedOptions) => {
  const options = command2.options;
  const optEntries = Object.entries(options ?? {}).map(
    (opt) => [opt[0], opt[1].config]
  );
  const nonPositionalEntries = optEntries.filter(([key, opt]) => opt.type !== "positional");
  const positionalEntries = optEntries.filter(([key, opt]) => opt.type === "positional");
  const result = {};
  const missingRequiredArr = [];
  const unrecognizedArgsArr = [];
  for (let i = 0; i < args.length; ++i) {
    const arg = args[i];
    const nextArg = args[i + 1];
    const {
      data,
      name,
      option,
      skipNext,
      isHelp,
      isVersion
    } = parseArg(nonPositionalEntries, positionalEntries, arg, nextArg);
    if (!option) unrecognizedArgsArr.push(arg.split("=")[0]);
    if (skipNext) ++i;
    result[name] = data;
    if (isHelp) return "help";
    if (isVersion) return "version";
  }
  for (const [optKey, option] of optEntries) {
    const data = result[optKey] ?? option.default;
    if (!omitKeysOfUndefinedOptions) {
      result[optKey] = data;
    } else {
      if (data !== void 0) result[optKey] = data;
    }
    if (option.isRequired && result[optKey] === void 0) missingRequiredArr.push([option.name, ...option.aliases]);
  }
  if (missingRequiredArr.length) throw missingRequired(command2, missingRequiredArr);
  if (unrecognizedArgsArr.length) throw unrecognizedOptions(command2, unrecognizedArgsArr);
  return result;
};
var executeOrLog = async (target) => {
  if (!target || typeof target === "string") console.log(target);
  else await target();
};
var getCommandNameRecursive = (command2) => command2.parent ? `${getCommandNameRecursive(command2.parent)} ${command2.name}` : command2.name;
var validateCommands = (commands, parent) => {
  const storedNames = {};
  for (const cmd of commands) {
    const storageVals = Object.values(storedNames);
    for (const storage of storageVals) {
      const nameOccupier = storage.find((e) => e === cmd.name);
      if (!nameOccupier) continue;
      throw new Error(
        `Can't define command '${getCommandNameRecursive(cmd)}': name is already in use by command '${parent ? `${getCommandNameRecursive(parent)} ` : ""}${storage[0]}'!`
      );
    }
    if (cmd.aliases) {
      for (const alias of cmd.aliases) {
        for (const storage of storageVals) {
          const nameOccupier = storage.find((e) => e === alias);
          if (!nameOccupier) continue;
          throw new Error(
            `Can't define command '${getCommandNameRecursive(cmd)}': alias '${alias}' is already in use by command '${parent ? `${getCommandNameRecursive(parent)} ` : ""}${storage[0]}'!`
          );
        }
      }
    }
    storedNames[cmd.name] = cmd.aliases ? [cmd.name, ...cmd.aliases] : [cmd.name];
    if (cmd.subcommands) cmd.subcommands = validateCommands(cmd.subcommands, cmd);
  }
  return commands;
};
var removeByIndex = (arr, idx) => [...arr.slice(0, idx), ...arr.slice(idx + 1, arr.length)];
var help = async (command2, commands, helpHandler) => typeof command2 === "object" ? command2.help !== void 0 ? await executeOrLog(command2.help) : await helpHandler(command2) : await helpHandler(commands);
var rawCli = async (commands, config) => {
  const processedCmds = validateCommands(commands);
  const argSource = config?.argSource ?? process.argv;
  const version = config?.version;
  const helpHandler = config?.help ?? defaultTheme;
  const omitKeysOfUndefinedOptions = config?.omitKeysOfUndefinedOptions ?? false;
  let args = argSource.slice(2, argSource.length);
  if (!args.length) return await helpHandler(processedCmds);
  const helpIndex = args.findIndex((arg) => arg === "--help" || arg === "-h");
  if (helpIndex !== -1 && (helpIndex > 0 ? args[helpIndex - 1]?.startsWith("-") && !args[helpIndex - 1].includes("=") ? false : true : true)) {
    const command3 = getCommand(processedCmds, args).command;
    return help(command3, processedCmds, helpHandler);
  }
  const versionIndex = args.findIndex((arg) => arg === "--version" || arg === "-v");
  if (versionIndex !== -1 && (versionIndex > 0 ? args[versionIndex - 1]?.startsWith("-") ? false : true : true)) {
    return await executeOrLog(version);
  }
  const { command: command2, args: newArgs } = getCommand(processedCmds, args);
  if (!command2) return helpHandler(processedCmds);
  if (command2 === "help") {
    const { command: helpCommand } = getCommand(processedCmds, newArgs);
    return help(helpCommand, processedCmds, helpHandler);
  }
  const optionResult = parseOptions(command2, newArgs, omitKeysOfUndefinedOptions);
  if (optionResult === "help") return await help(command2, commands, helpHandler);
  if (optionResult === "version") return await executeOrLog(version);
  if (optionResult) {
    if (config?.hook) await config.hook("pre", command2);
    await command2.handler(command2.transform ? await command2.transform(optionResult) : optionResult);
    if (config?.hook) await config.hook("post", command2);
  }
  return void 0;
};
var run = async (commands, config) => {
  try {
    await rawCli(commands, config);
  } catch (e) {
    console.error(typeof e === "object" && e !== null && "message" in e ? e.message : e);
    process.exit(1);
  }
};
var handler = (options, handler2) => handler2;
var shellArgs = (str) => {
  const spaces = str.match(/"[^"]+"|'[^']+'|\S+/g) ?? [];
  return spaces.flatMap((s) => (0, import_shell_quote.parse)(s)).map((s) => s.toString());
};
var test = async (command2, args) => {
  try {
    const cliParsedArgs = shellArgs(args);
    const options = parseOptions(command2, cliParsedArgs);
    if (options === "help" || options === "version") {
      return {
        type: options
      };
    }
    return {
      options: command2.transform ? await command2.transform(options) : options,
      type: "handler"
    };
  } catch (e) {
    return {
      type: "error",
      error: e
    };
  }
};
var commandsInfo = (commands) => {
  const validated = validateCommands(commands);
  return Object.fromEntries(validated.map((c) => [c.name, {
    name: c.name,
    aliases: c.aliases,
    description: c.description,
    isHidden: c.hidden,
    options: c.options ? Object.fromEntries(Object.entries(c.options).map(([key, opt]) => [key, opt.config])) : void 0,
    metaInfo: c.metaInfo,
    subcommands: c.subcommands ? commandsInfo(c.subcommands) : void 0
  }]));
};

// src/option-builder.ts
var OptionBuilderBase = class _OptionBuilderBase {
  _;
  config = () => this._.config;
  constructor(config) {
    this._ = {
      config: config ?? {
        aliases: [],
        type: "string"
      },
      $output: void 0
    };
  }
  string(name) {
    const config = this.config();
    return new _OptionBuilderBase({ ...config, type: "string", name });
  }
  number(name) {
    const config = this.config();
    return new _OptionBuilderBase({ ...config, type: "number", name });
  }
  boolean(name) {
    const config = this.config();
    return new _OptionBuilderBase({ ...config, type: "boolean", name });
  }
  positional(displayName) {
    const config = this.config();
    return new _OptionBuilderBase({ ...config, type: "positional", name: displayName });
  }
  alias(...aliases) {
    const config = this.config();
    return new _OptionBuilderBase({ ...config, aliases });
  }
  desc(description) {
    const config = this.config();
    return new _OptionBuilderBase({ ...config, description });
  }
  hidden() {
    const config = this.config();
    return new _OptionBuilderBase({ ...config, isHidden: true });
  }
  required() {
    const config = this.config();
    return new _OptionBuilderBase({ ...config, isRequired: true });
  }
  default(value) {
    const config = this.config();
    const enums = config.enumVals;
    if (enums && !enums.find((v) => value === v)) {
      throw new Error(
        `Option enums [ ${enums.join(", ")} ] are incompatible with default value ${value}`
      );
    }
    return new _OptionBuilderBase({ ...config, default: value });
  }
  enum(...values) {
    const config = this.config();
    const defaultVal = config.default;
    if (defaultVal !== void 0 && !values.find((v) => defaultVal === v)) {
      throw new Error(
        `Option enums [ ${values.join(", ")} ] are incompatible with default value ${defaultVal}`
      );
    }
    return new _OptionBuilderBase({ ...config, enumVals: values });
  }
  min(value) {
    const config = this.config();
    const maxVal = config.maxVal;
    if (maxVal !== void 0 && maxVal < value) {
      throw new BroCliError("Unable to define option's min value to be higher than max value!");
    }
    return new _OptionBuilderBase({ ...config, minVal: value });
  }
  max(value) {
    const config = this.config();
    const minVal = config.minVal;
    if (minVal !== void 0 && minVal < value) {
      throw new BroCliError("Unable to define option's max value to be lower than min value!");
    }
    return new _OptionBuilderBase({ ...config, maxVal: value });
  }
  int() {
    const config = this.config();
    return new _OptionBuilderBase({ ...config, isInt: true });
  }
};
function string(name) {
  return typeof name === "string" ? new OptionBuilderBase().string(name) : new OptionBuilderBase().string();
}
function number(name) {
  return typeof name === "string" ? new OptionBuilderBase().number(name) : new OptionBuilderBase().number();
}
function boolean(name) {
  return typeof name === "string" ? new OptionBuilderBase().boolean(name) : new OptionBuilderBase().boolean();
}
function positional(displayName) {
  return typeof displayName === "string" ? new OptionBuilderBase().positional(displayName) : new OptionBuilderBase().positional();
}
export {
  BroCliError,
  boolean,
  command,
  commandsInfo,
  handler,
  number,
  positional,
  run,
  string,
  test
};
//# sourceMappingURL=index.js.map