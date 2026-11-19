import { useState } from 'react';
import { Bean, Menu as MenuIcon, X } from 'lucide-react';

/** Ссылки верхней навигации. Кнопка «Меню» ведёт туда же. */
const LINKS = [
  { href: '#about', label: 'О кофейне' },
  { href: '#contacts', label: 'Контакты' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-espresso/10 bg-cream">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-6">
        {/* Логотип: название + простой графический знак */}
        <a href="#hero" className="flex items-center gap-2.5" aria-label="Black Bean — на главную">
          <Bean size={18} strokeWidth={1.5} className="text-latte-deep" aria-hidden="true" />
          <span className="font-display text-[22px] leading-none">Black Bean</span>
        </a>

        {/* Десктоп: ссылки слева от кнопки, без лишнего декора */}
        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[14px] text-espresso-soft transition-colors duration-150 hover:text-espresso"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#menu"
            className="rounded-[8px] bg-latte px-4 py-2 text-[14px] font-medium text-espresso transition-colors duration-150 hover:bg-latte/85"
          >
            Меню
          </a>
        </nav>

        {/* Мобильные: одна кнопка раскрытия */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          className="-mr-2 flex h-10 w-10 items-center justify-center rounded-[8px] text-espresso transition-colors duration-150 hover:bg-espresso/5 md:hidden"
        >
          {menuOpen ? <X size={18} strokeWidth={1.5} /> : <MenuIcon size={18} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Раскрытая мобильная навигация */}
      {menuOpen && (
        <div id="mobile-nav" className="menu-panel border-t border-espresso/10 bg-cream md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-6 py-2">
            <a
              href="#menu"
              onClick={() => setMenuOpen(false)}
              className="border-b border-espresso/10 py-3 text-[15px] text-espresso"
            >
              Меню
            </a>
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-espresso/10 py-3 text-[15px] text-espresso last:border-b-0"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
