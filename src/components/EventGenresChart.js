import { useState, useEffect } from 'react';
import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from 'recharts';

const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);
  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#ff6f61'];

  useEffect(() => {
    const getData = () => {
      return genres.map((genre) => {
        const filteredEvents = events.filter((event) =>
          event.summary.includes(genre)
        );
        return {
          name: genre,
          value: filteredEvents.length,
        };
      });
    };

    if (events && events.length > 0) {
      setData(getData());
    }
  }, [events]);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    innerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent ? (
      <text
        x={x}
        y={y}
        fill="#333333"
        fontSize="12px"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${data[index].name} ${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={130}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          align="center"
          verticalAlign="bottom"
          layout="horizontal"
          wrapperStyle={{
            marginTop: '20px', 
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenresChart;
