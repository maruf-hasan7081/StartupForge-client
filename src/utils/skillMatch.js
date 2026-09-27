function tokenize(text) {
  return String(text || "")
    .toLowerCase()
    .split(/[,;|/]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function calculateSkillMatch(userSkills, requiredSkills) {
  const user = tokenize(userSkills);
  const required = tokenize(requiredSkills);
  if (!required.length) return 0;
  if (!user.length) return 0;

  const matches = required.filter((skill) =>
    user.some((u) => u.includes(skill) || skill.includes(u)),
  );
  return Math.round((matches.length / required.length) * 100);
}
