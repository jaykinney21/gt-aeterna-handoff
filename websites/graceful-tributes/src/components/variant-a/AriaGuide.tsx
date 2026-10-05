import { ChatPanel } from "@/components/shared/ChatPanel";
import { FaithChat } from "@/components/shared/FaithChat";
import { MonoLabel } from "@/components/shared/MonoLabel";
import { INTEGRATIONS, mailtoHref } from "@/lib/site-config";
import * as A from "@/lib/content/variant-a";
import { faith } from "@/lib/content/faith";

/**
 * "Care guide" — copy left, chat right (themed to Variant A vars).
 * `live` swaps the Aria mock for the real Faith chat (the /a2 preview);
 * the /a test page keeps the mock untouched so the A/B test stays clean.
 */
export function AriaGuide({ live = false }: { live?: boolean }) {
  const copy = live ? faith.section : A.aria;
  return (
    <section aria-label="Faith care guide" className="bg-[var(--va-paper)]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-6 py-[96px] md:grid-cols-[0.85fr_1.15fr] md:gap-12 md:px-16">
        <div>
          <MonoLabel className="mb-[18px] block !text-[11px] text-sage">
            {copy.kicker}
          </MonoLabel>
          <h2
            className="font-display font-light leading-[1.08] text-[var(--va-ink)]"
            style={{ fontSize: "clamp(32px, 4.4vw, 44px)" }}
          >
            {copy.headline}
          </h2>
          <p className="mt-[18px] max-w-[360px] text-[15px] leading-[1.7] text-[var(--va-muted)]">
            {copy.body}
          </p>
        </div>

        {live ? (
          <FaithChat variant="a" />
        ) : (
          <ChatPanel
            tone="va"
            avatarVariant="aria"
            name={A.aria.chat.name}
            status={A.aria.chat.status}
            avatar={A.aria.chat.avatar}
            messages={A.aria.chat.messages}
            placeholder={A.aria.chat.placeholder}
            action={A.aria.chat.action}
            actionHref={INTEGRATIONS.chatUrl || mailtoHref("Speak with a coordinator")}
          />
        )}
      </div>
    </section>
  );
}
