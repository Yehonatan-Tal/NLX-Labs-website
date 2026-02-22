import type { Locale, Translations } from "./types";
import en from "./en.json";
import he from "./he.json";

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALES: Locale[] = ["en", "he"];

const translations: Record<Locale, Translations> = {
  en: en as Translations,
  he: he as Translations,
};

export function getLocaleFromUrl(url: URL): Locale {
  // Check path-based locale: /base/he/ → "he"
  const path = url.pathname;
  if (path.includes("/he/") || path.endsWith("/he")) {
    return "he";
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

  // Strip /he/ segment to get the English (default) path
  const stripped = url.pathname.replace(/\/he(\/|$)/, "/");

  if (locale === "he") {
    url.pathname = `${basePath}he${stripped.slice(basePath.length)}`;
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
