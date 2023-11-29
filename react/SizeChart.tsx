import React from "react";

// Styles
import styles from "./styles.css";

const SizeChart = ({ sizeChartHTML }: { sizeChartHTML: string }) => {

    return <img src={sizeChartHTML} loading="lazy" className={styles.sizeChartImage} />;
};

SizeChart.schema = {
    title: "SizeChart",
    description: "",
    type: "object",
    properties: {

    }
};

export default SizeChart;

