import { Instagram, Send, Youtube } from 'lucide-react';

const SOCIALS = [
  { href: 'https://t.me/blackbeancoffee', label: 'Telegram', Icon: Send },
  { href: 'https://instagram.com/blackbeancoffee', label: 'Instagram', Icon: Instagram },
  { href: 'https://youtube.com/@blackbeancoffee', label: 'YouTube', Icon: Youtube },
];

export function Footer() {
  return (
    <footer id="contacts" className="bg-espresso text-cream">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          {/* Название */}
          <div className="md:col-span-5">
            <p className="font-display text-[28px] leading-none">Black Bean</p>
            <p className="mt-4 max-w-[32ch] text-[14px] leading-[1.6] text-cream/60">
              Кофейня и обжарка. Зёрна обжариваем по вторникам, варим и завариваем на месте.
            </p>
          </div>

          {/* Адрес и часы */}
          <div className="md:col-span-3">
            <p className="text-[13px] text-cream/50">Адрес</p>
            <address className="mt-3 text-[14px] not-italic leading-[1.8] text-cream/85">
              Самара, ул. Куйбышева, 84
              <br />
              Ежедневно 08:00 — 22:00
            </address>
          </div>

          {/* Связь */}
          <div className="md:col-span-2">
            <p className="text-[13px] text-cream/50">Связь</p>
            <a
              href="tel:+78463000084"
              className="mt-3 block text-[14px] leading-[1.8] text-cream/85 transition-colors duration-150 hover:text-cream"
            >
              +7 (846) 300-00-84
            </a>
            <a
              href="mailto:hello@blackbean.coffee"
              className="block text-[14px] leading-[1.8] text-cream/85 transition-colors duration-150 hover:text-cream"
            >
              hello@blackbean.coffee
            </a>
          </div>

          {/* Соцсети */}
          <div className="md:col-span-2">
            <p className="text-[13px] text-cream/50">Мы здесь</p>
            <div className="mt-3 flex gap-3">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-cream/15 text-cream/70 transition-colors duration-150 hover:border-cream/35 hover:text-cream"
                >
                  <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-cream/10 pt-6 text-[12px] text-cream/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Black Bean Coffee</p>
          <p>Обжарка по вторникам, свежее зерно в среду</p>
        </div>
      </div>
    </footer>
  );
}
