import { SITE } from "@/lib/data";

const Facebook = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" />
  </svg>
);

const LinkedIn = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
    <path d="M20.4 3H3.6A.6.6 0 0 0 3 3.6v16.8c0 .33.27.6.6.6h16.8a.6.6 0 0 0 .6-.6V3.6a.6.6 0 0 0-.6-.6zM8.3 18.3H5.5V9.7h2.8v8.6zM6.9 8.5a1.6 1.6 0 1 1 0-3.3 1.6 1.6 0 0 1 0 3.3zm11.4 9.8h-2.8v-4.2c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2v4.3H9.7V9.7h2.7v1.2h.04c.37-.7 1.28-1.44 2.63-1.44 2.82 0 3.34 1.85 3.34 4.27v4.6z" />
  </svg>
);

const LINKS = [
  { href: SITE.social.facebook, label: "Facebook", Icon: Facebook },
  { href: SITE.social.linkedin, label: "LinkedIn", Icon: LinkedIn },
];

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-4 ${className}`}>
      {LINKS.map(({ href, label, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
          className="transition hover:text-gold-light">
          <Icon />
        </a>
      ))}
    </div>
  );
}
