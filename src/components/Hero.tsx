import { Reveal } from './Reveal';

/**
 * Hero-сцена: фото на весь экран, заголовок лежит на спокойной светлой
 * части кадра слева. На мобильных всё складывается в колонку:
 * сначала текст, затем фотография.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-cream md:h-[calc(100svh-4rem)] md:min-h-[560px]"
    >
      {/* Текстовый блок */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-14 pb-12 md:absolute md:inset-0 md:mx-0 md:max-w-none md:p-0">
        <div className="md:mx-auto md:flex md:h-full md:max-w-6xl md:items-center md:px-6 md:pb-16">
          <div className="max-w-[34rem]">
            <Reveal>
              <p className="text-[13px] text-espresso-muted">Спешелти-кофейня · Самара</p>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 font-display text-[44px] leading-[1.04] tracking-[-0.02em] md:text-[72px] md:tracking-[-0.03em]">
                Искусство черного кофе
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-[36ch] text-[16px] leading-[1.6] text-espresso-soft md:text-[18px]">
                Обжариваем зерно на месте и завариваем без лишних слов. Шесть позиций в меню,
                каждая живёт вместе с сезонным лотом.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#menu"
                  className="rounded-[10px] bg-latte px-6 py-3 text-[15px] font-medium text-espresso transition-colors duration-150 hover:bg-latte/85"
                >
                  Меню
                </a>
                <a
                  href="#about"
                  className="rounded-[10px] border border-espresso/15 px-6 py-3 text-[15px] font-medium text-espresso transition-colors duration-150 hover:border-espresso/35 hover:bg-espresso/[0.04]"
                >
                  О кофейне
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Фотография */}
      <div className="relative z-0 md:absolute md:inset-0">
        <img
          src={`${import.meta.env.BASE_URL}images/hero.jpg`}
          alt="Эспрессо в тёмной керамической чашке на деревянной столешнице, рука баристы с темпером"
          width={2720}
          height={1356}
          fetchPriority="high"
          decoding="async"
          className="aspect-[4/5] w-full object-cover object-[62%_center] md:aspect-auto md:h-full"
        />
        <div className="hero-scrim absolute inset-0 hidden md:block" aria-hidden="true" />
      </div>
    </section>
  );
}
