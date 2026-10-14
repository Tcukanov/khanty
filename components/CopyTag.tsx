"use client";

import { useRef, useState } from "react";

export default function CopyTag({ tag }: { tag: string }) {
  const [label, setLabel] = useState("Скопировать");
  const tagRef = useRef<HTMLSpanElement>(null);

  const selectTag = () => {
    const el = tagRef.current;
    const sel = window.getSelection();
    if (!el || !sel) return;
    const r = document.createRange();
    r.selectNodeContents(el);
    sel.removeAllRanges();
    sel.addRange(r);
    setLabel("Выделено — нажмите Ctrl+C");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(tag);
      setLabel("Скопировано");
      setTimeout(() => setLabel("Скопировать"), 1800);
    } catch {
      selectTag();
    }
  };

  return (
    <div className="tag-box">
      <span className="tag" ref={tagRef}>{tag}</span>
      <p>
        Публикуйте фото с этим хэштегом и подписывайтесь на группу «Легенды города эН» ВКонтакте — там новости о
        новых Вартах и лучшие снимки участников.
      </p>
      <div className="tag-actions">
        <button className="copy" type="button" onClick={copy}>{label}</button>
        <a className="vk-btn" href="https://vk.ru/legendigorodaen" target="_blank" rel="noopener noreferrer">
          Вступить в группу ВК
        </a>
      </div>
    </div>
  );
}
