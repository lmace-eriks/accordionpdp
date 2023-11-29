import React from "react";

// Styles
import styles from "./styles.css";

const ProductDescription = ({ productDescriptionHTML }: { productDescriptionHTML: string }) => {
    return <div className={styles.extrasContainer} dangerouslySetInnerHTML={{ __html: productDescriptionHTML }} />;
};

ProductDescription.schema = {
    title: "ProductDescription",
    description: "",
    type: "object",
    properties: {

    }
};

export default ProductDescription;
