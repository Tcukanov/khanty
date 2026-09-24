"use client";

import { useRef, useState } from "react";
import { WISHES, heroById } from "@/data/heroes";

function rubMessage(progress: number) {
  if (progress >= 100) return "Варт тихо улыбнулся ✦";
  if (progress === 0) return "Потрите кольцо";
  if (progress < 35) return "Бронза теплеет…";
  if (progress < 75) return "Кольца оживают…";
  return "Ещё чуть‑чуть…";
}

export default function Wish() {
  const [wish, setWish] = useState(0);
  const [rub, setRub] = useState(0);
  const last = useRef<[number, number] | null>(null);

  const w = WISHES[wish];
  const hero = heroById(w.hero);
  const sign = hero.signs[w.sign];

  const pick = (i: number) => {
    setWish(i);
    setRub(0);
  };

  const onMove = (e: React.PointerEvent) => {
    if (!last.current || rub >= 100) return;
    const d = Math.hypot(e.clientX - last.current[0], e.clientY - last.current[1]);
    last.current = [e.clientX, e.clientY];
    setRub((r) => Math.min(100, r + d / 18));
  };

  return (
    <div className="wish-wrap">
      <div>
        <p className="wish-intro">Выберите желание — подскажем, к какому Варту идти и что у него потереть.</p>
        <div className="chips" role="group" aria-label="Желания">
          {WISHES.map((x, i) => (
            <button key={x.label} className="chip" type="button" aria-pressed={i === wish} onClick={() => pick(i)}>
              {x.label}
            </button>
          ))}
        </div>
        <div className="answer" aria-live="polite">
          <div className="who">{hero.role} {hero.name}</div>
          <p className="what"><b>Потрите: {sign.what.toLowerCase()}.</b> {sign.gift}</p>
          <p className="where">где искать: {hero.place}</p>
        </div>
      </div>

      <div className="rub">
        <div
          className="rub-disc"
          role="img"
          aria-label="Бронзовое кольцо Варта — потрите, чтобы загадать"
          onPointerDown={(e) => {
            last.current = [e.clientX, e.clientY];
            e.currentTarget.setPointerCapture?.(e.pointerId);
          }}
          onPointerMove={onMove}
          onPointerUp={() => (last.current = null)}
          onPointerCancel={() => (last.current = null)}
        >
          <svg viewBox="0 0 200 200" aria-hidden="true">
            <g fill="none" strokeLinecap="round">
              {[78, 56, 34].map((r) => (
                <g key={r}>
                  <circle cx="100" cy="100" r={r} stroke="rgba(40,24,10,.45)" strokeWidth="6" />
                  <circle cx="100" cy="100" r={r} stroke="rgba(255,230,170,.25)" strokeWidth="2" transform="translate(-1 -2)" />
                </g>
              ))}
              <path
                d="M100 100 m0 -3 a3 3 0 1 1 -3 3 a7 7 0 0 1 7 -7 a11 11 0 0 1 11 11 a15 15 0 0 1 -15 15"
                stroke="rgba(40,24,10,.5)"
                strokeWidth="4"
              />
            </g>
          </svg>
          <div className="glow" style={{ "--g": ((rub / 100) * 0.9).toFixed(2) } as React.CSSProperties} />
        </div>
        <div className="meter" aria-hidden="true"><i style={{ width: `${rub}%` }} /></div>
        <p className="msg" aria-live="polite">{rubMessage(rub)}</p>
        <p className="hint">Проведите пальцем или мышкой по бронзе. С чистым сердцем — обязательно.</p>
      </div>
    </div>
  );
}
