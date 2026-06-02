export function join(...parts) {
  return parts
    .flat()
    .filter((p) => p != null && p !== "")
    .join("/")
    .replace(/\/+/g, "/");
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
