import type { ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';

type RevealProps = {
  children: ReactNode;
  /** Дополнительные классы для сетки/раскладки */
  className?: string;
  /** Задержка появления в мс — для каскада внутри секции */
  delay?: number;
};

/**
 * Обёртка появления при скролле.
 * Сама анимация живёт в CSS (.reveal), компонент только переключает класс.
 */
export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
