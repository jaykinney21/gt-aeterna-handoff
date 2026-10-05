import { cn } from "@/lib/utils";

/**
 * The AETERNA urn — a pure-CSS sculpture (lid, neck, body, base, cast shadow),
 * gilded with the brand gold. `turning` adds the slow gtTurn rock (disabled under
 * reduced motion via [data-motion]). Shared by both variants' urn sections.
 *
 * This is the seam where Variant B's real react-three-fiber urn would later drop in.
 */
import type { UrnPalette } from "@/lib/pricing";

const GOLD: UrnPalette = {
  lid: "linear-gradient(100deg,#f0d6a8,#B98E54 55%,#6b5326)",
  neck: "linear-gradient(100deg,#caa873,#7a5e34)",
  body: "radial-gradient(58% 46% at 32% 28%, #f2dcb2 0%, #c79a5e 42%, #7a5a2e 78%, #4a3719 100%)",
  base: "linear-gradient(100deg,#caa873,#5e4622)",
  glow: "rgba(185,142,84,.4)",
  bodyShadow:
    "inset -32px -15px 66px rgba(0,0,0,.55), inset 24px 11px 52px rgba(246,241,231,.3)",
};

export function UrnSculpture({
  turning = true,
  compact = false,
  palette = GOLD,
  className,
}: {
  turning?: boolean;
  compact?: boolean;
  /** colorway (lib/pricing URNS palettes); defaults to the original gold */
  palette?: UrnPalette;
  className?: string;
}) {
  const body = compact
    ? { w: 166, h: 218 }
    : { w: 176, h: 232 };
  const lid = compact ? { w: 66, h: 26 } : { w: 70, h: 28 };
  const neck = compact ? { w: 52, h: 12 } : { w: 56, h: 13 };
  const base = compact ? { w: 84, h: 22 } : { w: 90, h: 24 };
  const cast = compact ? 200 : 220;
  const bodyShadow = palette.bodyShadow;

  return (
    <div
      className={cn(
        "relative flex flex-col items-center",
        className,
      )}
      style={{ filter: "drop-shadow(0 40px 50px rgba(0,0,0,.55))" }}
    >
      <div
        {...(turning ? { "data-motion": true } : {})}
        className="flex flex-col items-center"
        style={turning ? { animation: "gtTurn 16s ease-in-out infinite" } : undefined}
      >
        <div
          style={{
            width: lid.w,
            height: lid.h,
            borderRadius: "50% 50% 42% 42%",
            background: palette.lid,
          }}
        />
        <div
          style={{
            width: neck.w,
            height: neck.h,
            marginTop: -3,
            background: palette.neck,
          }}
        />
        <div
          style={{
            width: body.w,
            height: body.h,
            marginTop: -4,
            borderRadius: "46% 46% 40% 40% / 32% 32% 60% 60%",
            background: palette.body,
            boxShadow: bodyShadow,
          }}
        />
        <div
          style={{
            width: base.w,
            height: base.h,
            marginTop: -9,
            borderRadius: "36%",
            background: palette.base,
          }}
        />
      </div>
      <div
        style={{
          width: cast,
          height: 28,
          marginTop: 8,
          borderRadius: "50%",
          background: `radial-gradient(closest-side, ${palette.glow}, transparent)`,
          filter: "blur(6px)",
        }}
      />
    </div>
  );
}
