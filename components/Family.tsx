"use client";

import Image from "next/image";
import { useState } from "react";
import { HEROES, LORE, heroById, type Hero } from "@/data/heroes";
import { useSelectedHero } from "./SelectedHero";

const RINGS_WORD = ["—", "одно", "два", "три"];

/** «ОнаМояАнкаАньки» → переносы только на стыках слов. */
const splitName = (name: string) =>
  name.split(/(?=[А-ЯЁ])/).flatMap((part, i) => (i ? [<wbr key={i} />, part] : [part]));

function Figure({ hero, big }: { hero: Hero; big?: boolean }) {
  if (hero.art) {
    return <Image src={hero.art.src} width={hero.art.w} height={hero.art.h} alt={`${hero.role} ${hero.name}`} />;
  }
  const { src, w, h } = hero.silhouette;
  return (
    <Image className={big ? "sil-big" : "sil"} src={src} width={w} height={h} alt={`Силуэт: ${hero.role.toLowerCase()}`} />
  );
}

export default function Family() {
  const { selected, select } = useSelectedHero();
  const [loreOpen, setLoreOpen] = useState(false);
  const hero = heroById(selected);
  const lore = LORE[hero.id];

  const choose = (id: Hero["id"]) => {
    select(id);
    setLoreOpen(false);
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
              {h.art ? <Figure hero={h} /> : <span className="sil-wrap"><Figure hero={h} /></span>}
            </span>
            <span className="role">{h.role.toLowerCase()}</span>
            <span className="nm">{splitName(h.name)}</span>
            <span className="dots" aria-label={`колец: ${h.rings}`}>
              {Array.from({ length: h.rings }, (_, i) => <i key={i} />)}
            </span>
          </button>
        ))}
      </div>

      <article className="detail" id="detail" aria-live="polite">
        <div className="art">
          <Figure hero={hero} big />
          {!hero.art && <span className="soon">портрет скоро появится</span>}
        </div>
        <div className="txt">
          <span className="role-l">{hero.role.toLowerCase()} · {hero.title}</span>
          <h3>{hero.name}</h3>
          <div className="facts">
            <div className="fact"><small>символ</small><span>{hero.symbol}</span></div>
            <div className="fact"><small>колец на лице</small><span>{RINGS_WORD[hero.rings]}</span></div>
            <div className="fact"><small>где искать</small><span>{hero.place}</span></div>
          </div>
          <p>{hero.about}</p>
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
      </article>
    </>
  );
}
