"use client";

import { useEffect, useRef, useState } from "react";

const tinyThings = [
  { front: "Хаус", back: "Смотреть, гадать, возмущаться — и больше смотреть на твою реакцию, чем на серию." },
  { front: "Игры", back: "Проходить вместе и ждать каждого твоего «вааа» — отдельный вид счастья." },
  { front: "Тиктоки", back: "Уже попрощались. Уже пожелали спокойной ночи. Но вот ещё один. И ещё." },
  { front: "Вкусности", back: "Запомнить случайно сказанное и однажды принести именно это." },
  { front: "Как ты?", back: "Не формальность. Мне правда важно, как ты себя чувствуешь." },
  { front: "Просто рядом", back: "Иногда лучший план — ничего особенного. Только ты, я и спокойствие." },
];

const traits = [
  ["твоя прямота", "Ты умеешь говорить как есть. Даже когда это неудобно — и я ценю это."],
  ["твои реакции", "Живые, смешные, иногда хаотичные. Именно поэтому мне никогда не скучно."],
  ["твой ум", "Мне нравится, как ты думаешь, замечаешь и собираешь свой взгляд на мир."],
  ["твоя нежность", "Она не показная. Поэтому каждый раз ощущается по-настоящему."],
];

function PageShell({
  number,
  children,
  tone = "paper",
}: {
  number: string;
  children: React.ReactNode;
  tone?: string;
}) {
  return (
    <article className={`book-page tone-${tone}`}>
      <div className="page-top"><span>как я тебя люблю</span><b>{number}</b></div>
      {children}
      <div className="page-stitch" aria-hidden="true" />
    </article>
  );
}

function Cover() {
  return (
    <article className="book-page cover-page">
      <div className="cover-label">ТОЛЬКО ДЛЯ ТЕБЯ</div>
      <div className="cover-copy">
        <span>очень маленькая книжка</span>
        <h1>Как я<br />тебя<br /><em>люблю.</em></h1>
        <p>Без особого повода.<br />Просто потому что это правда.</p>
      </div>
      <div className="cover-mark" aria-hidden="true"><i>я</i><b>→</b><i>ты</i></div>
      <div className="cover-sign">faith / 2026</div>
    </article>
  );
}

function TraitsPage() {
  const [active, setActive] = useState(0);
  return (
    <PageShell number="01 / 06" tone="cream">
      <div className="trait-layout">
        <div className="trait-title">
          <span>Я ЛЮБЛЮ</span>
          <h2>Как устроен<br />твой мир.</h2>
          <p>Мне нравится не только то, как ты выглядишь. Мне нравится вся ты.</p>
        </div>
        <div className="trait-picker" role="group" aria-label="Что я люблю в тебе">
          {traits.map(([name], index) => (
            <button key={name} type="button" onClick={() => setActive(index)} className={active === index ? "active" : ""}>
              <i>{String(index + 1).padStart(2, "0")}</i><span>{name}</span>
            </button>
          ))}
        </div>
        <div className="trait-answer" key={active}>
          <span>{traits[active][0]}</span>
          <p>{traits[active][1]}</p>
        </div>
      </div>
    </PageShell>
  );
}

