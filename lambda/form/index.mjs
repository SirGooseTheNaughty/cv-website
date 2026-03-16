import { Telegraf } from "telegraf";

const headers = {
  "content-type": "application/json",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET,POST,OPTIONS",
  "access-control-allow-headers": "content-type,authorization",
};

function response(statusCode, body) {
  return {
    statusCode,
    headers,
    body: JSON.stringify(body),
  };
}

function parseJsonBody(event) {
  if (!event?.body) {
    return {};
  }

  const raw = event.isBase64Encoded
    ? Buffer.from(event.body, "base64").toString("utf8")
    : event.body;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function withTimeout(promise, timeoutMs = 20000) {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error("Telegram request timeout")), timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timeoutId);
  }
}

export const handler = async (event) => {
  const method = event.requestContext?.http?.method ?? event.httpMethod ?? "UNKNOWN";

  if (method === "OPTIONS") {
    return response(204, {});
  }

  if (method === "GET") {
    return response(200, {
      ok: true,
      endpoint: "/api/form",
      message: "Form API is live.",
      timestamp: new Date().toISOString(),
    });
  }

  if (method !== "POST") {
    return response(405, {
      ok: false,
      error: "Method not allowed",
    });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return response(500, {
      ok: false,
      error: "Telegram credentials are not configured",
    });
  }

  const body = parseJsonBody(event);
  if (!body) {
    return response(400, {
      ok: false,
      error: "Invalid JSON payload",
    });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const project = String(body.project ?? "").trim();

  if (!name || !email || !project) {
    return response(400, {
      ok: false,
      error: "name, email and project are required",
    });
  }

  const message = [
    "<b>New CV website form submission</b>",
    "",
    `<b>Name:</b> ${escapeHtml(name)}`,
    `<b>Email:</b> ${escapeHtml(email)}`,
    `<b>Project:</b> ${escapeHtml(project)}`,
  ].join("\n");

  try {
    const bot = new Telegraf(token);
    await withTimeout(
      bot.telegram.sendMessage(chatId, message, { parse_mode: "HTML" }),
    );

    return response(200, {
      ok: true,
      message: "Message sent to Telegram",
    });
  } catch (error) {
    const details = error instanceof Error ? error.message : "Unknown Telegram error";

    return response(502, {
      ok: false,
      error: "Failed to send message to Telegram",
      details,
    });
  }
};
