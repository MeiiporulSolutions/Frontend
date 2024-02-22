import React, { useState, useEffect } from 'react';
import { ResponsiveSankey } from '@nivo/sankey';

const Sankey = () => {
  const [data, setData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    fetch('http://localhost:9000/patientflow')
      .then(response => response.json())
      .then(responseData => {
        console.log('Response data:', responseData);
        const { patientFlow } = responseData;
        const nodes = [...new Set(patientFlow.flatMap(item => [item.from, item.to]))].map(id => ({ id }));
        const links = patientFlow.map(item => ({
          source: item.from,
          target: item.to,
          value: item.value
        }));
        setData({ nodes, links });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  return (
    <div style={{ width: '800px', height: '600px', margin: 'auto', position: 'relative' }}>
      <h4>Patient Flow Sankey Diagram</h4>
      {data.nodes.length > 0 && data.links.length > 0 && (
        <ResponsiveSankey
          data={data}
          margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
          align="justify"
          colors={{ scheme: 'category10' }}
          nodeOpacity={1}
          nodeThickness={18}
          nodeInnerPadding={3}
          nodeSpacing={24}
          nodeBorderWidth={0}
          nodeBorderColor={{ from: 'color', modifiers: [['darker', 0.8]] }}
          linkOpacity={0.5}
          linkHoverOthersOpacity={0.1}
          enableLinkGradient={true}
          labelPosition="outside"
          labelOrientation="vertical"
          labelPadding={16}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1]] }}
          animate={true}
          motionStiffness={140}
          motionDamping={13}
          nodeLabel={node => (
            <text x={node.x + node.width + 6} y={node.y + node.height / 2} textAnchor="start" dominantBaseline="middle" style={{ fill: 'black' }}>
              {node.id}
            </text>
          )}
        />
      )}
      <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>
        <div style={{ display: 'inline-block', marginRight: '20px' }}>
          <div style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: 'blue', marginRight: '5px' }}></div>
          <span style={{ color: 'blue' }}>Current Ward ID</span>
        </div>
        <div style={{ display: 'inline-block' }}>
          <div style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: 'orange', marginRight: '5px' }}></div>
          <span style={{ color: 'orange' }}>Transfer Ward ID</span>
        </div>
      </div>
    </div>
  );
};

export default Sankey;