function ThingsPage() {
  const [flipped, setFlipped] = useState<number[]>([]);
  const toggle = (index: number) => {
    setFlipped((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);
  };
  return (
    <PageShell number="02 / 06" tone="lavender">
      <div className="things-head">
        <span>Я ЛЮБЛЮ</span>
        <h2>Наше<br />маленькое.</h2>
        <p>Нажми на любую карточку.</p>
      </div>
      <div className="thing-grid">
        {tinyThings.map((thing, index) => (
          <button type="button" key={thing.front} className={flipped.includes(index) ? "thing-card flipped" : "thing-card"} onClick={() => toggle(index)} aria-pressed={flipped.includes(index)}>
            <span className="thing-front"><i>0{index + 1}</i><b>{thing.front}</b><small>нажми ↗</small></span>
            <span className="thing-back"><i>0{index + 1}</i><p>{thing.back}</p><small>назад ↙</small></span>
          </button>
        ))}
      </div>
    </PageShell>
  );
}

function BalancePage() {
  const [value, setValue] = useState(50);
  const left = Math.max(0, Math.round((50 - value) * 2));
  const right = Math.max(0, Math.round((value - 50) * 2));
  return (
    <PageShell number="03 / 06" tone="blue">
      <div className="balance-page">
        <span className="section-label">Я ХОЧУ ЛЮБИТЬ ТЕБЯ</span>
        <h2>Близко.<br /><em>Но бережно.</em></h2>
        <p className="balance-lead">Так, чтобы ты чувствовала мою любовь и всё равно всегда оставалась собой.</p>
        <div className="balance-control">
          <div className="balance-words"><span>быть рядом</span><span>оставлять воздух</span></div>
          <input type="range" min="0" max="100" value={value} onChange={(event) => setValue(Number(event.target.value))} aria-label="Баланс близости и свободы" />
          <div className="balance-result">
            {left > 0 && <p>Ещё немного доверия.</p>}
            {right > 0 && <p>Ещё немного ближе.</p>}
            {left === 0 && right === 0 && <p>Вот так. Рядом — и свободно.</p>}
          </div>
        </div>
        <blockquote>«К тебе просто какие-то доверие и спокойствие».</blockquote>
      </div>
    </PageShell>
  );
}

function UsPage() {
  const [future, setFuture] = useState(28);
  return (
    <PageShell number="04 / 06" tone="peach">
      <div className="us-layout">
        <div className="our-photo">
          <img src="media/our-frame.jpg" alt="Символический рисунок нас двоих" />
          <span>вот так рядом / желательно всегда</span>
        </div>
        <div className="us-copy">
          <span>Я ЛЮБЛЮ</span>
          <h2>Наше<br />сейчас.<br /><em>И наше<br />потом.</em></h2>
          <p style={{ opacity: .62 + future / 265 }}>
            Сегодня — ещё одна встреча, созвон или серия. Однажды — привычная жизнь, где можно проснуться рядом и спросить: «как ты?» уже не сообщением.
          </p>
          <div className="future-slider">
            <input type="range" min="0" max="100" value={future} onChange={(event) => setFuture(Number(event.target.value))} aria-label="От сейчас к будущему" />
            <div><span>сейчас</span><span>однажды</span></div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const [revealed, setRevealed] = useState(false);
  const movesRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    context.scale(dpr, dpr);
    context.fillStyle = "#d8c9ff";
    context.fillRect(0, 0, rect.width, rect.height);
    context.fillStyle = "#685a87";
    context.font = "12px Courier New";
    context.textAlign = "center";
    context.fillText("СОТРИ ЗАЩИТНЫЙ СЛОЙ", rect.width / 2, rect.height / 2 - 5);
    context.font = "italic 19px Georgia";
    context.fillText("если вдруг забудешь", rect.width / 2, rect.height / 2 + 27);
  }, []);

  const scratch = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current || revealed) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const rect = canvas.getBoundingClientRect();
    context.globalCompositeOperation = "destination-out";
    context.beginPath();
    context.arc(event.clientX - rect.left, event.clientY - rect.top, 32, 0, Math.PI * 2);
    context.fill();
    movesRef.current += 1;
    if (movesRef.current > 34) setRevealed(true);
  };

  return (
    <div className={`scratch-card ${revealed ? "revealed" : ""}`}>
      <div className="scratch-secret">
        <span>НА САМОМ ДЕЛЕ ВСЁ ПРОСТО</span>
        <h3>Ты любимая.</h3>
        <p>Не потому что сегодня всё сделала правильно. Не за хорошее настроение. Не за удобство.</p>
        <b>Просто потому что ты — это ты.</b>
      </div>
      <canvas
        ref={canvasRef}
        onPointerDown={(event) => { drawingRef.current = true; event.currentTarget.setPointerCapture(event.pointerId); scratch(event); }}
        onPointerMove={scratch}
        onPointerUp={() => { drawingRef.current = false; }}
        onPointerCancel={() => { drawingRef.current = false; }}
        onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setRevealed(true); }}
        role="button"
        tabIndex={0}
        aria-label="Стереть слой и открыть сообщение"
      />
    </div>
  );
}

function SecretPage() {
  return (
    <PageShell number="05 / 06" tone="cream">
      <div className="secret-layout">
        <div className="secret-copy">
          <span>НА СЛУЧАЙ, ЕСЛИ ЗАБУДЕШЬ</span>
          <h2>Здесь кое-что<br />важное.</h2>
          <p>Сотри пальцем или мышкой.</p>
        </div>
        <ScratchCard />
      </div>
    </PageShell>
  );
}

function FinalPage() {
  const [hugged, setHugged] = useState(false);
  return (
    <PageShell number="06 / 06" tone="red">
      <div className={`final-page ${hugged ? "hugged" : ""}`}>
        <span>ЕСЛИ СОВСЕМ КОРОТКО</span>
        <h2>Я люблю<br />тебя<br /><em>вот так.</em></h2>
        <p>Громко в словах. Тихо в мелочах. Бережно к твоим границам. С интересом к твоему миру. И с настоящим желанием быть рядом.</p>
        <button type="button" onClick={() => { setHugged(true); navigator.vibrate?.([18, 28, 35]); }}>
          <i /><span>{hugged ? "обнял. столько, сколько нужно" : "нажми, если хочешь обнимашку"}</span>
        </button>
        <div className="hug-rings" aria-hidden="true"><i /><i /><i /></div>
        <div className="final-sign">люблю тебя — faith</div>
      </div>
    </PageShell>
  );
}

export default function Home() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<"next" | "back">("next");
  const pages = [<Cover key="cover" />, <TraitsPage key="traits" />, <ThingsPage key="things" />, <BalancePage key="balance" />, <UsPage key="us" />, <SecretPage key="secret" />, <FinalPage key="final" />];

  const go = (next: number) => {
    if (next < 0 || next >= pages.length) return;
    setDirection(next > page ? "next" : "back");
    setPage(next);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") go(page + 1);
      if (event.key === "ArrowLeft") go(page - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [page]);

  return (
    <main className="love-book-site">
      <div className="desk-doodle doodle-one" aria-hidden="true">✦</div>
      <div className="desk-doodle doodle-two" aria-hidden="true">люблю</div>
      <div className="desk-doodle doodle-three" aria-hidden="true">↗</div>
      <div className={`book book-${direction}`} key={`${page}-${direction}`}>
        {pages[page]}
      </div>
      <nav className="book-nav" aria-label="Навигация по книжке">
        <button type="button" onClick={() => go(page - 1)} disabled={page === 0} aria-label="Предыдущая страница">←</button>
        <div className="page-dots">
          {pages.map((_, index) => <button type="button" key={index} onClick={() => go(index)} className={index === page ? "active" : ""} aria-label={`Страница ${index + 1}`} />)}
        </div>
        <button type="button" onClick={() => go(page + 1)} disabled={page === pages.length - 1} aria-label="Следующая страница">→</button>
      </nav>
      <p className="book-hint">листай стрелками или точками</p>
    </main>
  );
}
