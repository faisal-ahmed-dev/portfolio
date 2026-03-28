import fs from "node:fs";
import path from "node:path";

const ANALYTICS_DIR = path.join(process.cwd(), "content", "analytics");
const VISITS_FILE = path.join(ANALYTICS_DIR, "visits.json");
const MAX_RECORDS = 50_000;
const PRUNE_DAYS = 90;

export interface VisitRecord {
  fingerprint: string;
  timestamp: string;
  pathname: string;
  referrer: string;
  userAgent: string;
  country: string;
}

export interface AnalyticsSummary {
  totalVisits: number;
  uniqueVisitors: number;
  visitsToday: number;
  visitsByDay: Record<string, number>;
  topPages: { path: string; count: number }[];
  topReferrers: { referrer: string; count: number }[];
  visitsByCountry: Record<string, number>;
}

function loadVisits(): VisitRecord[] {
  try {
    if (!fs.existsSync(VISITS_FILE)) return [];
    return JSON.parse(fs.readFileSync(VISITS_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function saveVisits(visits: VisitRecord[]): void {
  fs.mkdirSync(ANALYTICS_DIR, { recursive: true });
  fs.writeFileSync(VISITS_FILE, JSON.stringify(visits));
}

function pruneOldRecords(visits: VisitRecord[]): VisitRecord[] {
  if (visits.length <= MAX_RECORDS) return visits;
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - PRUNE_DAYS);
  const cutoffStr = cutoff.toISOString();
  return visits.filter((v) => v.timestamp >= cutoffStr);
}

export function isDuplicate(fingerprint: string): boolean {
  const visits = loadVisits();
  const today = new Date().toISOString().slice(0, 10);
  return visits.some(
    (v) => v.fingerprint === fingerprint && v.timestamp.startsWith(today)
  );
}

export function appendVisit(record: VisitRecord): void {
  let visits = loadVisits();
  visits = pruneOldRecords(visits);
  visits.push(record);
  saveVisits(visits);
}

function countBy<T>(items: T[], keyFn: (item: T) => string): Record<string, number> {
  const map: Record<string, number> = {};
  for (const item of items) {
    const key = keyFn(item);
    map[key] = (map[key] ?? 0) + 1;
  }
  return map;
}

function topN(counts: Record<string, number>, n: number): { key: string; count: number }[] {
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([key, count]) => ({ key, count }));
}

export function getAnalyticsSummary(): AnalyticsSummary {
  const visits = loadVisits();
  const today = new Date().toISOString().slice(0, 10);

  const uniqueFingerprints = new Set(visits.map((v) => v.fingerprint));
  const visitsToday = visits.filter((v) => v.timestamp.startsWith(today)).length;

  const visitsByDay = countBy(visits, (v) => v.timestamp.slice(0, 10));
  const pageCounts = countBy(visits, (v) => v.pathname);
  const referrerCounts = countBy(
    visits.filter((v) => v.referrer),
    (v) => v.referrer
  );
  const visitsByCountry = countBy(
    visits.filter((v) => v.country),
    (v) => v.country
  );

  return {
    totalVisits: visits.length,
    uniqueVisitors: uniqueFingerprints.size,
    visitsToday,
    visitsByDay,
    topPages: topN(pageCounts, 10).map((e) => ({ path: e.key, count: e.count })),
    topReferrers: topN(referrerCounts, 10).map((e) => ({ referrer: e.key, count: e.count })),
    visitsByCountry,
  };
}
