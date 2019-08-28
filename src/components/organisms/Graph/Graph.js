import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Line, defaults } from 'react-chartjs-2';
import moment from 'moment';
import { stylizeNumber } from 'utils/format';
// eslint-disable-next-line no-unused-vars
import zoom from 'chartjs-plugin-zoom';

defaults.global.defaultFontFamily = 'Titillium Web';
defaults.global.defaultFontStyle = 'bold';

const Wrapper = styled.div`
  background-color: ${({ theme }) => (theme.quaternary)};
  min-width: 0;
`;

const Graph = ({ symbol, labels, data }) => (
  <Wrapper>
    <Line
      redraw
      data={{
        labels: data.map(column => column[0]).reverse(),
        datasets: [{
          data: data.map(column => column[1]).reverse(),
          label: labels[1],
          borderColor: 'hsl(215, 100%, 60%)',
          backgroundColor: 'rgb(51, 136, 255, 0.2)',
          hidden: true,
        }, {
          data: data.map(column => column[4]).reverse(),
          label: labels[4],
          borderColor: 'hsl(35, 100%, 60%)',
          backgroundColor: 'rgba(255, 170 , 51, 0.2)',
        }, {
          data: data.map(column => column[2]).reverse(),
          label: labels[2],
          borderColor: 'hsl(125, 100%, 60%)',
          backgroundColor: 'rgba(51, 255, 68, 0.2)',
          hidden: true,
        }, {
          data: data.map(column => column[3]).reverse(),
          label: labels[3],
          borderColor: 'hsl(350, 100%, 60%)',
          backgroundColor: 'rgb(255, 51, 85, 0.2)',
          hidden: true,
        }, {
          data: data.map(column => column[5]).reverse(),
          label: labels[5],
          borderColor: 'hsl(260, 100%, 60%)',
          backgroundColor: 'rgb(119, 51, 255, 0.2)',
          hidden: true,
        }, {
          data: data.map(column => column[6]).reverse(),
          label: labels[6],
          borderColor: 'hsl(170, 100%, 60%)',
          backgroundColor: 'rgb(51, 255, 221, 0.2)',
          hidden: true,
        }, {
          data: data.map(column => column[7]).reverse(),
          label: labels[7],
          borderColor: 'hsl(305, 100%, 60%)',
          backgroundColor: 'rgb(255, 51, 238, 0.2)',
          hidden: true,
        }, {
          data: data.map(column => column[8]).reverse(),
          label: labels[8],
          borderColor: 'hsl(80, 100%, 60%)',
          backgroundColor: 'rgb(187, 255, 51, 0.2)',
          hidden: true,
        },
        ],
      }}
      options={{
        title: {
          display: true,
          text: `${symbol}: ${stylizeNumber(data[0][5], '%')}`,
          fontSize: 15,
        },
        legend: {
          labels: {
            fontSize: 15,
          },
        },
        tooltips: {
          mode: 'index',
          position: 'nearest',
        },
        elements: {
          line: {
            tension: 0,
          },
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              ticks: {
                fontSize: 15,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                callback(label) {
                  return label.toFixed(2);
                },
                fontSize: 15,
              },
            },
          ],
        },
        pan: {
          enabled: true,
          drag: false,
          mode: 'xy',
          rangeMin: {
            x: moment().subtract('1', 'years').toDate(),
          },
          rangeMax: {
            x: moment().toDate(),
          },
        },
        zoom: {
          enabled: true,
          mode: 'x',
          rangeMin: {
            x: moment().subtract('1', 'years').toDate(),
          },
          rangeMax: {
            x: moment().toDate(),
          },
        },
      }}
    />
  </Wrapper>
);

Graph.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.array.isRequired,
  labels: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
  symbol: PropTypes.string.isRequired,
};

export default Graph;
