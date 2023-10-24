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
  lazyLoaded: boolean
}

// Types
import { DataPoints, PointObject } from "./typesdata";

// Data
import { categories } from "./typesdata";

// Components
import ProductDataCard from "./ProductDataCard";

export const removeSpaces = (value: string) => value.split(" ").join("-").toLowerCase().replace("'", "");

const waitForDOM = (callbackFunction: any, ms: number = 1) => setTimeout(() => callbackFunction(), ms);

const PDPAccordion: StorefrontFunctionComponent<PDPAccordionProps> = ({ children, sectionProps }) => {
  const productContextValue = useProduct();

  // Refs
  const productInfo = useRef<any>();
  const sections = useRef<Array<HTMLDivElement>>([]);
  const wrappers = useRef<Array<HTMLDivElement>>([]);
  const dataPointsControl = useRef<DataPoints>({});

  // State
  const [validSpecs, setValidSpecs] = useState<Array<PointObject>>([]);
  const [activeSection, setActiveSection] = useState(-1);
  const [activeHeight, setActiveHeight] = useState(0);
  const [loadedSections, setLoadedSections] = useState<Array<boolean>>(sectionProps.map(section => !section.lazyLoaded));

  // Run on load
  useEffect(() => determineCategory(), []);

  useEffect(() => {
    if (!canUseDOM) return;
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  });

  // Run on navigate
  const handleMessage = (e: MessageEvent) => {
    const eventName = e.data.eventName;
    if (eventName === "vtex:productView") determineCategory();
  }

  const determineCategory = () => {
    // Reset data.
    setValidSpecs([]);
    dataPointsControl.current = {};

    productInfo.current = productContextValue.product;
    if (!productInfo.current) return;

    const categoryTree: Array<any> = productInfo.current.categoryTree;
    if (!categoryTree) return;

    // Identifying category is position [1] in categoryTree.
    const productCategory = categoryTree[1]?.name?.toLowerCase();

    let validCategory = false;

    for (const key in categories) {
      // Only searchForSpecs() if productCategory is in {categories}.
      if (productCategory === key) {
        dataPointsControl.current = categories[productCategory];
        findSpecs();
        // checkReadyDOM();
        validCategory = true;
        break;
      }
    }

    if (!validCategory) activateSection(1); // Product Description.
  }

  const findSpecs = () => {
    const dataList = dataPointsControl.current;
    const productProperties = productInfo.current.properties;
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
      setValidSpecs(tempValidSpecs);
      activateSection(0); // Details.
      console.info(tempValidSpecs);
    } else {
      activateSection(1); // Product Description.
    }
  }

  const activateSection = (section: number, scrollTo: boolean = false) => {
    if (!!wrappers.current[section]) {
      const dataHeight = Number(wrappers.current[section].offsetHeight);
      setActiveHeight(dataHeight);
    }
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
        <section key={section.title} ref={(element: HTMLDivElement) => setSectionRef(element, index)} aria-labelledby={`${removeSpaces(section.title)}-title`} data-pdp-section={index} data-active={activeSection === index} data-applicable={index === 0 ? !!validSpecs.length ? "true" : "false" : "true"} className={styles.dataSection}>
          <button aria-controls={`window-${index}`} aria-expanded={activeSection === index} onClick={() => sectionClick(index)} className={styles.titleButton}>
            <h2 id={`${removeSpaces(section.title)}-title`} className={styles.buttonText}>{section.title}</h2>
            <img src="/arquivos/sm-caret.gif" width={24} height={14} className={styles.caret} />
          </button>
          {/* <div style={{ height: `${activeSection === index ? activeHeight : 0}px` }} className={styles.window}> */}
          <div id={`window-${index}`} className={styles.window}>
            <div ref={(element: HTMLDivElement) => setWrapperRef(element, index)} className={styles.wrapper}>
              {index === 0 ? <ProductDataCard validSpecs={validSpecs} /> :
                !loadedSections[index] ? <div>Loading Data...</div> : children[index - 1]}
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
