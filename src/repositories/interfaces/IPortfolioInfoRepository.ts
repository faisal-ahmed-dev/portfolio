import type { PortfolioInfoEntity } from "../types";

export interface IPortfolioInfoRepository {
  get(): Promise<PortfolioInfoEntity | null>;
  upsert(data: Record<string, unknown>): Promise<PortfolioInfoEntity>;
}
