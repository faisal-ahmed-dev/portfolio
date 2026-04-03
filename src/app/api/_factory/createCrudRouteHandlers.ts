import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/api-auth";
import { handleServiceError } from "@/lib/api-utils";
import type { GenericCrudService } from "@/services/GenericCrudService";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyService = GenericCrudService<any>;

/**
 * Creates GET (list) + POST (create) handlers for a collection route.
 */
export function createCollectionHandlers(service: AnyService) {
  return {
    async GET() {
      try {
        const items = await service.findAll();
        return NextResponse.json(items);
      } catch (e) {
        return handleServiceError(e);
      }
    },

    async POST(req: NextRequest) {
      if (!authenticate(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      try {
        const body = await req.json();
        const item = await service.create(body);
        return NextResponse.json(item, { status: 201 });
      } catch (e) {
        return handleServiceError(e);
      }
    },
  };
}

/**
 * Creates GET (single) + PUT (update) + DELETE handlers for an item route.
 */
export function createItemHandlers(service: AnyService) {
  return {
    async GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
      try {
        const { id } = await params;
        const item = await service.findById(id);
        return NextResponse.json(item);
      } catch (e) {
        return handleServiceError(e);
      }
    },

    async PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
      if (!authenticate(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      try {
        const { id } = await params;
        const body = await req.json();
        const item = await service.update(id, body);
        return NextResponse.json(item);
      } catch (e) {
        return handleServiceError(e);
      }
    },

    async DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
      if (!authenticate(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      try {
        const { id } = await params;
        await service.delete(id);
        return new NextResponse(null, { status: 204 });
      } catch (e) {
        return handleServiceError(e);
      }
    },
  };
}
