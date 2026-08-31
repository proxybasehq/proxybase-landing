"use client";

const STEPS = [
  {
    n: "1",
    title: "Download the app",
    text: "Press the big blue button below. It's free."
  },
  {
    n: "2",
    title: "Install it",
    text: "Double-click the file. Click Next, Next, Done."
  },
  {
    n: "3",
    title: "Leave it running",
    text: "The app shares your extra internet on its own. It runs while you sleep."
  },
  {
    n: "4",
    title: "Watch your money grow",
    text: "Open the app to see your earnings. Cash out from $1."
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
            You pay for the whole pizza, and most days you eat one slice.
          </p>
          <p className="console-makemoney-lead">
            Companies need internet. They borrow the slices you don&apos;t use,
            and they pay for them. You keep most of that money.
          </p>
          <p className="console-makemoney-lead">
            Nobody can see your photos, your files, or what you do online.
            They borrow internet the way a neighbor borrows a bike. It comes
            back.
          </p>
        </div>
      </section>

      <section className="console-panel">
        <div className="console-panel-head">
          <h3 className="console-panel-title">How to start earning in 4 steps</h3>
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
              ⬇ Download the App
            </a>
            <a href="/earn/sell-internet" className="console-link">
              Curious how it works? Read more →
            </a>
          </div>

          <p className="console-panel-note">
            This website sells internet. To sell your extra internet, install
            our app. It does the work; you leave it running.
          </p>
        </div>
      </section>
    </div>
  );
}
