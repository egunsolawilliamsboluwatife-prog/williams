import { sceneState, type Quality } from "@/lib/state";

type GpuTierResult = { tier?: number; isMobile?: boolean };
type GetTier = (options?: { benchmarksURL?: string }) => Promise<GpuTierResult>;

export async function detectQuality(): Promise<Quality> {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  sceneState.reduced = reduced;
  if (reduced) return "low";

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  if (nav.connection?.saveData) return "low";

  const narrow = window.matchMedia("(max-width: 760px)").matches;
  if (narrow && typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2) return "low";

  try {
    const getGPUTier = await loadTier();
    const gpu = await getGPUTier({ benchmarksURL: "/gpu-benchmarks" });
    if (!gpu.tier || gpu.tier <= 1) return "low";
    if (gpu.isMobile && gpu.tier <= 2) return "low";
    return "high";
  } catch {
    return narrow ? "low" : "high";
  }
}

async function loadTier(): Promise<GetTier> {
  const scoped = (await import("@pmndrs/detect-gpu")) as { getGPUTier?: GetTier };
  if (scoped.getGPUTier) return scoped.getGPUTier;
  const plain = (await import("detect-gpu")) as { getGPUTier: GetTier };
  return plain.getGPUTier;
}
