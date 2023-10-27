import React, { useState, useEffect } from "react";
import { canUseDOM } from "vtex.render-runtime";

// Styles
import styles from "./styles.css";


const FeaturesSection = ({ featuresHTML }: { featuresHTML: string }) => {
  const [productFeatures, setProductFeatures] = useState("");

  useEffect(() => {
    if (featuresHTML) {
      sanitizeHTML(featuresHTML);
    }
  }, [featuresHTML]);

  // Removing some legacy <elements> that complicate the DOM. LM
  const sanitizeHTML = (value: string) => {
    if (!canUseDOM) return;

    const fakeBody = document.createElement("body");
    fakeBody.innerHTML = value;

    const badH1 = fakeBody.querySelector("h1");
    if (badH1) badH1.remove();

    const blankWrapperDiv = fakeBody.querySelector("body > div");
    if (blankWrapperDiv) {
      const classList = !!blankWrapperDiv.classList.length;
      if (!classList) fakeBody.innerHTML = blankWrapperDiv.innerHTML;
    }

    setProductFeatures(fakeBody.innerHTML);
  }

  return (
    <div className={styles.featuresContainer} dangerouslySetInnerHTML={{ __html: productFeatures }} />
  );
};

FeaturesSection.schema = {
  title: "FeaturesSection",
  description: "",
  type: "object",
  properties: {

  }
};

export default FeaturesSection;

