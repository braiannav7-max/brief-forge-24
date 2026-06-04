import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getCompanyByToken } from "../companies";
import { readBriefing, saveBriefing, listBriefings } from "../server/storage.server";
import type { FieldValue } from "../briefing-types";

// Server functions del briefing. El body de .handler corre solo en el server;
// storage.server.ts (con la service-role key de Supabase) nunca llega al cliente.

export const getBriefing = createServerFn({ method: "GET" })
  .inputValidator(z.object({ token: z.string().min(1) }))
  .handler(async ({ data }) => {
    if (!getCompanyByToken(data.token)) throw new Error("Token inválido");
    return readBriefing(data.token);
  });

export const saveBriefingFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      token: z.string().min(1),
      answers: z.record(z.string(), z.any()).optional(),
      submitted: z.boolean().optional(),
    }),
  )
  .handler(async ({ data }) => {
    if (!getCompanyByToken(data.token)) throw new Error("Token inválido");
    return saveBriefing(data.token, {
      answers: data.answers as Record<string, FieldValue> | undefined,
      submitted: data.submitted,
    });
  });

export const listBriefingsFn = createServerFn({ method: "GET" }).handler(async () => {
  return listBriefings();
});
