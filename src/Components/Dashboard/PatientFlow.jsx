import React from 'react';
import { ResponsiveSankey } from '@nivo/sankey';
import Grid from "@mui/material/Grid";
const MySankey = ({ data }) => (
  
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
    />
);

// Define your data here
const data = {
    nodes: [
        { id: 'A' },
        { id: 'B' },
        { id: 'C' },
        { id: 'D' },
        { id: 'E' },
    ],
    links: [
        { source: 'A', target: 'B', value: 10 },
        { source: 'A', target: 'C', value: 15 },
        { source: 'B', target: 'D', value: 8 },
        { source: 'C', target: 'D', value: 7 },
        { source: 'B', target: 'E', value: 5 },
        { source: 'C', target: 'E', value: 10 },
    ],
};

const App = () => (
 
  <Grid item xs={6}>
<div
style={{
  height: "53vh",
            width: "660px",
background: "#ffff",
borderRadius: "30px",
boxShadow: "5px 10px 6px rgba(0, 0, 0, 0.2)",
marginTop:"-620px",
marginLeft:"700px"
}}
>
        <MySankey data={data} />
    </div>
     </Grid>
);

export default App;
