"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./styles.module.css";

const DEFAULTS = {
  L_bldg: 154,
  W_bldg: 39,
  H_eave: 13,
  slopeX: 20,
  L_monitor: 140,
  N_air: 6,
  tDiff: 10,
  V_wind: 8.97,
  tw_provided: 1,
  louverProvided: 110,
  framedOpening: 0,
};

type Inputs = typeof DEFAULTS;

const fmt = (n: number, d = 2) =>
  Number.isFinite(n)
    ? n.toLocaleString("en-US", {
        minimumFractionDigits: d,
        maximumFractionDigits: d,
      })
    : "—";

const fmtInt = (n: number) =>
  Number.isFinite(n) ? Math.round(n).toLocaleString("en-US") : "—";

function compute(i: Inputs) {
  const slopeX = i.slopeX || 1;
  const H_stack = i.W_bldg * 0.5 * (1 / slopeX) * 0.5 + i.H_eave;
  const Vb_raw =
    i.L_bldg * i.W_bldg * i.H_eave +
    0.5 * i.W_bldg * i.L_bldg * (i.W_bldg * 0.5 * (1 / 20));
  const Vb = Math.ceil(Vb_raw);

  const innerRoot = H_stack - i.tDiff;
  const v_min =
    innerRoot >= 0 ? 8 * Math.sqrt(innerRoot) + 5.82 * i.V_wind : NaN;
  const v_sec = v_min / 60;

  const A_req = v_sec > 0 ? (Vb * i.N_air) / (v_sec * 3600) : NaN;
  const Tw_req = i.L_monitor > 0 ? A_req / i.L_monitor : NaN;
  const v1 = 0.5 * v_sec;
  const A1_req = v1 > 0 ? (Vb * i.N_air) / (v1 * 3600) : NaN;
  const effectiveProvided = i.louverProvided - i.framedOpening;

  return {
    H_stack,
    Vb,
    v_min,
    v_sec,
    A_req,
    Tw_req,
    v1,
    A1_req,
    effectiveProvided,
  };
}

