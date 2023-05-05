# Horizontal Grouped Bar Chart

Set up with:

```
yarn
```

Run with:
```
yarn dev
```

Data format is:
```
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
  ]}
  ```

  Adjust dimensions and formatting here:

  ```
  const margin = {top: 0, right: 0, bottom: 0, left: 200};
const width = d3.select(".chart").node().clientWidth - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;
const formatter = d3.formatPrefix(".2s", 1e3);
```

## NB

Code currenty uses this everywhere:

```
y.bandwidth()/4
```

Adjust this with the amount of years - might need to do an array count.








