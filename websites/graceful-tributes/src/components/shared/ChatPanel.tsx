"use client";

import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

type Message = { from: "them" | "me"; text: string };

/**
 * Shared chat-mock panel. `tone="va"` themes against Variant A's CSS vars
 * (light/dark aware); `tone="light"` is the fixed-light Variant B styling.
 * `avatarVariant` picks the Aria (sage→water gradient, serif letter) vs the
 * human care-team (stone circle, mono initials) avatar.
 */
export function ChatPanel({
  name,
  status,
  avatar,
  avatarVariant = "human",
  messages,
  placeholder,
  action,
  actionHref,
  tone = "light",
  className,
}: {
  name: string;
  status: string;
  avatar: string;
  avatarVariant?: "aria" | "human";
  messages: Message[];
  placeholder: string;
  action: string;
  /** When set, the action button becomes a link (e.g. chat URL or mailto). */
  actionHref?: string;
  tone?: "va" | "light";
  className?: string;
}) {
  const va = tone === "va";
  const panelBg = va ? "bg-[var(--va-paper)]" : "bg-white";
  const headerBg = va ? "bg-[var(--va-surface)]" : "bg-surface";
  const border = va ? "border-[var(--va-line)]" : "border-ink/[0.12]";
  const themBubble = va ? "bg-[var(--va-surface)] text-[var(--va-ink)]" : "bg-surface text-ink";
  const meBubble = va
    ? "bg-[var(--va-ink)] text-[var(--va-paper)]"
    : "bg-ink text-paper";
  const muted = va ? "text-[var(--va-muted)]" : "text-ink/55";
  const actionBg = va ? "bg-[var(--va-gold)]" : "bg-gold";

  return (
    <div
      className={cn("overflow-hidden rounded-[20px] border", border, panelBg, className)}
      style={{ boxShadow: "0 30px 70px -30px rgba(46,61,51,.55)" }}
    >
      {/* Header */}
      <div className={cn("flex items-center gap-3 border-b px-[22px] py-[18px]", border, headerBg)}>
        <span
          className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full text-white"
          style={
            avatarVariant === "aria"
              ? { background: "linear-gradient(150deg,#8FA08E,#6E8C96)" }
              : { background: "#C9BBA8" }
          }
        >
          {avatarVariant === "aria" ? (
            <span className="font-display text-[17px] italic text-white">{avatar}</span>
          ) : (
            <span className="font-mono text-[12px] text-ink">{avatar}</span>
          )}
        </span>
        <div>
          <div className={cn("text-[14px] font-semibold", va ? "text-[var(--va-ink)]" : "text-ink")}>
            {name}
          </div>
          <div className={cn("gt-label !text-[9.5px] !tracking-[0.1em]", muted)}>{status}</div>
        </div>
        <span
          data-motion
          className="ml-auto h-2 w-2 rounded-full bg-sage"
          style={{ animation: "gtPulse 2s ease-in-out infinite" }}
        />
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-[14px] px-[22px] py-6">
        {messages.map((m, i) =>
          m.from === "them" ? (
            <div
              key={i}
              className={cn(
                "max-w-[84%] self-start rounded-[16px_16px_16px_4px] px-[17px] py-[13px] text-[14px] leading-[1.5]",
                themBubble,
              )}
            >
              {m.text}
            </div>
          ) : (
            <div
              key={i}
              className={cn(
                "max-w-[82%] self-end rounded-[16px_16px_4px_16px] px-[17px] py-[13px] text-[14px] leading-[1.5]",
                meBubble,
              )}
            >
              {m.text}
            </div>
          ),
        )}
      </div>

      {/* Input row */}
      <div className={cn("flex items-center gap-[10px] border-t px-[18px] py-[14px]", border)}>
        <span className={cn("flex-1 font-mono text-[12px]", muted)}>{placeholder}</span>
        {actionHref ? (
          <a
            href={actionHref}
            {...(actionHref.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            onClick={() => track("chat_open", { placement: "chat-panel" })}
            className={cn(
              "gt-label inline-flex cursor-pointer items-center gap-2 rounded-[30px] px-[18px] py-[10px] !tracking-[0.1em] text-ink-deep",
              actionBg,
            )}
          >
            {action}
          </a>
        ) : (
          <button
            type="button"
            onClick={() => track("chat_open", { placement: "chat-panel" })}
            className={cn(
              "gt-label inline-flex cursor-pointer items-center gap-2 rounded-[30px] px-[18px] py-[10px] !tracking-[0.1em] text-ink-deep",
              actionBg,
            )}
          >
            {action}
          </button>
        )}
      </div>
    </div>
  );
}
