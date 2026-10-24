// @ts-nocheck

const MAX_ACH = 3;
const MAX_IMPACT = 3;
const MAX_ACH_WORDS = 20;
const MAX_LABEL_WORDS = 3;

function trimWords(text: string, maxWords: number) {
  const parts = String(text || '').trim().split(/\s+/).filter(Boolean);
  if (parts.length <= maxWords) return parts.join(' ');
  return parts.slice(0, maxWords).join(' ');
}

function sentencesFromDesc(desc: string) {
  return String(desc || '')
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.replace(/^[\s\-•]+/, '').trim())
    .filter((s) => s.length >= 12);
}

function labelFromPhrase(phrase: string) {
  const cleaned = phrase
    .replace(/\d+%?\+?/g, '')
    .replace(/[^a-zA-Z\s]/g, ' ')
    .trim();
  const words = cleaned.split(/\s+/).filter(Boolean).slice(0, MAX_LABEL_WORDS);
  if (!words.length) return 'Key outcome';
  return words.join(' ');
}

export function suggestExperienceHighlights(details: {
  title?: string;
  company?: string;
  domain?: string;
  desc?: string;
  teamSize?: string;
}) {
  const desc = details.desc || '';
  const sentences = sentencesFromDesc(desc);

  const achievements: string[] = [];
  for (const sentence of sentences) {
    if (achievements.length >= MAX_ACH) break;
    const line = trimWords(sentence, MAX_ACH_WORDS);
    if (line.length >= 12) achievements.push(line);
  }

  if (!achievements.length && desc.trim()) {
    achievements.push(trimWords(desc, MAX_ACH_WORDS));
  }
  if (!achievements.length && details.title) {
    achievements.push(
      trimWords(`Delivered results as ${details.title} at ${details.company || 'the company'}`, MAX_ACH_WORDS),
    );
  }

  const impacts: { value: string; label: string }[] = [];
  const pctMatches = desc.match(/\d+(?:\.\d+)?%/g) || [];
  pctMatches.slice(0, 2).forEach((value) => {
    impacts.push({ value, label: trimWords('Performance improvement', MAX_LABEL_WORDS) });
  });

  const plusMatches = desc.match(/\d+\+/g) || [];
  plusMatches.slice(0, MAX_IMPACT - impacts.length).forEach((value) => {
    impacts.push({ value, label: trimWords('Items delivered', MAX_LABEL_WORDS) });
  });

  if (details.teamSize && impacts.length < MAX_IMPACT) {
    const team = details.teamSize.trim();
    impacts.push({ value: team.replace(/\s*members?/i, '').trim() || team, label: 'Team size' });
  }

  if (details.domain && impacts.length < MAX_IMPACT) {
    impacts.push({ value: 'Core', label: trimWords(details.domain, MAX_LABEL_WORDS) });
  }

  if (!impacts.length) {
    impacts.push({ value: '100%', label: 'Delivery focus' });
  }

  return {
    achievements: achievements.slice(0, MAX_ACH),
    impacts: impacts.slice(0, MAX_IMPACT),
  };
}
