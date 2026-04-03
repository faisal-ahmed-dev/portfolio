import { prisma } from "@/lib/prisma";
import type { IVisitRepository } from "../interfaces/IVisitRepository";
import type { VisitRecordEntity, CreateVisitInput, AnalyticsSummary } from "../types";
import { serialize } from "./_serialize";

const PRUNE_LIMIT = 50_000;
const PRUNE_DAYS = 90;

export class PrismaVisitRepository implements IVisitRepository {
  async isDuplicate(fingerprint: string, withinMinutes = 30): Promise<boolean> {
    const since = new Date(Date.now() - withinMinutes * 60 * 1000);
    const count = await prisma.visitRecord.count({
      where: { fingerprint, timestamp: { gte: since } },
    });
    return count > 0;
  }

  async count(): Promise<number> {
    return prisma.visitRecord.count();
  }

  async create(data: CreateVisitInput): Promise<VisitRecordEntity> {
    const total = await this.count();
    if (total > PRUNE_LIMIT) {
      await this.pruneOld(new Date(Date.now() - PRUNE_DAYS * 24 * 60 * 60 * 1000));
    }
    const row = await prisma.visitRecord.create({
      data: { ...data, timestamp: new Date(data.timestamp) },
    });
    return serialize(row) as unknown as VisitRecordEntity;
  }

  async pruneOld(beforeDate: Date): Promise<void> {
    await prisma.visitRecord.deleteMany({ where: { timestamp: { lt: beforeDate } } });
  }

  async getSummary(): Promise<AnalyticsSummary> {
    const records = await prisma.visitRecord.findMany({ orderBy: { timestamp: "desc" } });

    const today = new Date().toISOString().slice(0, 10);
    const uniqueFingerprints = new Set<string>();
    const visitsByDay: Record<string, number> = {};
    const pageCount: Record<string, number> = {};
    const referrerCount: Record<string, number> = {};
    const countryCount: Record<string, number> = {};
    let visitsToday = 0;

    for (const r of records) {
      uniqueFingerprints.add(r.fingerprint);
      const day = r.timestamp.toISOString().slice(0, 10);
      visitsByDay[day] = (visitsByDay[day] ?? 0) + 1;
      if (day === today) visitsToday++;
      pageCount[r.pathname] = (pageCount[r.pathname] ?? 0) + 1;
      if (r.referrer) referrerCount[r.referrer] = (referrerCount[r.referrer] ?? 0) + 1;
      countryCount[r.country] = (countryCount[r.country] ?? 0) + 1;
    }

    const topPages = Object.entries(pageCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([pathname, count]) => ({ pathname, count }));

    const topReferrers = Object.entries(referrerCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([referrer, count]) => ({ referrer, count }));

    return {
      totalVisits: records.length,
      uniqueVisitors: uniqueFingerprints.size,
      visitsToday,
      visitsByDay,
      topPages,
      topReferrers,
      visitsByCountry: countryCount,
    };
  }
}
