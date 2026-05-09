import { useState } from "react";
import Dropdown from "../ui/dropdown";
import type { Option } from "../../lib/types";
import {
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  RedditIcon,
  TwitterIcon,
  YoutubeIcon,
} from "../icons/Icon";

export default function TopHeading() {
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("usd");

  return (
    <div className="bg-primary text-background">
      <div className="lg:w-[70%] w-[95%] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-1">
        {/* left part */}
        <div className="text-center sm:text-left">
          <p className="text-xxs">Welcome to Clicon online eCommerce store.</p>
        </div>

        {/* right part */}
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-y-2">
          <Socials />

          <div className="flex items-center justify-center">
            <Dropdown
              label=""
              value={language}
              options={languages}
              onChange={setLanguage}
              className="text-xxs p-0 "
              itemClassName="text-xxs border-0"
              triggerClassName="py-1"
            />

            <Dropdown
              label=""
              value={currency}
              options={currencies}
              onChange={setCurrency}
              className="text-xxs p-0 "
              itemClassName="text-xxs border-0"
              triggerClassName="py-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Socials() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        <p className="text-xxs text-nowrap">Follow us:</p>

        <div className="flex flex-wrap items-center justify-center md:gap-2.5 gap-1.5">
          {topHeaderSocialLinks.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              className="inline-flex rounded-sm transition-opacity hover:opacity-80"
            >
              <Icon className="size-3 shrink-0" />
            </a>
          ))}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="hidden sm:block mx-2 h-8 w-px shrink-0 bg-background/25 md:ml-6 ml-3"
      />
    </>
  );
}

const languages: Option[] = [
  { value: "en", label: "Eng" },
  { value: "bn", label: "Bng" },
  { value: "es", label: "Esp" },
];

const currencies: Option[] = [
  { value: "usd", label: "USD" },
  { value: "eur", label: "EUR" },
  { value: "gbp", label: "GBP" },
];

const topHeaderSocialLinks = [
  {
    name: "Twitter",
    href: "#",
    Icon: TwitterIcon,
  },
  {
    name: "Facebook",
    href: "#",
    Icon: FacebookIcon,
  },
  {
    name: "Pinterest",
    href: "#",
    Icon: PinterestIcon,
  },
  {
    name: "Reddit",
    href: "#",
    Icon: RedditIcon,
  },
  {
    name: "YouTube",
    href: "#",
    Icon: YoutubeIcon,
  },
  {
    name: "Instagram",
    href: "#",
    Icon: InstagramIcon,
  },
] as const;
