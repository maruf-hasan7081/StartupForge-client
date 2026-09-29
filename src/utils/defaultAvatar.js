export function defaultAvatarUrl(name = "User") {
  const label = encodeURIComponent(String(name).trim() || "User");
  return `https://ui-avatars.com/api/?name=${label}&background=7c6cff&color=fff&size=256`;
}
