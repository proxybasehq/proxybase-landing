"use client";

const STEPS = [
  {
    n: "1",
    title: "Download the app",
    text: "Press the big blue button below. It's free — like a free sample at the store.",
  },
  {
    n: "2",
    title: "Install it",
    text: "Double-click the file you downloaded. Click Next, Next, Done. That's all.",
  },
  {
    n: "3",
    title: "Leave it running",
    text: "The app quietly shares your extra internet. You don't have to do anything — it works even while you sleep.",
  },
  {
    n: "4",
    title: "Watch your money grow",
    text: "Open the app to see what you earned. Cash out to your wallet, starting from just $1.",
  },
];

export default function MakeMoneyTab() {
  return (
    <div className="console-tab">
      <section className="console-panel console-makemoney-hero">
        <div className="console-panel-body">
          <span className="console-makemoney-badge">💵 Make Money</span>
          <h2 className="console-makemoney-title">Your internet is like a pizza</h2>
          <p className="console-makemoney-lead">
            You pay for a whole pizza, but most of the time you only eat one
            slice. The rest just sits there, doing nothing.
          </p>
          <p className="console-makemoney-lead">
            We know companies that are hungry for internet. We let them borrow
            the slices you&apos;re not using. They pay for it — and we give most
            of that money to <strong>you</strong>.
          </p>
          <p className="console-makemoney-lead">
            It&apos;s safe: nobody can see your photos, your files, or what you
            do online. They only borrow your internet — like a neighbor
            borrowing your bike for an hour. It always comes back, and you get a
            thank-you.
          </p>
        </div>
      </section>

      <section className="console-panel">
        <div className="console-panel-head">
          <h3 className="console-panel-title">How to start earning — 4 easy steps</h3>
        </div>
        <div className="console-panel-body">
          <div className="console-makemoney-steps">
            {STEPS.map((step) => (
              <div className="console-makemoney-step" key={step.n}>
                <span className="console-makemoney-step-num">{step.n}</span>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
              </div>
            ))}
          </div>

          <div className="console-makemoney-actions">
            <a href="/download" className="console-btn console-btn-primary console-btn-large">
              ⬇ Download the App — it&apos;s free
            </a>
            <a href="/earn/sell-internet" className="console-link">
              Curious how it works? Read more →
            </a>
          </div>

          <p className="console-panel-note">
            One important thing: this website is the shop where people{" "}
            <strong>buy</strong> internet. To <strong>sell</strong> your extra
            internet, you need our app on your computer. The app does all the
            hard parts for you — you just install it and let it run.
          </p>
        </div>
      </section>
    </div>
  );
}
