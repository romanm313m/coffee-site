import { Reveal } from './Reveal';

/** Три факта о кофейне цифрами — без иконок и украшений. */
const FACTS = [
  { value: '2019', label: 'первая обжарка' },
  { value: '12', label: 'ферм-партнёров' },
  { value: '4', label: 'дня отдыха зерна' },
];

export function About() {
  return (
    <section id="about" className="border-t border-espresso/10 bg-cream-card">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-32">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          {/* Текст */}
          <div className="md:col-span-7">
            <Reveal>
              <p className="text-[13px] text-espresso-muted">О кофейне</p>
              <h2 className="mt-5 font-display text-[40px] leading-[1.05] tracking-[-0.02em] md:text-[56px]">
                Обжарка как ремесло
              </h2>
            </Reveal>

            <Reveal delay={60}>
              <p className="mt-8 max-w-[52ch] text-[15px] leading-[1.7] text-espresso-soft">
                Black Bean — кофейня и обжарка в одном помещении. Берём небольшие лоты, обжариваем
                их малым барабаном и даём зерну отдохнуть четыре дня перед помолом.
              </p>
              <p className="mt-4 max-w-[52ch] text-[15px] leading-[1.7] text-espresso-soft">
                Напитки собирает тот же человек, который обжаривал зёрна в тот же день. За стойкой
                нет музыки и витрины с десертами — есть свет, дерево и разговор о том, что вы
                сегодня пьёте.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-espresso/10 pt-8">
                {FACTS.map((fact) => (
                  <div key={fact.label}>
                    <dt className="sr-only">{fact.label}</dt>
                    <dd className="text-[28px] font-medium leading-none tabular-nums">{fact.value}</dd>
                    <p className="mt-2 text-[13px] leading-[1.4] text-espresso-muted">{fact.label}</p>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Фотография интерьера */}
          <Reveal delay={100} className="md:col-span-5">
            <figure className="overflow-hidden rounded-[16px]">
              <img
                src={`${import.meta.env.BASE_URL}images/about.jpg`}
                alt="Стойка кофейни: латунная кофемолка, металлические воронки и чашки на деревянной полке"
                width={1824}
                height={2154}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover"
              />
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
