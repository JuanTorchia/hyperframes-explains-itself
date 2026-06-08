import * as d3 from "d3";

const data = [
  { label: "HTML", value: 72 },
  { label: "CSS", value: 58 },
  { label: "JS", value: 86 },
  { label: "MP4", value: 64 },
];

const svg = d3.select("#chart");
const x = d3.scaleBand().domain(data.map((d) => d.label)).range([0, 1200]).padding(0.18);
const y = d3.scaleLinear().domain([0, 100]).range([360, 20]);

svg.append("line").attr("class", "axis").attr("x1", 0).attr("x2", 1200).attr("y1", 360).attr("y2", 360);

const bars = svg
  .selectAll(".bar")
  .data(data)
  .join("rect")
  .attr("class", "bar")
  .attr("x", (d) => x(d.label))
  .attr("width", x.bandwidth())
  .attr("rx", 8);

svg
  .selectAll(".label")
  .data(data)
  .join("text")
  .attr("class", "label")
  .attr("x", (d) => x(d.label) + x.bandwidth() / 2)
  .attr("y", 410)
  .attr("text-anchor", "middle")
  .text((d) => d.label);

function draw(time) {
  const progress = Math.min(1, Math.max(0, time / 3));
  bars
    .attr("y", (d, index) => {
      const eased = d3.easeCubicOut(Math.min(1, progress * 1.35 - index * 0.08));
      return y(d.value * eased);
    })
    .attr("height", (d, index) => {
      const eased = d3.easeCubicOut(Math.min(1, progress * 1.35 - index * 0.08));
      return 360 - y(d.value * eased);
    });
}

window.__timelines = window.__timelines || {};
window.__timelines["d3-adapter"] = {
  duration: () => 3,
  pause: () => undefined,
  seek: draw,
};

draw(0);

