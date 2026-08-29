import HomePage from "./components/HomePage";

export const metadata = {
 title: "ProxyBase — Earning App: Turn Unused Internet Into Passive Income",
 description: "ProxyBase is a free earning app that turns your unused internet bandwidth into passive income. Open-source, KYC-free, $1 minimum payout, instant crypto cashouts. Sell internet data and earn money online in the background.",
 keywords: "earning app, passive income app, sell internet bandwidth, make money online, bandwidth sharing app, best bandwidth sharing app, share internet earn money, passive income, proxybase",
 alternates: {
 canonical: "/",
 },
 openGraph: {
 title: "ProxyBase — Earning App: Turn Unused Internet Into Passive Income",
 description:
 "A free earning app that turns your unused internet bandwidth into passive income. Open-source, KYC-free, $1 minimum payout.",
 url: "https://proxybase.xyz",
 siteName: "ProxyBase",
 type: "website",
 locale: "en_US",
 },
 twitter: {
 card: "summary_large_image",
 title: "ProxyBase — Earning App: Turn Unused Internet Into Passive Income",
 description: "Turn your unused internet bandwidth into passive income. Open-source, KYC-free, $1 minimum payout.",
 },
};

export default function Page() {
 return <HomePage />;
}
