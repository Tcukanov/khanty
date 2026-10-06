"use client";

import Image from "next/image";
import { useState } from "react";
import { HEROES, LORE, heroById, type Hero } from "@/data/heroes";
import { useSelectedHero, type Selection } from "./SelectedHero";

/** «ОнаМояАнкаАньки» → переносы только на стыках слов. */
const splitName = (name: string) =>
  name.split(/(?=[А-ЯЁ])/).flatMap((part, i) => (i ? [<wbr key={i} />, part] : [part]));

/** Бесформенный контур для Варта, который ещё не переехал. */
function MysteryShape({ big }: { big?: boolean }) {
  return (
    <svg className={big ? "mystery-big" : "mystery"} viewBox="0 0 160 220" aria-hidden="true">
      <path d="M80 8c38 0 66 34 66 86 0 30 8 52 6 76-2 30-30 42-72 42S8 200 8 170c0-24 8-46 6-76C14 42 42 8 80 8z" />
      <text x="80" y="132" textAnchor="middle">?</text>
    </svg>
  );
}

function Detail({ hero }: { hero: Hero }) {
  const [loreOpen, setLoreOpen] = useState(false);
  const lore = LORE[hero.id];
  return (
    <>
      <div className="art">
        <Image src={hero.art.src} width={hero.art.w} height={hero.art.h} alt={`${hero.role} ${hero.name}`} />
      </div>
      <div className="txt">
        <span className="role-l">{hero.role.toLowerCase()} · {hero.title}</span>
        <h3>{hero.name}</h3>
        <div className="facts">
          <div className="fact"><small>символ</small><span>{hero.symbol}</span></div>
          <div className="fact wide">
            <small>где искать</small>
            <span>{hero.place}</span>
            {hero.placeLink && (
              <a className="ext" href={hero.placeLink.href} target="_blank" rel="noopener noreferrer">{hero.placeLink.label} ↗</a>
            )}
          </div>
        </div>
        <p>{hero.about}</p>
        {hero.extra?.map((e) => (
          <p className="extra" key={e.text}>
            {e.text}
            {e.link && (
              <> <a className="ext" href={e.link.href} target="_blank" rel="noopener noreferrer">{e.link.label} ↗</a></>
            )}
          </p>
        ))}
        <div className="signs">
          {hero.signs.map((s) => (
            <div className="sign" key={s.what}>
              <span className="hand" aria-hidden="true">✋</span>
              <b>Потереть: {s.what.toLowerCase()}</b>
              <p>{s.gift}</p>
            </div>
          ))}
        </div>
        {lore && (
          <>
            <button className="more" type="button" aria-expanded={loreOpen} onClick={() => setLoreOpen((o) => !o)}>
              {loreOpen ? "Свернуть рассказ" : "Рассказ краеведов"}
            </button>
            {loreOpen && (
              <div className="lore">
                <span className="by">{hero.role} в хантыйской семье — рассказывают краеведы</span>
                {lore.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

function MysteryDetail() {
  return (
    <>
      <div className="art"><MysteryShape big /></div>
      <div className="txt">
        <span className="role-l">??? · ещё в пути</span>
        <h3>Кто‑то новый</h3>
        <p>
          Слухи о городе разошлись по окрестным лесам, и новые Варты уже думают о переезде в Нижневартовск. Кто
          это будет, какой у него символ и где он поселится — пока тайна.
        </p>
        <a className="btn" href="#support">Помочь новому Варту переехать</a>
      </div>
    </>
  );
}

export default function Family() {
  const { selected, select } = useSelectedHero();

  const choose = (id: Selection) => {
    select(id);
    requestAnimationFrame(() => document.getElementById("detail")?.scrollIntoView({ behavior: "smooth", block: "nearest" }));
  };

  return (
    <>
      <div className="shelf" role="group" aria-label="Герои">
        {HEROES.map((h) => (
          <button
            key={h.id}
            className="hero-btn"
            type="button"
            aria-pressed={h.id === selected}
            aria-controls="detail"
            onClick={() => choose(h.id)}
          >
            <span className="fig">
              <Image src={h.art.src} width={h.art.w} height={h.art.h} alt={`${h.role} ${h.name}`} />
            </span>
            <span className="role">{h.role.toLowerCase()}</span>
            <span className="nm">{splitName(h.name)}</span>
          </button>
        ))}
        <button
          className="hero-btn unknown"
          type="button"
          aria-pressed={selected === "new"}
          aria-controls="detail"
          onClick={() => choose("new")}
        >
          <span className="fig"><MysteryShape /></span>
          <span className="role">???</span>
          <span className="nm">???</span>
          <span className="role">???</span>
        </button>
      </div>

      <article className="detail" id="detail" aria-live="polite">
        {selected === "new" ? <MysteryDetail /> : <Detail key={selected} hero={heroById(selected)} />}
      </article>
    </>
  );
}
