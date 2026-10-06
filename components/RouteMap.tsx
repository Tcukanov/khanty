"use client";

import Image from "next/image";
import { useState } from "react";
import { STOPS, heroById, type HeroId } from "@/data/heroes";
import { useSelectedHero } from "./SelectedHero";

let n = 0;
const NUMBERED = STOPS.map((s) => ({ ...s, label: s.secret ? "?" : String(++n) }));

export default function RouteMap() {
  const { select } = useSelectedHero();
  const [hover, setHover] = useState<HeroId | null>(null);

  const go = (id: HeroId) => {
    select(id);
    document.getElementById("family")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="map-grid">
      <div className="map-box">
        <svg viewBox="0 0 700 520" role="img" aria-label="Схема маршрута Вартов по Нижневартовску">
          <defs>
            <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M28 0H0V28" fill="none" stroke="#223463" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="700" height="520" fill="#172649" />
          <rect width="700" height="520" fill="url(#grid)" />
          <path d="M-10 440 C 120 410, 220 470, 360 450 S 560 400, 710 430 L710 530 L-10 530Z" fill="#23407a" />
          <path d="M-10 452 C 120 422, 220 482, 360 462 S 560 412, 710 442" fill="none" stroke="#3a5fa3" strokeWidth="2" strokeDasharray="4 10" />
          <text className="lbl" x="560" y="486" fill="#7f95c8" fontSize="20">р. Обь</text>
          <path d="M90 80 L520 60 L560 380 L110 410 Z" fill="#1c2e58" stroke="#2c4178" strokeWidth="2" />
          <path
            d="M150 90 L170 400 M260 84 L276 396 M370 76 L390 390 M470 66 L500 384 M100 180 L535 160 M104 270 L545 250 M108 350 L553 330"
            stroke="#2c4178"
            strokeWidth="3"
          />
          <text className="city" x="300" y="46" fill="#a9b6d6" fontSize="20" textAnchor="middle">нижневартовск</text>
          <path fill="#0f1a36" d="M610 120 l-10 22 h20z M640 150 l-12 26 h24z M620 200 l-10 22 h20z M660 230 l-12 26 h24z M630 270 l-10 22 h20z M670 110 l-10 22 h20z" />
          <text className="lbl" x="628" y="330" fill="#7f95c8" fontSize="16" textAnchor="middle">тайга</text>
          <path
            d="M640 180 C 560 170, 520 120, 440 120 S 300 150, 230 140 S 150 220, 200 260 S 330 250, 360 300 S 300 400, 250 420"
            fill="none"
            stroke="#e9b949"
            strokeWidth="3"
            strokeDasharray="2 9"
            strokeLinecap="round"
          />
          {NUMBERED.map((s) => (
            <g
              key={s.hero}
              className={`pin${hover === s.hero ? " on" : ""}`}
              transform={`translate(${s.x} ${s.y})`}
              onMouseEnter={() => setHover(s.hero)}
              onClick={() => go(s.hero)}
            >
              <circle className="halo" r="20" fill={s.secret ? "rgba(169,182,214,.18)" : "rgba(233,185,73,.25)"} />
              <circle
                r="14"
                fill={s.secret ? "#172649" : "#e9b949"}
                stroke={s.secret ? "#a9b6d6" : "#0f1830"}
                strokeWidth="2"
                strokeDasharray={s.secret ? "3 3" : undefined}
              />
              <text className="num" y="6" textAnchor="middle" fontSize="16" fill={s.secret ? "#a9b6d6" : "#0f1830"}>{s.label}</text>
            </g>
          ))}
        </svg>
        <span className="caption">Схема условная — не для навигации</span>
      </div>

      <ol className="stops">
        {NUMBERED.map((s) => {
          const h = heroById(s.hero);
          return (
            <li key={s.hero}>
              <button
                type="button"
                className={hover === s.hero ? "on" : undefined}
                onMouseEnter={() => setHover(s.hero)}
                onFocus={() => setHover(s.hero)}
                onClick={() => go(s.hero)}
              >
                <span className={`thumb${s.secret ? " q" : ""}`}>
                  <Image src={h.art.src} width={h.art.w} height={h.art.h} alt="" />
                  <i>{s.label}</i>
                </span>
                <span>
                  <b>{h.role} · {h.name}</b>
                  <span>{h.place}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
