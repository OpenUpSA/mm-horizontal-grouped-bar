import * as d3 from 'd3';

const data = [
  {category: "Property Rates", values: [
    {
      year: '2019',
      value: 184331307
    },
    {
      year: '2018',
      value: 167951901
    },
    {
      year: '2017',
      value: 154311339
    },
    {
      year: '2016',
      value: 152512312
    },
  ]},
  {category: "Service Charges", values: [
    {
      year: '2019',
      value: 124331307
    },
    {
      year: '2018',
      value: 141513307
    },
    {
      year: '2017',
      value: 184331307
    },
    {
      year: '2016',
      value: 184331307
    },
  ]}
  

];

const margin = {top: 0, right: 0, bottom: 0, left: 200};
const width = d3.select(".chart").node().clientWidth - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;
const formatter = d3.formatPrefix(".2s", 1e3);

const svg = d3.select(".chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .style("font-family", "sans-serif")
            .style("font-weight", "bold");

const x = d3.scaleLinear()
          .domain([0, d3.max(data, d => d3.max(d.values, v => v.value))])
          .range([0, width]);

const y = d3.scaleBand()
          .domain(data.map(d => d.category))
          .range([0, height])
          .padding(0.1);
          
// Y axis
svg.append("g")
  .attr("class", "y-axis")
  .attr("transform", "translate(-180, 0)")
  .call(d3.axisLeft(y));

d3.select(".y-axis path").remove();
d3.selectAll(".y-axis line").remove();
d3.selectAll(".y-axis text")
  .attr("transform", `translate(0, -${y.bandwidth()/4+30})`)
  .style("text-anchor", "start")
  .style("font-size", "14px");


// Add a group for each category.
const groups = svg.selectAll("g.category")
  .data(data)
  .enter()
  .append("g")
  .attr("class", "category")
  .style("font-size", "12px")
  .attr("transform", d => `translate(0, ${y(d.category)})`);

// Add each category's background bars to the group
groups.selectAll("rect.background")
  .data(d => d.values)
  .enter()
  .append("rect")
  .attr("class", "background")
  .attr("data-year", d => d.year)
  .attr("x", d => x(0))
  .attr("y", (d,i) => i * (y.bandwidth()/4)+5)
  .attr("width", d => x.range()[1])
  .attr("height", y.bandwidth()/4-10)
  .attr("fill","#f5f5f5")
  .attr("rx", 5) 
  .attr("ry", 5)
  .style("cursor", "pointer");

// Add each category's bars to the group
groups.selectAll("rect.bar")
  .data(d => d.values)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("data-year", d => d.year)
  .attr("x", d => x(0))
  .attr("y", (d,i) => i * (y.bandwidth()/4)+5)
  .attr("width", d => x(d.value))
  .attr("height", y.bandwidth()/4-10)
  .attr("fill", "#e1dce8")
  .attr("rx", 5) 
  .attr("ry", 5)
  .style("cursor", "pointer");


// Add each category's years to the group
groups.selectAll(".year")
  .data(d => d.values)
  .enter()
  .append("text")
  .attr("class", "year")
  .attr("data-year", d => d.year)
  .attr("x", d => x(0) - 50)
  .attr("y", (d,i) => i * (y.bandwidth()/4) + (y.bandwidth()/4)/2+5)
  .attr("fill", "#999999")
  .text(d => d.year)
  .style("cursor", "pointer");
  

// Add each category's bar's value to the group
groups.selectAll(".value")
  .data(d => d.values)
  .enter()
  .append("text")
  .attr("class", "value")
  .attr("data-year", d => d.year)
  .attr("x", d => x.range()[1] - 10)
  .attr("y", (d,i) => i * (y.bandwidth()/4) + (y.bandwidth()/4)/2+5)
  .attr("text-anchor", "end")
  .attr("fill", "#999999")
  .text(d => 'R' + formatter(d.value))
  .style("cursor", "pointer");


groups.selectAll("rect.bar, rect.background, text.label, text.value")
  .on("mouseover", (e,d) => {
    d3.selectAll('rect.bar[data-year="' + d.year + '"]').attr("fill", "#54298b");
    d3.selectAll('text.year[data-year="' + d.year + '"]').attr("fill", "#333333");
    d3.selectAll('text.value[data-year="' + d.year + '"]').attr("fill", "#333333");
  })
  .on("mouseout", (e,d) => {
    d3.selectAll('rect.bar[data-year="' + d.year + '"]').attr("fill", "#e1dce8");
    d3.selectAll('text.year[data-year="' + d.year + '"]').attr("fill", "#999999");
    d3.selectAll('text.value[data-year="' + d.year + '"]').attr("fill", "#999999");
  });

