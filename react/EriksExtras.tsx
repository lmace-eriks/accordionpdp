import React from "react";

// Styles
import styles from "./styles.css";

const EriksExtras = ({ extrasHTML }: { extrasHTML: string }) => {
    return <div className={styles.extrasContainer} dangerouslySetInnerHTML={{ __html: extrasHTML }} />;
};

EriksExtras.schema = {
    title: "EriksExtras",
    description: "",
    type: "object",
    properties: {

    }
};

export default EriksExtras;
