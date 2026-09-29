import React from "react";
import {
  FacebookLogo,
  InstagramLogo,
  TiktokLogo,
} from "@phosphor-icons/react";
import { SOCIALS } from "../../config/site.ts";

interface SocialLinksProps {
  className?: string;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <a
        href={SOCIALS.facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Williams on Facebook"
        className="w-11 h-11 rounded-full flex items-center justify-center text-bone-muted hover:text-ember transition-colors"
      >
        <FacebookLogo size={20} />
      </a>
      <a
        href={SOCIALS.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Williams on Instagram"
        className="w-11 h-11 rounded-full flex items-center justify-center text-bone-muted hover:text-ember transition-colors"
      >
        <InstagramLogo size={20} />
      </a>
      <a
        href={SOCIALS.tiktok}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Williams on TikTok"
        className="w-11 h-11 rounded-full flex items-center justify-center text-bone-muted hover:text-ember transition-colors"
      >
        <TiktokLogo size={20} />
      </a>
    </div>
  );
};