export default function VentilationCalculatorPage() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);
  const [theme, setTheme] = useState<"paper" | "blueprint">("paper");
  const [dateStamp, setDateStamp] = useState("—");

  useEffect(() => {
    const today = new Date();
    setDateStamp(
      today
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        .toUpperCase(),
    );
  }, []);

  const update = (k: keyof Inputs) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = parseFloat(e.target.value);
      setInputs((prev) => ({ ...prev, [k]: Number.isFinite(v) ? v : 0 }));
    };

  const r = useMemo(() => compute(inputs), [inputs]);

  const twAdequate =
    Number.isFinite(inputs.tw_provided) &&
    Number.isFinite(r.Tw_req) &&
    inputs.tw_provided >= r.Tw_req;

  const louverDiff = r.effectiveProvided - r.A1_req;
  const louverAdequate = Number.isFinite(louverDiff) && louverDiff >= 0;

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&display=swap"
        rel="stylesheet"
      />
      <div
        className={`${styles.root} ${theme === "blueprint" ? styles.blueprint : ""}`}
      >
        <main className={styles.sheet}>
          {/* TITLE BLOCK */}
          <header className={styles.titleblock}>
            <div>
              <div className={styles.eyebrow}>
                <span className={styles.dash}></span>
                DOC&nbsp;·&nbsp;MECH-VENT-01
                <span className={styles.dash}></span>
                SP:32&nbsp;METHOD
              </div>
              <h1>
                Natural ventilation
                <br />
                <em>sizing worksheet</em>
              </h1>
            </div>
            <div
              className={styles.themetoggle}
              role="tablist"
              aria-label="Theme"
            >
              <button
                type="button"
                className={theme === "paper" ? styles.on : ""}
                onClick={() => setTheme("paper")}
              >
                PAPER
              </button>
              <button
                type="button"
                className={theme === "blueprint" ? styles.on : ""}
                onClick={() => setTheme("blueprint")}
              >
                BLUEPRINT
              </button>
            </div>
            <div className={styles.meta}>
              <div>
                <b>Roof monitor &amp; wall louver</b>
              </div>
              <div>Industrial buildings · stack + wind driven</div>
              <div>
                Rev. <b>02</b> · <span>{dateStamp}</span>
              </div>
            </div>
          </header>

          {/* DIAGRAM */}
          <div className={styles.sectionHead}>
            <span className={styles.num}>01 /</span>
            <h2>Section diagram</h2>
            <div className={styles.ruleLine}></div>
            <span className={styles.tag}>Live dimensions</span>
          </div>

          <div className={styles.diagramWrap}>
            <div className={styles.diagram}>
              <div className={`${styles.cornerTag} ${styles.cornerTl}`}>
                FIG. 01 · CROSS-SECTION A–A
              </div>
              <div className={`${styles.cornerTag} ${styles.cornerTr}`}>
                NOT TO SCALE
              </div>
              <div className={`${styles.cornerTag} ${styles.cornerBl}`}>
                UNITS: METRES
              </div>
              <div className={`${styles.cornerTag} ${styles.cornerBr}`}>
                N ↑
              </div>

              <svg
                viewBox="0 0 1000 480"
                preserveAspectRatio="xMidYMid meet"
                aria-label="Cross section of industrial building with roof monitor and louvers"
              >
                <defs>
                  <marker
                    id="vc-mArrowOut"
                    viewBox="0 0 10 10"
                    refX="5"
                    refY="5"
                    markerWidth="9"
                    markerHeight="9"
                    orient="auto"
                  >
                    <path
                      d="M0 0 L8 5 L0 10 Z"
                      className={styles.markerArrowFillFaint}
                    />
                  </marker>
                  <marker
                    id="vc-mArrowIn"
                    viewBox="0 0 10 10"
                    refX="9"
                    refY="5"
                    markerWidth="9"
                    markerHeight="9"
                    orient="auto"
                  >
                    <path
                      d="M0 0 L8 5 L0 10 Z"
                      className={styles.markerArrowFillIn}
                    />
                  </marker>
                </defs>

                {/* Ground */}
                <line
                  x1="40"
                  y1="380"
                  x2="960"
                  y2="380"
                  className={styles.dwgInk}
                />
                <g className={styles.dwgFaint}>
                  {Array.from({ length: 18 }).map((_, i) => {
                    const x = 60 + i * 50;
                    return (
                      <line
                        key={i}
                        x1={x}
                        y1="386"
                        x2={x - 10}
                        y2="396"
                      />
                    );
                  })}
                </g>

                {/* Building outline */}
                <path
                  d="M 180 380 L 180 200 L 500 130 L 820 200 L 820 380 Z"
                  className={styles.dwgFill}
                  strokeWidth="1.5"
                />

                <g className={styles.dwgFaint}>
                  <line
                    x1="180"
                    y1="380"
                    x2="820"
                    y2="380"
                    strokeWidth="1.25"
                  />
                </g>

                {/* Ridge centerline */}
                <line
                  x1="500"
                  y1="120"
                  x2="500"
                  y2="380"
                  className={styles.dwgFaint}
                  strokeDasharray="3,4"
                />

                {/* Roof monitor */}
                <rect
                  x="450"
                  y="100"
                  width="100"
                  height="32"
                  className={styles.dwgMonitor}
                />
                <line
                  x1="450"
                  y1="130"
                  x2="550"
                  y2="130"
                  className={styles.dwgMonitor}
                  strokeDasharray="2,3"
                />

                {/* Louvers */}
                <g className={styles.dwgLouver}>
                  <rect x="190" y="280" width="22" height="70" />
                  <rect x="788" y="280" width="22" height="70" />
                </g>
                <g className={styles.dwgLouverSlat}>
                  <line x1="190" y1="292" x2="212" y2="288" />
                  <line x1="190" y1="306" x2="212" y2="302" />
                  <line x1="190" y1="320" x2="212" y2="316" />
                  <line x1="190" y1="334" x2="212" y2="330" />
                  <line x1="788" y1="288" x2="810" y2="292" />
                  <line x1="788" y1="302" x2="810" y2="306" />
                  <line x1="788" y1="316" x2="810" y2="320" />
                  <line x1="788" y1="330" x2="810" y2="334" />
                </g>

                {/* Airflow: stack rising */}
                <g
                  className={styles.dwgFlowOut}
                  strokeDasharray="2,4"
                >
                  <path
                    d="M 240 370 Q 260 250 460 140"
                    markerEnd="url(#vc-mArrowOut)"
                  />
                  <path
                    d="M 760 370 Q 740 250 540 140"
                    markerEnd="url(#vc-mArrowOut)"
                  />
                  <path
                    d="M 380 370 Q 380 240 480 150"
                    markerEnd="url(#vc-mArrowOut)"
                  />
                  <path
                    d="M 620 370 Q 620 240 520 150"
                    markerEnd="url(#vc-mArrowOut)"
                  />
                </g>

                {/* Hot air out through monitor */}
                <g
                  className={styles.dwgFlowOut}
                  style={{ opacity: 1 }}
                >
                  <line
                    x1="475"
                    y1="95"
                    x2="475"
                    y2="55"
                    strokeWidth="2"
                    markerEnd="url(#vc-mArrowOut)"
                  />
                  <line
                    x1="500"
                    y1="95"
                    x2="500"
                    y2="40"
                    strokeWidth="2"
                    markerEnd="url(#vc-mArrowOut)"
                  />
                  <line
                    x1="525"
                    y1="95"
                    x2="525"
                    y2="55"
                    strokeWidth="2"
                    markerEnd="url(#vc-mArrowOut)"
                  />
                </g>

                {/* Fresh air in through louvers */}
                <g className={styles.dwgFlowIn}>
                  <line
                    x1="130"
                    y1="315"
                    x2="186"
                    y2="315"
                    strokeWidth="2"
                    markerEnd="url(#vc-mArrowIn)"
                  />
                  <line
                    x1="870"
                    y1="315"
                    x2="814"
                    y2="315"
                    strokeWidth="2"
                    markerEnd="url(#vc-mArrowIn)"
                  />
                </g>

                {/* Dimensions */}
                <g className={styles.dwgDim}>
                  <line x1="180" y1="415" x2="820" y2="415" />
                  <line x1="180" y1="410" x2="180" y2="420" />
                  <line x1="820" y1="410" x2="820" y2="420" />
                  <text
                    x="500"
                    y="436"
                    textAnchor="middle"
                    className={styles.dwgDimText}
                  >
                    W = {fmtInt(inputs.W_bldg)} m
                  </text>
                </g>

                <g className={styles.dwgDim}>
                  <line x1="150" y1="200" x2="150" y2="380" />
                  <line x1="145" y1="200" x2="155" y2="200" />
                  <line x1="145" y1="380" x2="155" y2="380" />
                  <text
                    x="143"
                    y="293"
                    textAnchor="end"
                    className={styles.dwgDimText}
                  >
                    H
                    <tspan baselineShift="sub" fontSize="8">
                      eave
                    </tspan>
                    {" = "}
                    {fmtInt(inputs.H_eave)} m
                  </text>
                </g>

                <g className={styles.dwgDim}>
                  <line x1="870" y1="116" x2="870" y2="380" />
                  <line x1="865" y1="116" x2="875" y2="116" />
                  <line x1="865" y1="380" x2="875" y2="380" />
                  <text
                    x="877"
                    y="248"
                    textAnchor="start"
                    className={styles.dwgDimText}
                  >
                    H = {fmt(r.H_stack, 1)} m
                  </text>
                </g>

                <g className={styles.dwgDim}>
                  <line x1="450" y1="80" x2="550" y2="80" />
                  <line x1="450" y1="75" x2="450" y2="85" />
                  <line x1="550" y1="75" x2="550" y2="85" />
                  <text
                    x="500"
                    y="72"
                    textAnchor="middle"
                    className={styles.dwgDimText}
                  >
                    Tw
                  </text>
                </g>

                {/* Callouts */}
                <g>
                  <line
                    x1="500"
                    y1="105"
                    x2="650"
                    y2="60"
                    className={styles.dwgLeader}
                  />
                  <circle
                    cx="500"
                    cy="105"
                    r="2"
                    className={styles.markerLeader}
                  />
                  <text
                    x="655"
                    y="58"
                    className={`${styles.dwgCallout} ${styles.tag}`}
                  >
                    A · Roof monitor
                  </text>
                  <text x="655" y="72" className={styles.dwgCallout}>
                    exhaust opening
                  </text>

                  <line
                    x1="201"
                    y1="315"
                    x2="55"
                    y2="200"
                    className={styles.dwgLeader}
                  />
                  <circle
                    cx="201"
                    cy="315"
                    r="2"
                    className={styles.markerLeader}
                  />
                  <text
                    x="50"
                    y="190"
                    className={`${styles.dwgCallout} ${styles.tag}`}
                    textAnchor="start"
                  >
                    B · Wall louvers
                  </text>
                  <text
                    x="50"
                    y="204"
                    className={styles.dwgCallout}
                    textAnchor="start"
                  >
                    intake opening
                  </text>
                </g>

                <text
                  x="500"
                  y="320"
                  textAnchor="middle"
                  className={`${styles.dwgDimText} ${styles.muted}`}
                  style={{ fontStyle: "italic" }}
                >
                  V<tspan baselineShift="sub" fontSize="9">b</tspan> ={" "}
                  {fmtInt(r.Vb)} m³
                </text>
              </svg>

              <div className={styles.legend}>
                <span className={`${styles.sw} ${styles.blue}`}>
                  Building section
                </span>
                <span className={`${styles.sw} ${styles.red}`}>
                  Engineered openings (A &amp; B)
                </span>
                <span className={`${styles.sw} ${styles.green}`}>
                  Fresh air intake path
                </span>
                <span className={`${styles.sw} ${styles.faint}`}>
                  Hot air exhaust path
                </span>
              </div>
            </div>
          </div>

          {/* INPUTS */}
          <div className={styles.sectionHead}>
            <span className={styles.num}>02 /</span>
            <h2>Inputs</h2>
            <div className={styles.ruleLine}></div>
            <span className={styles.tag}>Given values</span>
          </div>

          <div className={styles.panels}>
            <section className={styles.panel}>
              <h3>
                <span className={styles.idx}>a</span>Building geometry
              </h3>

              <div className={styles.row}>
                <label>
                  Length{" "}
                  <span className={styles.sym}>
                    L<sub>b</sub>
                  </span>
                </label>
                <input
                  type="number"
                  value={inputs.L_bldg}
                  step={1}
                  min={0}
                  onChange={update("L_bldg")}
                />
                <span className={styles.unit}>m</span>
              </div>
              <div className={styles.row}>
                <label>
                  Width <span className={styles.sym}>W</span>
                </label>
                <input
                  type="number"
                  value={inputs.W_bldg}
                  step={1}
                  min={0}
                  onChange={update("W_bldg")}
                />
                <span className={styles.unit}>m</span>
              </div>
              <div className={styles.row}>
                <label>
                  Eave height{" "}
                  <span className={styles.sym}>
                    H<sub>e</sub>
                  </span>
                </label>
                <input
                  type="number"
                  value={inputs.H_eave}
                  step={0.5}
                  min={0}
                  onChange={update("H_eave")}
                />
                <span className={styles.unit}>m</span>
              </div>
              <div className={`${styles.row} ${styles.rowSlope}`}>
                <label>Roof slope</label>
                <span className={styles.slopeInput}>
                  1 :{" "}
                  <input
                    type="number"
                    value={inputs.slopeX}
                    step={1}
                    min={1}
                    onChange={update("slopeX")}
                  />
                </span>
                <span className={styles.unit}></span>
              </div>
              <div className={styles.row}>
                <label>
                  Monitor length <span className={styles.sym}>L</span>
                </label>
                <input
                  type="number"
                  value={inputs.L_monitor}
                  step={1}
                  min={0}
                  onChange={update("L_monitor")}
                />
                <span className={styles.unit}>m</span>
              </div>
            </section>

            <section className={styles.panel}>
              <h3>
                <span className={styles.idx}>b</span>Design conditions
              </h3>

              <div className={styles.row}>
                <label>
                  Air changes / hour <span className={styles.sym}>N</span>
                </label>
                <input
                  type="number"
                  value={inputs.N_air}
                  step={1}
                  min={0}
                  onChange={update("N_air")}
                />
                <span className={styles.unit}>/hr</span>
              </div>
              <div className={styles.row}>
                <label>
                  Temperature difference{" "}
                  <span className={styles.sym}>Δt</span>
                </label>
                <input
                  type="number"
                  value={inputs.tDiff}
                  step={1}
                  min={0}
                  onChange={update("tDiff")}
                />
                <span className={styles.unit}>°C</span>
              </div>
              <div className={styles.row}>
                <label>
                  Wind speed <span className={styles.sym}>V</span>
                </label>
                <input
                  type="number"
                  value={inputs.V_wind}
                  step={0.01}
                  min={0}
                  onChange={update("V_wind")}
                />
                <span className={styles.unit}>km/h</span>
              </div>
              <div className={styles.row}>
                <label>
                  Provide throat width{" "}
                  <span className={styles.sym}>Tw</span>
                </label>
                <input
                  type="number"
                  value={inputs.tw_provided}
                  step={0.1}
                  min={0}
                  onChange={update("tw_provided")}
                />
                <span className={styles.unit}>m</span>
              </div>
              <div className={styles.row}>
                <label>Louver area provided</label>
                <input
                  type="number"
                  value={inputs.louverProvided}
                  step={1}
                  min={0}
                  onChange={update("louverProvided")}
                />
                <span className={styles.unit}>m²</span>
              </div>
            </section>
          </div>

          {/* DERIVED */}
          <div className={styles.derived}>
            <div className={styles.cell}>
              <div className={styles.k}>
                <span className={styles.pin}></span>Stack height
              </div>
              <div className={styles.v}>
                <span>{fmt(r.H_stack, 2)}</span>
                <span className={styles.u}>m</span>
              </div>
              <div className={styles.formula}>
                H = (W/2) · (1/slope) · ½ + H<sub>e</sub>
              </div>
            </div>
            <div className={styles.cell}>
              <div className={styles.k}>
                <span className={styles.pin}></span>Building volume
              </div>
              <div className={styles.v}>
                <span>{fmtInt(r.Vb)}</span>
                <span className={styles.u}>m³</span>
              </div>
              <div className={styles.formula}>
                V<sub>b</sub> = L·W·H<sub>e</sub> + ½·L·W·(W/40)
              </div>
            </div>
            <div className={styles.cell}>
              <div className={styles.k}>
                <span className={styles.pin}></span>Monitor velocity
              </div>
              <div className={styles.v}>
                <span>{fmt(r.v_min, 1)}</span>
                <span className={styles.u}>m/min</span>
              </div>
              <div className={styles.formula}>
                v = 8√(H − Δt) + 5.82·V
              </div>
            </div>
            <div className={styles.cell}>
              <div className={styles.k}>
                <span className={styles.pin}></span>Louver velocity
              </div>
              <div className={styles.v}>
                <span>{fmt(r.v1, 2)}</span>
                <span className={styles.u}>m/s</span>
              </div>
              <div className={styles.formula}>
                v<sub>1</sub> = ½ · v
              </div>
            </div>
          </div>

          {/* RESULTS */}
          <div className={styles.sectionHead}>
            <span className={styles.num}>03 /</span>
            <h2>Sizing &amp; verification</h2>
            <div className={styles.ruleLine}></div>
            <span className={styles.tag}>Required vs provided</span>
          </div>

          <div className={styles.results}>
            {/* MONITOR */}
            <section className={styles.result}>
              <div className={styles.head}>
                <span className={styles.badge}>A</span>
                <h3>Roof monitor — exhaust</h3>
              </div>

              <table className={styles.calcTable}>
                <tbody>
                  <tr>
                    <td className={styles.lbl}>
                      Velocity through monitor{" "}
                      <span className={styles.sym}>v</span>
                    </td>
                    <td className={styles.formula}>
                      8√(H−Δt) + 5.82·V
                    </td>
                    <td className={styles.val}>
                      <span>{fmt(r.v_min, 1)}</span>
                      <span className={styles.u}>m/min</span>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.lbl}>
                      Throat area required{" "}
                      <span className={styles.sym}>A</span>
                    </td>
                    <td className={styles.formula}>
                      (V<sub>b</sub> × N) / v
                    </td>
                    <td className={styles.val}>
                      <span>{fmt(r.A_req, 1)}</span>
                      <span className={styles.u}>m²</span>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.lbl}>Throat width required</td>
                    <td className={styles.formula}>A / L</td>
                    <td className={styles.val}>
                      <span>{fmt(r.Tw_req, 2)}</span>
                      <span className={styles.u}>m</span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div
                className={`${styles.provided} ${
                  twAdequate ? styles.ok : styles.warn
                }`}
              >
                <div className={styles.ph}>
                  <span className={styles.t}>
                    Provided throat width — {fmt(inputs.tw_provided, 2)} m
                  </span>
                  <span className={styles.stamp}>
                    {twAdequate
                      ? "✓ ADEQUATE"
                      : `✕ BELOW REQ ${fmt(r.Tw_req, 2)} m`}
                  </span>
                </div>
              </div>

              <div className={styles.summary}>
                <div className={styles.body}>
                  {inputs.tw_provided > 0 && inputs.L_monitor > 0 ? (
                    <>
                      Provide a standard roof monitor of{" "}
                      <b>{fmt(inputs.tw_provided, 2)} m</b> throat width ×{" "}
                      <b>{fmtInt(inputs.L_monitor)} m</b> length — horizontal
                      opening in the roof, with ½&nbsp;throat on either side
                      of the monitor wall.
                    </>
                  ) : (
                    "—"
                  )}
                </div>
              </div>
            </section>

            {/* LOUVERS */}
            <section className={styles.result}>
              <div className={styles.head}>
                <span className={styles.badge}>B</span>
                <h3>Wall louvers — intake</h3>
              </div>

              <table className={styles.calcTable}>
                <tbody>
                  <tr>
                    <td className={styles.lbl}>
                      Velocity through louvers{" "}
                      <span className={styles.sym}>
                        v<sub>1</sub>
                      </span>
                    </td>
                    <td className={styles.formula}>0.5 · v</td>
                    <td className={styles.val}>
                      <span>{fmt(r.v1, 2)}</span>
                      <span className={styles.u}>m/s</span>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.lbl}>
                      Louver area required{" "}
                      <span className={styles.sym}>
                        A<sub>1</sub>
                      </span>
                    </td>
                    <td className={styles.formula}>
                      (V<sub>b</sub> × N) / v<sub>1</sub>
                    </td>
                    <td className={styles.val}>
                      <span>{fmt(r.A1_req, 1)}</span>
                      <span className={styles.u}>m²</span>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.lbl}>
                      Framed opening (rolling shutter)
                    </td>
                    <td className={styles.formula}>
                      subtract from provided
                    </td>
                    <td className={styles.val}>
                      <input
                        type="number"
                        value={inputs.framedOpening}
                        step={1}
                        min={0}
                        onChange={update("framedOpening")}
                      />
                      <span className={styles.u}>m²</span>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.lbl}>Effective louver area</td>
                    <td className={styles.formula}>provided − framed</td>
                    <td className={styles.val}>
                      <span>{fmt(r.effectiveProvided, 1)}</span>
                      <span className={styles.u}>m²</span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div
                className={`${styles.provided} ${
                  louverAdequate ? styles.ok : styles.warn
                }`}
              >
                <div className={styles.ph}>
                  <span className={styles.t}>
                    Required <b>{fmt(r.A1_req, 1)}</b> m² · provided{" "}
                    <b>{fmt(r.effectiveProvided, 1)}</b> m²
                  </span>
                  <span className={styles.stamp}>
                    {louverAdequate
                      ? `✓ SURPLUS ${fmt(louverDiff, 1)} m²`
                      : `✕ SHORT ${fmt(Math.abs(louverDiff), 1)} m²`}
                  </span>
                </div>
              </div>

              <div className={styles.summary}>
                <div className={styles.body}>
                  {Number.isFinite(r.A1_req) ? (
                    louverAdequate ? (
                      <>
                        Provided louver area is sufficient — required{" "}
                        <b>{fmt(r.A1_req, 1)} m²</b>, effective provided{" "}
                        <b>{fmt(r.effectiveProvided, 1)} m²</b>. Surplus of{" "}
                        <b>{fmt(louverDiff, 1)} m²</b>.
                      </>
                    ) : (
                      <>
                        Louver area is insufficient — required{" "}
                        <b>{fmt(r.A1_req, 1)} m²</b>, effective provided{" "}
                        <b>{fmt(r.effectiveProvided, 1)} m²</b>.{" "}
                        <strong className={styles.warnText}>
                          Short by {fmt(Math.abs(louverDiff), 1)} m²
                        </strong>{" "}
                        — increase louver area or reduce framed openings.
                      </>
                    )
                  ) : (
                    "—"
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* ACTIONS */}
          <footer className={styles.actions}>
            <span className={styles.stamp}>
              PREPARED · <b>AUTO</b>
            </span>
            <span
              className={styles.stamp}
              style={{
                color: louverAdequate
                  ? "var(--ok)"
                  : "var(--warn)",
              }}
            >
              CHECKED ·{" "}
              <b
                style={{
                  color: louverAdequate
                    ? "var(--ok)"
                    : "var(--warn)",
                }}
              >
                {louverAdequate ? "OK" : "REVISE"}
              </b>
            </span>
            <div className={styles.spacer}></div>
            <button type="button" onClick={() => setInputs(DEFAULTS)}>
              ↺ Reset defaults
            </button>
            <button type="button" onClick={() => window.print()}>
              ⎙ Print / PDF
            </button>
          </footer>
        </main>
      </div>
    </>
  );
}
