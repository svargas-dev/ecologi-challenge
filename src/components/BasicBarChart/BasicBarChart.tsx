import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';
import { getISODate } from '@/utils/date';

const margin = {
  bottom: 50,
  left: 140,
};

function BasicBarChart({ width, height, data }: { width: number; height: number; data: [number, number][] }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    d3.select(ref.current).attr('width', width).attr('height', height);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    draw();
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  const draw = () => {
    const svg = d3.select(ref.current);
    const selection = svg.selectAll('rect').data(data);
    const xScale = d3
      .scaleTime()
      .domain([new Date(data[0][0] * 1000), new Date(data[data.length - 1][0] * 1000)])
      .range([margin.left, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, Math.max(...Array.from(data, (d) => d[1]))])
      .range([height - margin.bottom, 0]);

    const xAxis = d3.axisBottom(xScale);
    svg
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis);

    svg
      .append('text') // text label for the x axis
      .attr('x', width / 2)
      .attr('y', height - margin.bottom / 10)
      .style('text-anchor', 'middle')
      .text('Date');

    const yAxis = d3.axisLeft(yScale);
    svg.append('g').attr('transform', `translate(${margin.left}, 0)`).call(yAxis);

    svg
      .append('text') // text label for the y axis
      .attr('x', 0)
      .attr('y', height / 2)
      .text('Trees');

    const tooltip = d3.select('.tooltip-area').style('opacity', 0);

    const mouseOver = () => {
      tooltip.style('opacity', 1);
      console.log('hey?');
    };

    const mouseLeave = () => {
      tooltip.style('opacity', 0);
    };

    const mouseEnter = (event: any, d: any) => {
      console.log('hi?');
      const text = d3.select('.d3-tip');
      text.text(`${d[1]} trees planted on ${getISODate(d[0])}`);
      const [x, y] = d3.pointer(event);

      tooltip.attr('transform', `translate(${x}, ${y})`);
    };

    selection
      .transition()
      .duration(500)
      .attr('height', (d) => yScale(d[1]))
      .attr('y', (d) => height - margin.bottom - yScale(d[1]));

    selection
      .enter()
      .append('rect')
      .attr('class', 'tree-data')
      .attr('x', (d) => xScale(new Date(d[0] * 1000)))
      .attr('y', () => height)
      .attr('width', (width - margin.left) / data.length)
      .attr('height', 0)
      .attr('fill', 'var(--color-red)')
      .transition()
      .duration(500)
      .attr('height', (d) => yScale(0) - yScale(d[1]))
      .attr('y', (d) => height - margin.bottom - (yScale(0) - yScale(d[1])));

    d3.selectAll('.tree-data').on('mouseenter', mouseEnter).on('mouseover', mouseOver).on('mouseleave', mouseLeave);

    selection
      .exit()
      .transition()
      .duration(500)
      .attr('y', () => height)
      .attr('height', 0)
      .remove();
  };

  return (
    <div className="chart">
      <svg ref={ref}>
        <g className="tooltip-area">
          <text className="d3-tip" />
        </g>
      </svg>
    </div>
  );
}

export default BasicBarChart;
