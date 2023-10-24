import React, { useEffect, useRef, useState, ReactChildren } from "react";
import { canUseDOM } from "vtex.render-runtime";

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
import { forEach } from "ramda";

// Class of second tier breadcrumb. Inner Text contains "Bicycles", "Snowboards", ect.
const categoryClass = "vtex-breadcrumb-1-x-arrow--2";

const grabDOM: any = (selector: string) => canUseDOM ? document.querySelector(selector) : null;
export const removeSpaces = (value: string) => value.split(" ").join("-").toLowerCase().replace("'", "");
const maximumCheckReadyDOMCount = 3;

const waitForDOM = (callbackFunction: any, ms: number = 1) => setTimeout(() => callbackFunction(), ms);

const PDPAccordion: StorefrontFunctionComponent<PDPAccordionProps> = ({ children, sectionProps }) => {

  // Refs
  const sections = useRef<Array<HTMLDivElement>>([]);
  const wrappers = useRef<Array<HTMLDivElement>>([]);
  const dataPointsControl = useRef<DataPoints>({});
  const checkReadyDOMCount = useRef(0);

  // State
  const [validSpecs, setValidSpecs] = useState<DataPoints>({});
  const [showDataCard, setShowProductDataCard] = useState(false);
  const [activeSection, setActiveSection] = useState(-1);
  const [activeHeight, setActiveHeight] = useState(0);
  const [loadedSections, setLoadedSections] = useState<Array<boolean>>(sectionProps.map(section => !section.lazyLoaded));

  // Run on load
  useEffect(() => determineCategory(), []);

  // Run on navigate
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
    setValidSpecs({});
    dataPointsControl.current = {};

    const productCategoryDOM = grabDOM(`.${categoryClass}`);
    if (!productCategoryDOM) return;

    const productCategory = productCategoryDOM.innerText.toLowerCase();
    let validCategory = false;

    for (const key in categories) {
      // Only searchForSpecs() if productCategory is in {categories}.
      if (productCategory === key) {
        dataPointsControl.current = categories[productCategory];
        checkReadyDOM();
        validCategory = true;
        break;
      }
    }

    if (!validCategory) activateSection(1); // Product Description.
  }

  // Since we're using the DOM to populate data, we sometimes need to wait for it to update.
  // This is more of a fallback than an absolutely necessary function. - LM
  const checkReadyDOM = () => {
    if (checkReadyDOMCount.current >= maximumCheckReadyDOMCount) {
      activateSection(1); // Product Description.
      return;
    }

    const tableElement = grabDOM(`.vtex-store-components-3-x-specificationsTableBody--product-data-card`);

    if (tableElement) {
      searchForSpecs();
    } else {
      checkReadyDOMCount.current = checkReadyDOMCount.current + 1;
      waitForDOM(() => checkReadyDOM(), 200);
    }
  }

  const searchForSpecs = () => {
    const dataList = dataPointsControl.current;
    const tempValidSpecs: DataPoints = new Object();
    const dataKeys: Array<string> = Object.keys(dataList);
    const dataAttributes: Array<string> = [];

    // Build [dataAttributes].
    for (const key in dataList) {
      const keyTypeFix: keyof DataPoints = key as keyof DataPoints;
      const dataPoint = dataList[keyTypeFix]!;
      const attribute = dataPoint.attribute!;
      dataAttributes.push(attribute);
    }

    for (let index = 0; index < dataAttributes.length; index++) {
      const attribute: string = dataAttributes[index];

      // Value is in the <td> that follows the specification.
      const val = grabDOM(`[data-specification="${attribute}"] + [data-specification]`) as HTMLElement;
      if (!val) continue;

      const tempKey = dataKeys[index] as keyof DataPoints;

      const tempObject: PointObject = {
        attribute,
        label: dataList[tempKey]?.label!,
        info: dataList[tempKey]?.info,
        value: val.innerText
      }

      tempValidSpecs[tempKey] = tempObject;
    }

    // Only setValidSpecs() if we have found product attributes.
    if (Object.keys(tempValidSpecs).length) {
      setValidSpecs(tempValidSpecs);
      setShowProductDataCard(true);
      // Product Data Card.
      activateSection(0);
    } else {
      // Product Details.
      activateSection(1);
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
        <section key={section.title} ref={(element: HTMLDivElement) => setSectionRef(element, index)} aria-labelledby={`${removeSpaces(section.title)}-title`} data-pdp-section={index} data-active={activeSection === index} data-applicable={index === 0 ? showDataCard ? "true" : "false" : "true"} className={styles.dataSection}>
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

