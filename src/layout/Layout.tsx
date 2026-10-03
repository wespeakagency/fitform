import React, { useEffect } from 'react';
import { Navbar } from '@/layout/Navbar';
import { Footer } from '@/layout/Footer';
import { Modal } from '@/components/Modal';
import { useLocation } from 'react-router-dom';
import { PRIVACY_CONTENT } from '@/data/privacy';
import { TERMS_CONTENT } from '@/data/terms';
import type { PolicyContent } from '@/types';

interface LayoutProps {
  children: React.ReactNode;
  isPrivacyOpen: boolean;
  setIsPrivacyOpen: (open: boolean) => void;
  isTermsOpen: boolean;
  setIsTermsOpen: (open: boolean) => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  isPrivacyOpen,
  setIsPrivacyOpen,
  isTermsOpen,
  setIsTermsOpen,
}) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const renderPolicyContent = (content: PolicyContent) => (
    <>
      {content.intro ? <p>{content.intro}</p> : null}
      {content.sections.map((section) => (
        <section
          key={section.title}
          className={
            section.variant === 'highlight'
              ? 'rounded-2xl border border-fitform-teal/25 bg-fitform-teal/5 dark:border-fitform-teal/40 dark:bg-fitform-teal/10 p-5 space-y-4'
              : 'space-y-4'
          }
        >
          <p className={section.variant === 'highlight' ? 'text-fitform-navy dark:text-white' : undefined}>
            <strong>{section.title}</strong>
          </p>
          {section.paragraphs.map((paragraph, index) => (
            <div key={`${section.title}-${index}`} className="space-y-2">
              <p>
                {paragraph.emphasis ? (
                  <>
                    <strong>{paragraph.emphasis}{paragraph.separator ?? ':'}</strong>{' '}
                  </>
                ) : null}
                {paragraph.text ?? null}
                {paragraph.link ? (
                  <>
                    <a
                      href={paragraph.link.href}
                      className="text-fitform-navy dark:text-fitform-teal underline"
                    >
                      {paragraph.link.label}
                    </a>
                    {paragraph.textAfterLink ?? null}
                  </>
                ) : null}
              </p>
              {paragraph.items ? (
                <ul
                  className={`ml-5 space-y-1 ${
                    paragraph.listStyle === 'lower-alpha' ? 'list-[lower-alpha]' : 'list-disc'
                  }`}
                >
                  {paragraph.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </section>
      ))}
    </>
  );

  return (
    <div className="min-h-screen font-sans bg-fitform-bone dark:bg-fitform-obsidian text-stone-900 dark:text-stone-50 transition-colors duration-700 selection:bg-fitform-teal selection:text-white">
      <Navbar />

      <main className="relative min-h-[80vh]">
        {children}
      </main>

      <Footer 
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenTerms={() => setIsTermsOpen(true)}
      />

       {/* Modals for Policies */}
      <Modal 
        isOpen={isPrivacyOpen} 
        onClose={() => setIsPrivacyOpen(false)}
        title="Aviso de Privacidad"
      >
        {renderPolicyContent(PRIVACY_CONTENT)}
      </Modal>

      <Modal 
        isOpen={isTermsOpen} 
        onClose={() => setIsTermsOpen(false)}
        title="Términos y Condiciones"
      >
        {renderPolicyContent(TERMS_CONTENT)}
      </Modal>
    </div>
  );
};
