import fs from "fs";
import path from "path";

/* -----------------------------
  FILE PATHS
------------------------------ */

const globalTokensPath = path.resolve("global-tokens/tokens.json");
const componentTokensPath = path.resolve("design-system/component.json");

const tokensOutputPath = path.resolve("design-system/tokens/tokens.css");
const componentOutputPath = path.resolve(
  "design-system/tokens/component-tokens.css",
);

/* -----------------------------
  LOAD TOKENS
------------------------------ */

const globalRaw = fs.readFileSync(globalTokensPath, "utf8");
const componentRaw = fs.readFileSync(componentTokensPath, "utf8");

console.log("Global file size:", globalRaw.length);
console.log("Component file size:", componentRaw.length);

const globalTokens = JSON.parse(globalRaw);
const componentTokens = JSON.parse(componentRaw);

/* -----------------------------
  CONFIG
------------------------------ */

const categoryPrefixMap = {
  Gray: "color",
  Primary: "color",
  Secondary: "color",
  Success: "color",
  Warning: "color",
  Danger: "color",
  "Dropdown Shadow": "effect",
  fontFamilies: "font-family",
  lineHeights: "line-height",
  fontWeights: "font-weight",
  fontSize: "font-size",
  letterSpacing: "letter-spacing",
  paragraphSpacing: "paragraph-spacing",
  paragraphIndent: "paragraph-indent",
  textCase: "text-case",
  textDecoration: "text-decoration",
  Display: "typography",
  Heading: "typography",
  Label: "typography",
  Body: "typography",
};

const includeCategoryInName = new Set([
  "Gray",
  "Primary",
  "Secondary",
  "Success",
  "Warning",
  "Danger",
  "Dropdown Shadow",
]);

const pxTypes = new Set([
  "fontSize",
  "fontSizes",
  "lineHeights",
  "paragraphSpacing",
  "dimension",
]);

/* -----------------------------
  HELPERS
------------------------------ */

const toKebabCase = (value = "") =>
  value
    .toString()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/,/g, "")
    .replace(/\//g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .replace(/-+/g, "-")
    .toLowerCase();

/* -----------------------------
  TOKEN PATH ACCESS
------------------------------ */

const getTokenByPath = (path, tree) => {
  return path.split(".").reduce((acc, key) => acc?.[key], tree);
};

/* -----------------------------
  SAFE MATH EVALUATION
------------------------------ */

const isMathExpression = (str) =>
  /^[0-9+\-*/().\s]+$/.test(str) && /[0-9]/.test(str);

const safeEval = (expr) => {
  try {
    return Function(`"use strict"; return (${expr})`)();
  } catch {
    return expr;
  }
};

/* -----------------------------
  MAIN RESOLVER (CORE ENGINE)
------------------------------ */

const resolveCache = new Map();

const resolveTokenValue = (value, tree, tokenType, stack = new Set()) => {
  if (value == null) return value;

  if (typeof value !== "string") return value;

  if (resolveCache.has(value)) return resolveCache.get(value);

  let resolved = value;

  /* -----------------------------
    Resolve {references}
  ------------------------------ */

  resolved = resolved.replace(/\{([^}]+)\}/g, (_, path) => {
    if (stack.has(path)) return ""; // circular protection

    const token = getTokenByPath(path, tree);
    if (!token) return "";

    if (typeof token === "object" && "$value" in token) {
      stack.add(path);

      const v = resolveTokenValue(token.$value, tree, token.$type, stack);

      stack.delete(path);

      return typeof v === "string" ? v.replace("px", "") : v;
    }

    return token;
  });

  /* -----------------------------
    Evaluate math expressions
  ------------------------------ */

  if (isMathExpression(resolved)) {
    resolved = safeEval(resolved);
  }

  resolveCache.set(value, resolved);

  return resolved;
};

/* -----------------------------
  NORMALIZE VALUE
------------------------------ */

const normalizeValue = (tokenValue, tokenType, tree) => {
  if (tokenType === "boxShadow" && typeof tokenValue === "object") {
    const { x, y, blur, spread, color } = tokenValue;
    return `${x}px ${y}px ${blur}px ${spread}px ${color}`;
  }

  if (tokenType === "typography" && typeof tokenValue === "object") {
    const result = {};

    for (const [k, v] of Object.entries(tokenValue)) {
      result[k] = resolveTokenValue(v, tree, tokenType);
    }

    return result;
  }

  const resolved = resolveTokenValue(tokenValue, tree, tokenType);

  if (typeof resolved === "number" && pxTypes.has(tokenType)) {
    return `${resolved}px`;
  }

  return resolved;
};

/* -----------------------------
  GLOBAL TOKEN EMITTER
------------------------------ */

const globalDeclarations = [];

const emitGlobalVariables = (token, pathParts = []) => {
  if (!token || typeof token !== "object") return;

  if ("$value" in token) {
    const tokenType = token.$type;

    const normalized = normalizeValue(token.$value, tokenType, globalTokens);

    const [rootCategory, ...rest] = pathParts;

    const categoryPrefix = categoryPrefixMap[rootCategory] ?? "token";

    const nameParts = includeCategoryInName.has(rootCategory)
      ? [rootCategory, ...rest]
      : rest;

    const baseName = toKebabCase(nameParts.join("-"));

    if (tokenType === "typography" && typeof normalized === "object") {
      Object.entries(normalized).forEach(([subKey, subValue]) => {
        const varName = `--global-${categoryPrefix}-${baseName}-${toKebabCase(
          subKey,
        )}`;
        globalDeclarations.push(`  ${varName}: ${subValue};`);
      });
      return;
    }

    const variableName = `--global-${categoryPrefix}-${baseName}`;
    globalDeclarations.push(`  ${variableName}: ${normalized};`);
    return;
  }

  Object.entries(token).forEach(([key, value]) => {
    emitGlobalVariables(value, [...pathParts, key]);
  });
};

Object.entries(globalTokens).forEach(([k, v]) => emitGlobalVariables(v, [k]));

/* -----------------------------
  COMPONENT TOKEN EMITTER (FIXED)
------------------------------ */

const componentDeclarations = [];

const emitComponentVariables = (token, pathParts = []) => {
  if (!token || typeof token !== "object") return;

  for (const [key, value] of Object.entries(token)) {
    const nextParts = [...pathParts, key];

    if (value && typeof value === "object" && !Array.isArray(value)) {
      emitComponentVariables(value, nextParts);
      continue;
    }

    const name = `--${nextParts.map(toKebabCase).join("-")}`;

    const resolved = resolveTokenValue(value, globalTokens, null);

    componentDeclarations.push(`  ${name}: ${resolved};`);
  }
};

emitComponentVariables(componentTokens, []);

/* -----------------------------
  WRITE FILES
------------------------------ */

const outputDir = path.resolve("design-system/tokens");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(
  tokensOutputPath,
  `:root {\n${globalDeclarations.join("\n")}\n}\n`,
);

fs.writeFileSync(
  componentOutputPath,
  `:root {\n${componentDeclarations.join("\n")}\n}\n`,
);

/* -----------------------------
  DONE
------------------------------ */

console.log("✅ Global tokens generated");
console.log("✅ Component tokens generated");
