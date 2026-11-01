import type { CatalogRepository } from "@/services/interfaces/catalog";
import { mockCatalogRepository } from "@/services/mock/catalog.repository";

/**
 * Swap this assignment when a remote catalog API is ready.
 * Page components should import from this adapter, never from mock files.
 */
export const catalogService: CatalogRepository = mockCatalogRepository;
