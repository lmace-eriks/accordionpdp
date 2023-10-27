import React, { useEffect, useRef, useState, ReactChildren } from "react";
import { canUseDOM } from "vtex.render-runtime";
// @ts-ignore
import { useProduct } from 'vtex.product-context';

// Styles
import styles from "./styles.css";

interface PDPAccordionProps {
  children: ReactChildren | any
  sectionTitles: Array<string>
  sectionProps: Array<SectionPropsObject>
  blockClass: string
}

interface SectionPropsObject {
  title: string
  lazyLoaded: boolean,
  sectionID?: string
}

// Types
import { DataPoints, PointObject } from "./typesdata";

// Data
import { categories } from "./typesdata";

// Components
import ProductDataCard from "./ProductDataCard";
import FeaturesSection from "./FeaturesSection";

export const removeSpaces = (value: string) => {
  const lowerCased = value.toLowerCase();
  const allWords = lowerCased.split(" ");

  for (let index = 0; index < allWords.length; index++) {
    const word = allWords[index];
    if (word === "|") allWords.splice(index, 1);
  }

  const combineWithHypens = allWords.join("-");

  const removedApostrophes = combineWithHypens.split("'").join("");
  return removedApostrophes;
}

const waitForDOM = (callbackFunction: any, ms: number = 1) => setTimeout(() => callbackFunction(), ms);
const dataCardPositionInChildList = 0;
const featuresPositionInChildList = 2;

