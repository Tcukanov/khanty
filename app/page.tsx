import Image from "next/image";
import Sky from "@/components/Sky";
import Family from "@/components/Family";
import Wish from "@/components/Wish";
import RouteMap from "@/components/RouteMap";
import CopyTag from "@/components/CopyTag";
import { SelectedHeroProvider } from "@/components/SelectedHero";
import { HEROES } from "@/data/heroes";

const Logo = () => <span className="logo-m" role="img" aria-label="Варты" />;

const CITY_LIGHTS = [
  [560, 176, 3], [578, 170, 3], [600, 178, 2], [622, 166, 3], [646, 174, 2], [668, 162, 3], [690, 172, 3],
  [714, 168, 2], [736, 160, 3], [760, 172, 2], [782, 166, 3], [806, 176, 2], [830, 170, 3], [852, 178, 2],
];

function Landscape() {
  return (
    <svg className="land" viewBox="0 0 1440 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="river" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#2a3f72" />
          <stop offset="1" stopColor="#182a52" />
        </linearGradient>
        <path id="spruce" d="M0 0 L-9 16 L-4 16 L-13 32 L-6 32 L-17 50 L17 50 L6 32 L13 32 L4 16 L9 16 Z" />
      </defs>
      {/* огоньки города за рекой */}
      <g fill="#ffd98a">
        {CITY_LIGHTS.map(([x, y, s]) => <rect key={x} x={x} y={y} width={s} height={s} />)}
      </g>
      <path
        d="M520 184 h40 v-14 h14 v-10 h16 v24 h30 v-26 h12 v-8 h10 v34 h40 v-30 h18 v30 h30 v-40 h14 v40 h40 v-20 h22 v20 h30 v-12 h20 v12 h40 v8 H520z"
        fill="#1b2a4d"
        opacity=".9"
      />
      <path d="M0 200 C 300 186, 600 196, 900 188 S 1300 196, 1440 190 L1440 240 L0 240Z" fill="url(#river)" />
      <path
        d="M200 208 h80 M640 204 h120 M1000 210 h60 M380 222 h50 M1180 218 h90"
        stroke="#ffd98a"
        strokeOpacity=".35"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M0 236 C 220 214, 420 250, 660 232 S 1100 214, 1440 238 L1440 420 L0 420Z" fill="#132041" />
      <g fill="#0f1a36">
        {[[60, 196], [110, 206], [150, 192], [1300, 196], [1350, 206], [1400, 190], [1250, 210], [30, 214]].map(([x, y]) => (
          <use key={x} href="#spruce" x={x} y={y} />
        ))}
      </g>
      <path d="M0 300 C 260 262, 520 300, 760 286 S 1200 262, 1440 298 L1440 420 L0 420Z" fill="#0e1830" />
      <g fill="#0a1226">
        {[[40, 230, 1.8], [120, 250, 1.4], [1340, 236, 1.9], [1410, 250, 1.4], [1260, 256, 1.2]].map(([x, y, s]) => (
          <use key={x} href="#spruce" transform={`translate(${x} ${y}) scale(${s})`} />
        ))}
      </g>
      <path d="M0 360 C 360 330, 1080 330, 1440 360 L1440 420 L0 420Z" fill="#0f1830" />
    </svg>
  );
}

const RINGS = [
  [3, "Три кольца", "бабушка и дедушка"],
  [2, "Два кольца", "мама и отец"],
  [1, "Одно кольцо", "сын и дочь"],
] as const;

const SUPPORT = [
  ["Стать спонсором новой фигурки", "Ваша компания может помочь новому Варту переехать из тайги в город — и стать частью легенды Нижневартовска."],
  ["Сувениры", "Маленькие Варты, открытки и значки с кольцами — чтобы хранитель был рядом и дома."],
];

