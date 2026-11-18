import { siteConfig } from './site.config';
import { mountPage } from './lib/page';
import { renderHero } from './components/hero';
import { renderMarquee } from './components/marquee';
import { renderWorksSection } from './components/works';
import { renderServicesSection } from './components/services';
import { renderClientsSection } from './components/clients';
import { renderVoicesSection } from './components/testimonials';
import { renderCtaSection } from './components/cta';

/**
 * トップページの組み立て。
 * セクションの表示・順序は site.config.ts の sections で制御し、
 * 番号（01 / 02 ...）は有効なセクションの並びから自動採番する。
 */
export function initApp(): void {
  const s = siteConfig.sections;
  const sequence: Array<{ enabled: boolean; render: (num: string) => string }> = [
    { enabled: s.works.enabled, render: renderWorksSection },
    { enabled: s.services.enabled, render: renderServicesSection },
    { enabled: s.clients.enabled, render: renderClientsSection },
    { enabled: s.voices.enabled, render: renderVoicesSection },
    { enabled: s.contact.enabled, render: renderCtaSection },
  ];

  let n = 0;
  const sections = sequence
    .filter((sec) => sec.enabled)
    .map((sec) => sec.render(String(++n).padStart(2, '0')));

  mountPage('home', [renderHero(), renderMarquee(), ...sections]);
}
