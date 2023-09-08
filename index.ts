import Sentry from "@sentry/node";

Sentry.init({
  debug: true,
  tracesSampleRate: 1.0,
  dsn: Bun.env.SENTRY_DSN,
});

const t = Sentry.startTransaction({ op: "function", name: "bun-test" });
Sentry.configureScope((scope) => {
  scope.setSpan(t);
});

Sentry.setTag("bun.version", Bun.version);

try {
  throw new Error("Sentry error from Bun runtime");
} catch (e) {
  Sentry.captureException(e);
}

setTimeout(() => {
  t.finish();
}, 3000);
