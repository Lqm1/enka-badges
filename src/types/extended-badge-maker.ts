import type { Format } from "badge-maker";

export type ExtendedFormat = Omit<Format, "logoBase64"> & { logo?: string };
