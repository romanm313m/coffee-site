import { DRINKS, formatPrice } from '../data/menu';
import { Reveal } from './Reveal';

/**
 * Меню — печатная таблица, а не сетка одинаковых плиток:
 * волосяные линейки вместо рамок, цены выровнены в одну колонку справа.
 */
export function MenuSection() {
  return (
    <section id="menu" className="mx-auto max-w-6xl px-6 py-20 md:py-32">
      <Reveal>
        <p className="text-[13px] text-espresso-muted">Меню</p>
        <h2 className="mt-5 font-display text-[40px] leading-[1.05] tracking-[-0.02em] md:text-[56px]">
          Что мы завариваем
        </h2>
        <p className="mt-6 max-w-[46ch] text-[15px] leading-[1.65] text-espresso-soft">
          Цены указаны за один объём. Молоко альтернативное — овсяное и миндальное — без доплаты.
        </p>
      </Reveal>

      {/* Таблица меню: рамка собирается из границ ячеек */}
      <div className="mt-14 grid grid-cols-1 border-l border-t border-espresso/10 md:mt-20 md:grid-cols-2">
        {DRINKS.map((drink, index) => (
          <Reveal
            key={drink.index}
            delay={(index % 2) * 60}
            className="border-b border-r border-espresso/10"
          >
            <article className="flex h-full flex-col justify-between p-6 transition-colors duration-150 hover:bg-cream-card md:p-8">
              {/* Название и цена в одной строке, цена прижата вправо */}
              <div className="flex items-start justify-between gap-6">
                <div>
                  <span className="text-[12px] tabular-nums text-espresso-muted">{drink.index}</span>
                  <h3 className="mt-2 text-[19px] font-medium">{drink.name}</h3>
                </div>
                <span className="text-[19px] font-medium tabular-nums">{formatPrice(drink.price)}</span>
              </div>

              <p className="mt-4 max-w-[38ch] text-[14px] leading-[1.55] text-espresso-soft">
                {drink.description}
              </p>

              {/* Фирменная деталь: лот и дата обжарки партии */}
              <div className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-espresso-muted">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-latte-deep" aria-hidden="true" />
                <span>{drink.lot}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{drink.roasted}</span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
