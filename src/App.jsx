import React, { useEffect, useMemo, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area,
    BarChart,
    Bar,
    RadialBarChart,
    RadialBar,
    PolarAngleAxis,
    CartesianGrid,
} from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Utility: random with jitter
const rand = (min, max) => Math.random() * (max - min) + min;

// Mock streaming generator (can be replaced with WebSocket or Stitch AI real-time endpoint)
function generateSamplePoint(t) {
    // electrical
    const voltage = 220 + Math.sin(t / 10) * 5 + rand(-1, 1);
    const current = 10 + Math.cos(t / 8) * 2 + rand(-0.5, 0.5);
    const power = +(voltage * current * (0.85 + Math.sin(t / 15) * 0.05)).toFixed(2);
    const frequency = 49.9 + Math.sin(t / 20) * 0.05 + rand(-0.02, 0.02);
    const pf = +(0.85 + Math.cos(t / 12) * 0.08 + rand(-0.01, 0.01)).toFixed(3);

    // physical
    const temperature = 40 + Math.sin(t / 6) * 3 + rand(-0.5, 0.5);
    const pressure = 1.01 + Math.sin(t / 18) * 0.01 + rand(-0.002, 0.002);
    const vibration = Math.abs(Math.sin(t / 4) * 2 + rand(-0.2, 0.2));

    // GPS
    const lat = 6.5 + Math.sin(t / 50) * 0.01 + rand(-0.0005, 0.0005);
    const lon = 3.35 + Math.cos(t / 50) * 0.01 + rand(-0.0005, 0.0005);

    return {
        timestamp: new Date().toISOString(),
        voltage: +voltage.toFixed(2),
        current: +current.toFixed(3),
        power,
        frequency: +frequency.toFixed(3),
        powerFactor: +pf,
        temperature: +temperature.toFixed(2),
        pressure: +pressure.toFixed(4),
        vibration: +vibration.toFixed(3),
        gps: { lat: +lat.toFixed(6), lon: +lon.toFixed(6) },
    };
}

