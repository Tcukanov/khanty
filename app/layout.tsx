import type { Metadata, Viewport } from "next";
import { Yeseva_One, Alegreya, Alegreya_SC } from "next/font/google";
import "./globals.css";

const yeseva = Yeseva_One({ variable: "--font-yeseva", weight: "400", subsets: ["latin", "cyrillic"] });
const alegreya = Alegreya({
  variable: "--font-alegreya",
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin", "cyrillic"],
});
const alegreyaSC = Alegreya_SC({ variable: "--font-alegreya-sc", weight: ["500", "700"], subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Варты Нижневартовска",
  description:
    "Семья бронзовых хранителей Вартов пришла из северной тайги в Нижневартовск. Легенда, герои, добрые знаки и маршрут по городу.",
  openGraph: {
    title: "Варты Нижневартовска",
    description: "Найдите бронзовых хранителей на улицах города и потрите добрый знак на удачу.",
    locale: "ru_RU",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#0f1830", viewportFit: "cover" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${yeseva.variable} ${alegreya.variable} ${alegreyaSC.variable}`}>
      <body>{children}</body>
    </html>
  );
}
