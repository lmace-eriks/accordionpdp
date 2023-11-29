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
import { DataPoints, PointObject, VTEXProperty } from "./typesdata";

// Data
import { categories } from "./typesdata";

// Components
import ProductDataCard from "./ProductDataCard";
import FeaturesSection from "./FeaturesSection";
import SizeChart from "./SizeChart";
import EriksExtras from "./EriksExtras";
import ProductDescription from "./ProductDescription";

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
const productDescriptionPositionInChildList = 1;
const sizeChartPositionInChildList = 2;
const featuresPositionInChildList = 3;
const extrasPositionInChildList = 4;

const PDPAccordion: StorefrontFunctionComponent<PDPAccordionProps> = ({ children, sectionProps }) => {
  const productContextValue = useProduct();

  // Refs
  const sections = useRef<Array<HTMLDivElement>>([]);
  const running = useRef(false);
  // const dataPointsControl = useRef<DataPoints>({});

  // State
  const [validSpecs, setValidSpecs] = useState<Array<PointObject>>([]);
  const [category, setCategory] = useState("");
  const [activeSection, setActiveSection] = useState(-1);
  const [productDescriptionHTML, setProductDescriptionHTML] = useState("");
  const [featuresHTML, setFeaturesHTML] = useState("");
  const [sizeChartHTML, setSizeChartHTML] = useState("");
  const [extrasHTML, setExtrasHTML] = useState("");
  const [applicableSections, setApplicableSections] = useState<Array<boolean>>(sectionProps.map(() => true));
  const [loadedSections, setLoadedSections] = useState<Array<boolean>>(sectionProps.map(section => !section.lazyLoaded));

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

  // Important for user navigation between PDPs.
  const resetData = () => {
    setValidSpecs([]);
    setCategory("");
    setFeaturesHTML("");
    setActiveSection(-1);
    const tempApplicableSections = sectionProps.map(() => true);
    setApplicableSections(tempApplicableSections);
  }

  const determineCategory = () => {
    // Prevents simultanious logic.
    if (running.current) return;
    running.current = true;

    resetData();

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
    const productCategory: string = breadcrumbs.filter((word: string) => word !== "")[1].toLowerCase();

    let validCategory = false;

    for (const categoryKey in categories) {
      // Only findSpecs() if productCategory is in {categories}.
      if (productCategory === categoryKey) {
        setCategory(productCategory);
        findSpecs(categories[productCategory]);
        validCategory = true;
        break;
      }
    }

    if (!validCategory) inactivateDetails();

    buildProductDescription(productInfo);
    findProperties(productInfo);
  }

  const buildProductDescription = (product: any) => {
    setProductDescriptionHTML(product.description);
  }

  const findProperties = (product: any) => {
    const productProperties = product.properties;

    if (!productProperties) {
      console.error("Product Properties not found in findFeatures()");
      return;
    }

    const featuresIndex = productProperties.findIndex((item: any) => item.name === "Features");
    const sizeChartIndex = productProperties.findIndex((item: any) => item.name === "Size Chart");
    const extrasIndex = productProperties.findIndex((item: any) => item.name === "Extra");

    if (sizeChartIndex > -1) {
      const sizeChartValue: string = productProperties[sizeChartIndex].values[0];
      buildSizeChart(sizeChartValue);
    }

    if (featuresIndex > -1) {
      setFeaturesHTML(productProperties[featuresIndex].values[0]);
    }

    if (extrasIndex > -1) {
      setExtrasHTML(productProperties[extrasIndex].values[0]);
    }

    // Turning off Size Chart within Accodion for now. 11/10/2023 - LM
    updateApplicableSections(sizeChartPositionInChildList, false);
    updateApplicableSections(featuresPositionInChildList, (featuresIndex > -1) ? true : false);

    running.current = false;
  }

  const buildSizeChart = (sizeChartValue: string) => {
    // This may not be needed in the future. Currently the "blank"
    // Size Chart is some HTML, so we need to sanitize in this
    // parent function for the time being. - LM
    if (!canUseDOM) return;
    const fakeBody = document.createElement("body");
    fakeBody.innerHTML = sizeChartValue;

    // Turning off Size Chart within Accodion for now. 11/10/2023 - LM
    // const chartImage: HTMLImageElement = fakeBody.querySelector(".vtex-size-chart-image") as HTMLImageElement;
    const chartImage = null;

    // if (chartImage) setSizeChartHTML(chartImage.src);

    updateApplicableSections(sizeChartPositionInChildList, !!chartImage);
  }

  const findSpecs = (dataList: DataPoints) => {
    const productProperties = productContextValue.product?.properties;

    if (!productProperties) {
      console.error("Product Properties not found in findSpecs()");
      return;
    }

    const specsInDataCard: Array<VTEXProperty> = productProperties.filter((spec: VTEXProperty) =>
      spec.name.includes("ProductData_"));

    const validSpecList: Array<PointObject> = specsInDataCard.map((item) => {
      const keyFix = item.name as keyof DataPoints;

      return {
        label: dataList[keyFix]?.label!,
        sortPriority: dataList[keyFix]?.sortPriority!,
        value: item.values[0],
        info: dataList[keyFix]?.info!
      }
    });

    if (!!validSpecList.length) {
      const comparePriority: any = (a: PointObject, b: PointObject) => a.sortPriority > b.sortPriority;
      validSpecList.sort(comparePriority);

      updateApplicableSections(dataCardPositionInChildList, true);

      setValidSpecs(validSpecList);
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
    activateSection(productDescriptionPositionInChildList);
  }

  const activateSection = (section: number, scrollTo: boolean = false) => {
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
            <div className={styles.wrapper}>
              {
                index === dataCardPositionInChildList ? <ProductDataCard validSpecs={validSpecs} category={category} /> :
                  index === productDescriptionPositionInChildList ? <ProductDescription productDescriptionHTML={productDescriptionHTML} /> :
                    index === featuresPositionInChildList ? <FeaturesSection featuresHTML={featuresHTML} /> :
                      index === extrasPositionInChildList ? <EriksExtras extrasHTML={extrasHTML} /> :
                        index === sizeChartPositionInChildList ? <SizeChart sizeChartHTML={sizeChartHTML} /> :
                          !loadedSections[index] ? <div>Loading Data...</div> : children[index]
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