export default function Home() {
  return (
    <SelectedHeroProvider>
      <nav className="nav" aria-label="Разделы">
        <div className="wrap">
          <a className="brand" href="#top" aria-label="Варты — наверх"><Logo /></a>
          <ul>
            <li><a href="#legend">Легенда</a></li>
            <li><a href="#family">Знакомство</a></li>
            <li><a href="#wish">Добрый знак</a></li>
            <li><a href="#route">Маршрут</a></li>
            <li><a href="#support">Участвовать</a></li>
          </ul>
          <a className="cta-mini" href="#route">Маршрут</a>
        </div>
      </nav>

      <header className="hero" id="top">
        <Sky />
        <Landscape />
        <div className="wrap hero-inner">
          <span className="eyebrow sc">легенды города эН</span>
          <Logo />
          <h1>Таинственные хранители</h1>
          <p className="h1-sub">
            Они пришли из тайги, став горожанами. Теперь сохраняют свой город и оберегают его жителей.
          </p>
          <p className="lead">
            Найдите бронзовых Вартов на улицах Нижневартовска, раскройте все секреты хранителей, потрите «добрый знак» —
            и пусть удача найдёт вас так же легко, как белка находит шишку.
          </p>
          <div className="btns">
            <a className="btn" href="#route">Пройти маршрут</a>
            <a className="btn ghost" href="#legend">Прочитать легенду</a>
          </div>
          <div className="spacer" />
        </div>
        <div className="family">
          {HEROES.map((h) => (
            <a key={h.id} href="#family" className="mystery-fig" aria-label="Кто это? Познакомиться с Вартами">
              <Image src={h.silhouette.src} width={h.silhouette.w} height={h.silhouette.h} alt="" priority />
              <span aria-hidden="true">?</span>
            </a>
          ))}
        </div>
      </header>

      <div className="ornament" />

      <section className="page" id="legend">
        <div className="wrap">
          <span className="kicker">Легенда</span>
          <h2>Легенда о Вартах и добрых знаках</h2>
          <div className="legend-grid">
            <div className="story">
              <p>
                Далеко в северной тайге живут <b>таинственные хранители — Варты</b>. По‑хантыйски «варты» означает
                «защитники‑хранители». Лицо у каждого Варта есть — но не такое, как у людей. На гладкой поверхности, где у
                человека черты, у Вартов — <b>круги</b>: мягкие, круглые, как солнце, как круги на воде от брошенного
                камня или как кольца на спиле старого кедра.
              </p>
              <p>
                Каждый из Вартов несёт своё предназначение и <b>свой символ</b> — живое существо, с которым он связан. А
                ещё у каждой фигурки есть свой <b>«добрый знак»</b> — место, которое принято потирать на удачу. Люди
                шепчут: если прикоснуться к нему с чистым сердцем, Варты тихо улыбнутся и помогут.
              </p>
              <p>
                Однажды сын залез на самое высокое дерево и увидел за рекой <b>огоньки — город Нижневартовск</b>. Вечером
                за чаем, в семейном кругу, Варты решили:
              </p>
              <p className="quote">«Лес научил нас беречь и заботиться — почему бы не поделиться этим с людьми?»</p>
              <p>
                Варты собрались и <b>переехали в Нижневартовск</b>. Каждый выбрал себе место: бабушка — у этнодеревни за
                городом, дедушка — у краеведческого музея, мама — у центральной библиотеки, отец — на набережной, дочь — у
                драмтеатра, сын — у Центра национальных культур. А <b>место чайника определят сами жители</b>: очаг не
                назначают, его выбирают.
              </p>
              <p>
                Варты стали <b>бронзовыми</b> — маленькими, незаметными на первый взгляд. Но они по‑прежнему здесь. Лес не
                обижается — он знает, что дети вырастают и уходят делиться тем, чему их научили. Варты не ушли из леса.
                Они расширяют его границы — до самого Нижневартовска.
              </p>
              <p>
                <b>Слухи о городе стали расходиться по окрестным лесам</b>, и новые Варты уже думают о переезде в
                Нижневартовск.
              </p>
            </div>
            <aside className="rings-card" aria-label="Кольца на лицах Вартов">
              <h3>Кольца на лице</h3>
              <p className="intro">
                Кольца нельзя заработать или нарисовать: они проступают сами — не по годам, а по тому, как Варт узнаёт
                мир.
              </p>
              {RINGS.map(([n, t, who]) => (
                <div className="ring-row" key={n}>
                  <div className="ring-demo" data-n={n}><i /><i /><i /></div>
                  <div><b>{t}</b><span>{who}</span></div>
                </div>
              ))}
              <p className="note">Чем больше колец, тем старше Варт — как кольца на спиле дерева.</p>
            </aside>
          </div>
        </div>
      </section>

      <div className="ornament dark" />

      <section className="dark-sec" id="family">
        <div className="wrap">
          <span className="kicker">Знакомство</span>
          <h2>Познакомьтесь с Вартами</h2>
          <p className="sub">
            Семь хранителей — у каждого свой символ, своё место в городе и свой добрый знак. А восьмой ещё в пути.
            Нажмите на героя, чтобы узнать его историю.
          </p>
          <Family />
        </div>
      </section>

      <div className="ornament" />

      <section className="page" id="wish">
        <div className="wrap">
          <span className="kicker">Добрый знак</span>
          <h2>Чего вам сейчас не хватает?</h2>
          <Wish />
        </div>
      </section>

      <div className="ornament dark" />

      <section className="dark-sec" id="route">
        <div className="wrap">
          <span className="kicker">Маршрут</span>
          <h2>По следам Вартов</h2>
          <p className="sub">
            Пройдите по городу и познакомьтесь с каждым. Нажмите на хранителя в списке, чтобы узнать его историю.
          </p>
          <RouteMap />
          <p className="route-note">
            Место для чайника НашШайпута выберут жители Нижневартовска — голосование скоро откроется.
          </p>
        </div>
      </section>

      <div className="ornament" />

      <section className="page" id="rules">
        <div className="wrap">
          <span className="kicker">Как общаться с Вартами</span>
          <h2>Четыре простых правила</h2>
          <div className="rules">
            <div className="rule">
              <svg className="ico" viewBox="0 0 64 64" aria-hidden="true">
                <circle cx="32" cy="32" r="28" fill="none" stroke="#b8432b" strokeWidth="3" />
                <circle cx="32" cy="32" r="18" fill="none" stroke="#e9b949" strokeWidth="3" />
                <circle cx="32" cy="32" r="8" fill="#3f5fae" />
              </svg>
              <h3>Найдите</h3>
              <p>Варты маленькие и незаметные на первый взгляд. Смотрите внимательно — как дедушка, который слышит шёпот леса.</p>
            </div>
            <div className="rule">
              <svg className="ico" viewBox="0 0 64 64" aria-hidden="true">
                <path d="M20 40c0-10 4-22 10-22s4 10 6 12 8-2 10 2-6 18-16 18c-6 0-10-4-10-10z" fill="none" stroke="#b8432b" strokeWidth="3" strokeLinejoin="round" />
                <path d="M44 14l4-6M50 20l6-3M40 10l-1-6" stroke="#e9b949" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <h3>Потрите знак</h3>
              <p>У каждого Варта — своё место на удачу. Трите бережно и с чистым сердцем: так Варты тихо улыбнутся и помогут.</p>
            </div>
            <div className="rule">
              <svg className="ico" viewBox="0 0 64 64" aria-hidden="true">
                <rect x="8" y="8" width="20" height="20" rx="3" fill="none" stroke="#b8432b" strokeWidth="3" />
                <rect x="36" y="8" width="20" height="20" rx="3" fill="none" stroke="#b8432b" strokeWidth="3" />
                <rect x="8" y="36" width="20" height="20" rx="3" fill="none" stroke="#b8432b" strokeWidth="3" />
                <rect x="14" y="14" width="8" height="8" fill="#3f5fae" />
                <rect x="42" y="14" width="8" height="8" fill="#3f5fae" />
                <rect x="14" y="42" width="8" height="8" fill="#3f5fae" />
                <path d="M38 38h6v6h-6zM48 38h8M38 50h8v6M52 46v10" stroke="#e9b949" strokeWidth="3" fill="none" />
              </svg>
              <h3>Отсканируйте QR‑код</h3>
              <p>Рядом с каждой фигуркой есть табличка с QR‑кодом. Наведите камеру — и узнайте легенду своего Варта.</p>
            </div>
            <div className="rule">
              <svg className="ico" viewBox="0 0 64 64" aria-hidden="true">
                <rect x="10" y="18" width="44" height="32" rx="8" fill="none" stroke="#b8432b" strokeWidth="3" />
                <circle cx="32" cy="34" r="9" fill="none" stroke="#e9b949" strokeWidth="3" />
                <rect x="22" y="12" width="12" height="6" rx="2" fill="#3f5fae" />
              </svg>
              <h3>Поделитесь</h3>
              <p>Сфотографируйтесь с хранителем и расскажите о встрече — пусть и другие найдут дорогу к Вартам.</p>
            </div>
          </div>
          <CopyTag tag="#ВартыНВ" />
        </div>
      </section>

      <div className="ornament dark" />

      <section className="dark-sec" id="support">
        <div className="wrap">
          <span className="kicker">Участвовать</span>
          <h2>Помогите Вартам расширить лес</h2>
          <p className="sub">
            Новые Варты уже собираются в путь. Помогите им переехать — или заберите частичку хранителей домой.
          </p>
          <div className="support">
            {SUPPORT.map(([t, d], i) => (
              <div className={i === 0 ? "sup feature" : "sup"} key={t}>
                <span className="soon-pill">{i === 0 ? "для компаний" : "скоро"}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="foot-brand">
            <Logo />
            <p>Варты — хранители Нижневартовска. Тексты о культуре ханты подготовлены краеведами.</p>
          </div>
          <div className="grant">
            <p>Проект реализован при поддержке гранта Губернатора Югры</p>
            <Image src="/img/grant-yugra.svg" width={782} height={298} alt="Грант Губернатора Югры" />
          </div>
        </div>
        <div className="wrap legal">
          <span>© ИП Ольховский А. В., 2026</span>
          <span>ФУТУФ</span>
        </div>
      </footer>
    </SelectedHeroProvider>
  );
}
