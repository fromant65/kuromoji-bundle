export function join(...parts) {
  const segments = parts.flat().filter((p) => p != null && p !== "");
  if (segments.length === 0) return ".";
  const joined = segments.join("/");
  const protocol = joined.match(/^([a-zA-Z][a-zA-Z0-9+.-]*:\/\/)/);
  if (protocol) {
    return protocol[1] + joined.slice(protocol[1].length).replace(/\/+/g, "/");
  }
  return joined.replace(/\/+/g, "/");
}

export function resolve(...parts) {
  let resolved = join(...parts);
  if (!resolved.startsWith("/")) resolved = "/" + resolved;
  return resolved;
}

export function dirname(p) {
  const i = p.replace(/\/$/, "").lastIndexOf("/");
  return i === -1 ? "." : p.slice(0, i) || "/";
}

export function basename(p, ext) {
  let b = p.replace(/\/$/, "").split("/").pop() || "";
  if (ext && b.endsWith(ext)) b = b.slice(0, -ext.length);
  return b;
}

export function extname(p) {
  const b = p.replace(/\/$/, "").split("/").pop() || "";
  const i = b.lastIndexOf(".");
  return i > 0 ? b.slice(i) : "";
}

export default { join, resolve, dirname, basename, extname };
