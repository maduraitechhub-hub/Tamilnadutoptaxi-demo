import { useEffect, useState } from "react";

export default function StatsBar() {
  const stats = [
    { value: 50000, suffix: "+", label: "Happy Riders" },
    { value: 50, suffix: "+", label: "Verified Drivers" },
    { value: 38, suffix: "", label: "Districts Covered" },
    { value: 4.8, suffix: "★", label: "Average Rating" },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const intervals = stats.map((stat, index) => {
      let start = 0;

      const duration = 2000;
      const increment = stat.value / (duration / 30);

      return setInterval(() => {
        start += increment;

        setCounts((prev) => {
          const updated = [...prev];

          if (start >= stat.value) {
            updated[index] = stat.value;
          } else {
            updated[index] =
              stat.value % 1 !== 0
                ? parseFloat(start.toFixed(1))
                : Math.floor(start);
          }

          return updated;
        });

        if (start >= stat.value) {
          clearInterval(intervals[index]);
        }
      }, 30);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div className="stats-bar">
      <div className="stats-inner">
        {stats.map((stat, index) => (
          <div key={stat.label} className="stat-item">
            <div className="stat-num">
              {stat.value >= 1000
                ? counts[index].toLocaleString()
                : counts[index]}
              {stat.suffix}
            </div>

            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}