import { z } from "zod";

/**
 * 환경변수 검증.
 * - 서버 전용 변수: 서버에서만 검증 (브라우저 번들에는 값이 없음)
 * - NEXT_PUBLIC_ 변수: 서버/클라이언트 모두 검증
 *
 * NEXT_PUBLIC_ 값은 빌드 시점에 정적 치환되므로 process.env.XXX 형태로
 * 직접 참조해야 합니다 (process.env 전체를 넘기면 브라우저에서 비어 있음).
 */
const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  // DATABASE_URL: z.string().min(1),
});

const clientSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.url().default("http://localhost:3000"),
});

function parse<T extends z.ZodType>(schema: T, values: unknown): z.infer<T> {
  const result = schema.safeParse(values);
  if (!result.success) {
    throw new Error(`환경변수 검증 실패:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

const client = parse(clientSchema, {
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});

const server =
  typeof window === "undefined"
    ? parse(serverSchema, {
        NODE_ENV: process.env.NODE_ENV,
        // DATABASE_URL: process.env.DATABASE_URL,
      })
    : ({} as z.infer<typeof serverSchema>);

export const env = { ...server, ...client };