const PDPAccordion: StorefrontFunctionComponent<PDPAccordionProps> = ({ children, sectionProps }) => {
  const productContextValue = useProduct();

  // Refs
  const sections = useRef<Array<HTMLDivElement>>([]);
  const wrappers = useRef<Array<HTMLDivElement>>([]);
  const dataPointsControl = useRef<DataPoints>({});

  // State
  const [validSpecs, setValidSpecs] = useState<Array<PointObject>>([]);
  const [category, setCategory] = useState("");
  const [activeSection, setActiveSection] = useState(-1);
  const [featuresHTML, setFeaturesHTML] = useState("");
  const [applicableSections, setApplicableSections] = useState<Array<boolean>>(sectionProps.map(() => true));
  const [loadedSections, setLoadedSections] = useState<Array<boolean>>(sectionProps.map(section => !section.lazyLoaded));
  // const [activeHeight, setActiveHeight] = useState(0);

  // Run on load
  useEffect(() => determineCategory(), []);

  useEffect(() => {
    if (!canUseDOM) return;
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  });

  const handleMessage = (e: MessageEvent) => {
    // Run on navigate
    const eventName = e.data.eventName;
    if (eventName === "vtex:productView") determineCategory();
  }

  const resetData = () => {
    setValidSpecs([]);
    setCategory("");
    setFeaturesHTML("");
    dataPointsControl.current = {};
    setActiveSection(-1);
    const tempApplicableSections = sectionProps.map(() => true);
    setApplicableSections(tempApplicableSections);
  }

  const determineCategory = () => {
    resetData();

    const productContext = productContextValue;
    const rightNow = Date.now();
    console.info({ productContext, rightNow });

    const productInfo = productContextValue.product;
    if (!productInfo) {
      console.error("Product Info not found.");
      return;
    }

    // There exists a property inside VTEX's useProduct() called 
    // categoryTree. This property is sometimes undefined on the first
    // render, so we break this similar array down in a slightly more
    // cumbersome way to get to our category string - LM
    const breadcrumbs = productInfo.categories[0].split("/");
    const productCategory = breadcrumbs.filter((word: string) => word !== "")[1].toLowerCase();

    let validCategory = false;

    for (const categoryKey in categories) {
      // Only findSpecs() if productCategory is in {categories}.
      if (productCategory === categoryKey) {
        setCategory(productCategory);
        dataPointsControl.current = categories[productCategory];
        findSpecs();
        validCategory = true;
        break;
      }
    }

    if (!validCategory) inactivateDetails();
    findFeatures();
  }

  const findFeatures = () => {
    const product = productContextValue.product;
    const productProperties = product.properties;
    if (!productProperties) {
      console.error("Product Properties not found in findFeatures()");
      return;
    }

    let featuresFound = false;

    for (let index = 0; index < productProperties.length; index++) {
      // Working from back of list since "Features" is towards the end. - LM
      const property = productProperties[(productProperties.length - 1) - index];

      if (property.name === "Features") {
        const value = property.values[0];
        featuresFound = true;
        setFeaturesHTML(value);

        updateApplicableSections(featuresPositionInChildList, true);

        break;
      }
    }

    if (!featuresFound) {
      updateApplicableSections(featuresPositionInChildList, false);
    }
  }

  const findSpecs = () => {
    const dataList = dataPointsControl.current;
    const productProperties = productContextValue.product?.properties;
    if (!productProperties) {
      console.error("Product Properties not found in findSpecs()");
      return;
    }
    const tempValidSpecs: Array<PointObject> = [];

    for (let propIndex = 0; propIndex < productProperties.length; propIndex++) {
      const property = productProperties[propIndex].name;
      const isDataCard = property.includes("ProductData_");

      // If property is a valid Product Data Card property, build state.
      if (isDataCard) {
        const keyFix = property as keyof DataPoints;
        const label = dataList[keyFix]?.label!;
        const info = dataList[keyFix]?.info!;
        const value = productProperties[propIndex].values[0];

        const tempObject: PointObject = {
          label,
          value,
          info
        }

        tempValidSpecs.push(tempObject);
      }
    }

    if (!!tempValidSpecs.length) {
      updateApplicableSections(dataCardPositionInChildList, true);

      setValidSpecs(tempValidSpecs);
      activateSection(dataCardPositionInChildList);
    } else {
      inactivateDetails();
    }
  }

  const updateApplicableSections = (section: number, activation: boolean) => {
    const tempApplicableSections = applicableSections;
    tempApplicableSections[section] = activation;
    setApplicableSections(tempApplicableSections);
  }

  const inactivateDetails = () => {
    updateApplicableSections(dataCardPositionInChildList, false);
    activateSection(1); // Product Description.
  }

  const activateSection = (section: number, scrollTo: boolean = false) => {
    // if (!!wrappers.current[section]) {
    //   const dataHeight = Number(wrappers.current[section].offsetHeight);
    //   setActiveHeight(dataHeight);
    // }
    setActiveSection(section);
    if (scrollTo) scrollToActiveSection(section);
  }

  const scrollToActiveSection = (section: number) => {
    waitForDOM(() => {
      const currentSection = sections.current[section];
      if (canUseDOM) window.scrollTo({ top: currentSection.offsetTop - 50, left: 0, behavior: "smooth" });
    });
  }

  const sectionClick = (index: number) => {
    if (index === activeSection) {
      activateSection(-1); // Close All;
      waitForDOM(() => {
        if (canUseDOM) window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      });
    } else {
      const sectionShouldLazyLoad = sectionProps[index].lazyLoaded;
      sectionShouldLazyLoad ? loadSection(index) : activateSection(index, true);
    }
  }

  const loadSection = (index: number) => {
    const tempLoadedSections = loadedSections;
    tempLoadedSections[index] = true;
    setLoadedSections(tempLoadedSections);
    activateSection(index, true);
  }

  const setWrapperRef = (element: HTMLDivElement, wrapper: number) => wrappers.current[wrapper] = element;
  const setSectionRef = (element: HTMLDivElement, wrapper: number) => sections.current[wrapper] = element;

  return (
    <section aria-label="Product Information" className={styles.container}>

      {sectionProps.map((section: SectionPropsObject, index: number) => (
        <section key={section.title} id={section.sectionID} ref={(element: HTMLDivElement) => setSectionRef(element, index)} tabIndex={-1} aria-labelledby={`${removeSpaces(section.title)}-title`} data-pdp-section={index} data-active={activeSection === index} data-applicable={applicableSections[index]} className={styles.dataSection}>
          <button aria-controls={`window-${index}`} aria-expanded={activeSection === index} onClick={() => sectionClick(index)} className={styles.titleButton}>
            <h2 id={`${removeSpaces(section.title)}-title`} className={styles.buttonText}>{section.title}</h2>
            <img src="/arquivos/sm-caret.gif" width={24} height={14} className={styles.caret} />
          </button>
          <div id={`window-${index}`} tabIndex={-1} className={styles.window}>
            <div ref={(element: HTMLDivElement) => setWrapperRef(element, index)} className={styles.wrapper}>
              {
                index === dataCardPositionInChildList ? <ProductDataCard validSpecs={validSpecs} category={category} /> :
                  index === featuresPositionInChildList ? <FeaturesSection featuresHTML={featuresHTML} /> :
                    !loadedSections[index] ? <div>Loading Data...</div> : children[index - 1]
              }
            </div>
          </div>
        </section>
      ))}

    </section>
  );
};

PDPAccordion.schema = {
  title: "PDPAccordion",
  description: "",
  type: "object",
  properties: {

  }
};

export default PDPAccordion;