// Simulated predictive model runner — in production, replace this with Stitch AI model outputs
function runPredictiveModel(sample) {
    // Example heuristics-inspired mock outputs
    const anomalyScore = Math.min(
        1,
        Math.max(0, (sample.temperature - 45) / 10 + sample.vibration / 5 + (1 - sample.powerFactor))
    );

    // Remaining Useful Life (hours) synthetic
    let RUL = 500 - anomalyScore * 400 + rand(-20, 20);
    if (RUL < 0) RUL = rand(0, 20);

    const riskScore = Math.round(anomalyScore * 100);

    const healthClass = riskScore > 70 ? "critical" : riskScore > 40 ? "warning" : "normal";

    // Simple classification of predicted failure window
    const failureProbability = +(anomalyScore * 100).toFixed(1);

    // Actionable recommendation
    let recommendation = "No immediate action required.";
    if (healthClass === "warning") recommendation = "Schedule maintenance within 7 days.";
    if (healthClass === "critical") recommendation = "Immediate inspection required — possible bearing or insulation fault.";

    return {
        RUL: Math.max(0, Math.round(RUL)),
        riskScore,
        healthClass,
        failureProbability,
        recommendation,
        anomalyScore: +anomalyScore.toFixed(3),
    };
}

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function PdMDashboard() {
    const [stream, setStream] = useState([]); // timeseries
    const [alerts, setAlerts] = useState([]);
    const [t, setT] = useState(0);
    const maxPoints = 80;

    // Simulate streaming data
    useEffect(() => {
        const id = setInterval(() => {
            setT((prevT) => prevT + 1);
            setStream((prev) => {
                const p = generateSamplePoint(prev.length + 1);
                const model = runPredictiveModel(p);
                const merged = { ...p, ...model };

                // Auto-generate an alert if critical
                if (merged.healthClass === "critical") {
                    setAlerts((a) => [
                        {
                            id: Date.now(),
                            ts: merged.timestamp,
                            text: `Critical: risk ${merged.riskScore} — ${merged.recommendation}`,
                            gps: merged.gps,
                        },
                        ...a,
                    ].slice(0, 20));
                }

                const newArr = [merged, ...prev].slice(0, maxPoints);
                return newArr;
            });
        }, 1200);

        return () => clearInterval(id);
    }, []);

    // Derived metrics (latest)
    const latest = stream[0] || null;

    // Small summary cards
    const SummaryCards = () => {
        if (!latest) return <div className="p-6">Waiting for data...</div>;
        return (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* <div className="p-4 bg-white rounded-2xl shadow">
                    <div className="text-sm font-medium text-gray-500">Remaining Useful Life</div>
                    <div className="text-2xl font-semibold">{latest.RUL} hrs</div>
                    <div className="text-xs text-gray-400">Predicted RUL from model</div>
                </div> */}
                <div className="p-4 bg-white rounded-2xl shadow">
                    <div className="text-sm font-medium text-gray-500">Asset Health</div>
                    <div className="text-2xl font-semibold">{latest.healthClass.toUpperCase()}</div>
                    <div className="text-xs text-gray-400">Risk score: {latest.riskScore}%</div>
                </div>
                <div className="p-4 bg-white rounded-2xl shadow">
                    <div className="text-sm font-medium text-gray-500">Predicted Failure Prob.</div>
                    <div className="text-2xl font-semibold">{latest.failureProbability}%</div>
                    <div className="text-xs text-gray-400">Time window: next 7 days (example)</div>
                </div>
                <div className="p-4 bg-white rounded-2xl shadow">
                    <div className="text-sm font-medium text-gray-500">Recommendation</div>
                    <div className="text-base font-semibold">{latest.recommendation}</div>
                    <div className="text-xs text-gray-400">Actionable output</div>
                </div>
            </div>
        );
    };

    // Prepare timeseries arrays for charts
    const tsVoltage = useMemo(
        () =>
            stream
                .slice()
                .reverse()
                .map((s, i) => ({ t: i, timestamp: s.timestamp, voltage: s.voltage })),
        [stream]
    );
    const tsCurrent = useMemo(
        () =>
            stream
                .slice()
                .reverse()
                .map((s, i) => ({ t: i, current: s.current })),
        [stream]
    );
    const tsPower = useMemo(
        () =>
            stream
                .slice()
                .reverse()
                .map((s, i) => ({ t: i, power: s.power })),
        [stream]
    );
    const tsTempPressVib = useMemo(
        () =>
            stream
                .slice()
                .reverse()
                .map((s, i) => ({ t: i, temperature: s.temperature, pressure: s.pressure, vibration: s.vibration })),
        [stream]
    );

    // Radial bar input for risk score
    const radialData = latest ? [{ name: "risk", uv: latest.riskScore, fill: "#8884d8" }] : [{ name: "risk", uv: 0 }];

    return (
        <div className="min-h-screen p-6 bg-gray-50">
            <header className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">PdM Dashboard — Stitch AI UI Prototype</h1>
                    <p className="text-sm text-gray-500">Real-time prognostics, asset health and actionable maintenance outputs</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-2 bg-blue-600 text-white rounded-lg">Connect</button>
                    <button
                        onClick={() => {
                            // Export latest as work order (mock)
                            if (!latest) return;
                            const order = {
                                id: Date.now(),
                                created: new Date().toISOString(),
                                rul: latest.RUL,
                                recommendation: latest.recommendation,
                                location: latest.gps,
                            };
                            setAlerts((a) =>
                                [
                                    {
                                        id: order.id,
                                        ts: order.created,
                                        text: `WorkOrder created - RUL ${order.rul} hrs`,
                                        gps: order.location,
                                    },
                                    ...a,
                                ].slice(0, 20)
                            );
                        }}
                        className="px-3 py-2 bg-green-600 text-white rounded-lg"
                    >
                        Create Work Order
                    </button>
                </div>
            </header>

            <main className="space-y-6">
                <section>
                    <SummaryCards />
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="col-span-2 p-4 bg-white rounded-2xl shadow">
                        <h3 className="font-semibold mb-2">Electrical Metrics (Voltage / Current / Power)</h3>
                        <div style={{ height: 260 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={tsVoltage.map((d, i) => ({ ...d, current: tsCurrent[i]?.current, power: tsPower[i]?.power }))}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="t" />
                                    <YAxis yAxisId="left" />
                                    <YAxis yAxisId="right" orientation="right" />
                                    <Tooltip />
                                    <Legend />
                                    <Line yAxisId="left" type="monotone" dataKey="voltage" stroke="#8884d8" dot={false} />
                                    <Line yAxisId="left" type="monotone" dataKey="current" stroke="#82ca9d" dot={false} />
                                    <Line yAxisId="right" type="monotone" dataKey="power" stroke="#ff7300" dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="p-4 bg-white rounded-2xl shadow">
                        <h3 className="font-semibold mb-2">Asset Health (Risk Score)</h3>
                        <div style={{ height: 260 }} className="flex items-center justify-center">
                            <ResponsiveContainer width="80%" height={220}>
                                <RadialBarChart innerRadius="10%" outerRadius="90%" data={radialData} startAngle={180} endAngle={-180}>
                                    <PolarAngleAxis type="number" domain={[0, 100]} />
                                    <RadialBar minAngle={15} clockWise={true} dataKey="uv" />
                                </RadialBarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-3 text-sm text-gray-500">
                            Latest: <strong>{latest ? `${latest.riskScore}% (${latest.healthClass})` : "—"}</strong>
                        </div>
                    </div>

                    <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-white rounded-2xl shadow">
                            <h4 className="font-semibold mb-2">Physical Condition (Temp / Pressure / Vibration)</h4>
                            <div style={{ height: 220 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={tsTempPressVib}>
                                        <defs>
                                            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="t" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="temperature" stroke="#8884d8" fillOpacity={1} fill="url(#colorTemp)" />
                                        <Area type="monotone" dataKey="vibration" stroke="#82ca9d" fillOpacity={0.2} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="p-4 bg-white rounded-2xl shadow">
                            <h4 className="font-semibold mb-2">Predicted RUL Distribution</h4>
                            <div style={{ height: 220 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={stream.slice().reverse().map((s) => ({ t: s.timestamp.slice(11, 19), RUL: s.RUL }))}>
                                        <XAxis dataKey="t" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="RUL" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-3 p-4 bg-white rounded-2xl shadow">
                        <h3 className="font-semibold mb-2">Actionable Outputs & Work Orders</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <table className="w-full text-sm table-auto">
                                    <thead>
                                        <tr className="text-left text-xs text-gray-500">
                                            <th>Time</th>
                                            <th>RUL (hrs)</th>
                                            <th>Risk</th>
                                            <th>Health</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stream.slice(0, 10).map((s) => (
                                            <tr key={s.timestamp} className="border-t">
                                                <td className="py-2">{new Date(s.timestamp).toLocaleTimeString()}</td>
                                                <td>{s.RUL}</td>
                                                <td>{s.riskScore}%</td>
                                                <td>{s.healthClass}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div>
                                <h4 className="font-medium">Recent Alerts</h4>
                                <ul className="space-y-2 mt-2">
                                    {alerts.length === 0 && <li className="text-sm text-gray-400">No alerts</li>}
                                    {alerts.map((a) => (
                                        <li key={a.id} className="p-3 bg-gray-50 border rounded-lg">
                                            <div className="text-xs text-gray-500">{new Date(a.ts).toLocaleString()}</div>
                                            <div className="text-sm">{a.text}</div>
                                            <div className="text-xs text-gray-400">{`GPS: ${a.gps?.lat || "—"}, ${a.gps?.lon || "—"}`}</div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-3 p-4 bg-white rounded-2xl shadow">
                        <h3 className="font-semibold mb-2">Location / Environmental Context (GPS)</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <div className="text-xs text-gray-500">Latest Coordinates</div>
                                <div className="text-base font-semibold">{latest ? `${latest.gps.lat}, ${latest.gps.lon}` : "—"}</div>
                                <div className="text-xs text-gray-400">Use these coordinates to cross-link EO data or weather feeds</div>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg md:col-span-2">
                                <div className="h-[250px] bg-white rounded-lg overflow-hidden">
                                    {latest ? (
                                        <MapContainer
                                            center={[latest.gps.lat, latest.gps.lon]}
                                            zoom={13}
                                            style={{ height: '100%', width: '100%' }}
                                            key={`${latest.gps.lat}-${latest.gps.lon}`}
                                        >
                                            <TileLayer
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            />
                                            <Marker position={[latest.gps.lat, latest.gps.lon]}>
                                                <Popup>
                                                    <div>
                                                        <strong>Asset Location</strong><br/>
                                                        Lat: {latest.gps.lat}<br/>
                                                        Lon: {latest.gps.lon}<br/>
                                                        Health: {latest.healthClass}<br/>
                                                        Risk: {latest.riskScore}%
                                                    </div>
                                                </Popup>
                                            </Marker>
                                        </MapContainer>
                                    ) : (
                                        <div className="h-full flex items-center justify-center text-gray-400">
                                            Loading map...
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="text-xs text-gray-400">Prototype UI — replace mock generator with Stitch AI real-time model outputs and push alerts/work-orders into your CMMS.</footer>
            </main>
        </div>
    );
}
