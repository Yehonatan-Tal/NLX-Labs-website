import type { Locale, Translations } from "./types";
import en from "./en.json";
import he from "./he.json";

export const DEFAULT_LOCALE: Locale = "he";
export const LOCALES: Locale[] = ["he", "en"];

const translations: Record<Locale, Translations> = {
  en: en as Translations,
  he: he as Translations,
};

export function getLocaleFromUrl(url: URL): Locale {
  // Check path-based locale: /base/en/ → "en"
  const path = url.pathname;
  if (path.includes("/en/") || path.endsWith("/en")) {
    return "en";
  }
  // Fallback: check query param for backwards compat
  const param = url.searchParams.get("lang");
  if (param && LOCALES.includes(param as Locale)) {
    return param as Locale;
  }
  return DEFAULT_LOCALE;
}

export function getTranslations(locale: Locale): Translations {
  return translations[locale];
}

export function getDirection(locale: Locale): "rtl" | "ltr" {
  return locale === "he" ? "rtl" : "ltr";
}

export function getAlternateUrl(currentUrl: URL, locale: Locale): string {
  const url = new URL(currentUrl.toString());
  url.searchParams.delete("lang");

  // Normalize base path to always end with /
  const raw = import.meta.env.BASE_URL || "/";
  const basePath = raw.endsWith("/") ? raw : `${raw}/`;

  // Strip /en/ segment to get the Hebrew (default) path
  const stripped = url.pathname.replace(/\/en(\/|$)/, "/");

  if (locale === "en") {
    url.pathname = `${basePath}en${stripped.slice(basePath.length)}`;
    // Ensure trailing slash
    if (!url.pathname.endsWith("/")) url.pathname += "/";
  } else {
    url.pathname = stripped;
  }
  return url.toString();
}

export function getFontFamily(locale: Locale): string {
  return locale === "he"
    ? "'Rubik', system-ui, sans-serif"
    : "'Inter', system-ui, sans-serif";
}
