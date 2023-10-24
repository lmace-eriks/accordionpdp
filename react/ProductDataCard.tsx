import React, { useEffect, useRef, useState, useMemo, memo, ReactChildren } from "react";
import { Link, canUseDOM } from "vtex.render-runtime";

// Styles
import styles from "./styles.css";

// Types
import { ProductDataCardProps, DataPoints, PointObject, MoreInfoObject } from "./typesdata";
import { removeSpaces } from "./PDPAccordion";

const addSpaces = (value: string) => value.split("-").join(" - ");

const flexRating = (value: string) => {
  const rating = Number(value);
  if (rating < 3) {
    return "Soft";
  } else if (rating >= 4 && rating <= 7) {
    return "Medium";
  } else { // 8 or greater.
    return "Firm";
  }
}

const ProductDataCard = ({ validSpecs }: ProductDataCardProps) => {
  const modal = useRef<HTMLDialogElement>(null);
  const [moreInfo, setMoreInfo] = useState<MoreInfoObject>({});

  const openModalClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;
    const spec: keyof DataPoints = target.dataset.spec as keyof DataPoints;

    const title = validSpecs[spec]?.label;
    const text = validSpecs[spec]?.info?.text;
    const image = validSpecs[spec]?.info?.image;
    setMoreInfo({ title, text, image });
    modal.current?.showModal();
  }

  const closeModalClick = () => {
    setMoreInfo({ title: "", text: "", image: "" });
    modal.current?.close();
  }

  // Value Snowboard Element?
  const ValueElement = ({ spec, label }: { spec: keyof DataPoints, label: string }) => (
    <div className={styles.value}>
      {label === "All Style" && // Best Use ?
        <div className={styles.valueText}>
          <div className={styles.valueText}>
            {validSpecs[spec]?.value}
          </div>
          <img src={`/arquivos/pdc-sb-${removeSpaces(validSpecs[spec]?.value)}.png`} alt="" className={styles.valueImage} width={505} height={80} />
        </div>
      }
      {label === "Flex" &&
        <div className={styles.valueText}>
          <div className={styles.valueText}>
            {`${validSpecs[spec]?.value} out of 10 - ${flexRating(validSpecs[spec]?.value)}`}
          </div>
          <img src={`/arquivos/pdc-flex-${validSpecs[spec]?.value}.png`} alt="" className={styles.valueImage} width={400} height={40} />
        </div>
      }
      {label === "Profile" &&
        <div className={styles.valueText}>
          <div className={styles.valueText}>
            {validSpecs[spec]?.value}
          </div>
          <img src={`/arquivos/pdc-sb-profile-${validSpecs[spec]?.value}.png`} alt="" className={styles.valueImage} width={400} height={80} />
        </div>
      }
      {label === "Rider Level" &&
        <div className={styles.valueStack}>
          <div className={styles.valueText}>
            {addSpaces(validSpecs[spec]?.value)}
          </div>
          <img src={`/arquivos/pdc-${(validSpecs[spec]?.value).toLowerCase()}.png`} alt="" className={styles.valueImage} width={450} height={80} />
        </div>
      }
      {/* String Only Outputs */
        (label === "Base Tech" ||
          label === "Base Type" ||
          label === "Bindings" ||
          label === "Core" ||
          label === "Gender" ||
          label === "Geometry" ||
          label === "Mounting" ||
          label === "Stance" ||
          label === "Shape" ||
          label === "Tail Type" ||
          label === "Turn Radius" ||
          label === "Waist Width") &&
        <div className={styles.valueText}>{validSpecs[spec]?.value}</div>
      }
    </div>
  )

  return (
    <div className={styles.pdcContainer}>
      {Object.keys(validSpecs).map((spec: string, index: number) => (
        <div key={`${spec}-${index}`} className={styles.detailsRow}>
          <div className={styles.spec}>{validSpecs[spec as keyof DataPoints]?.label}:</div>
          <ValueElement spec={spec as keyof DataPoints} label={validSpecs[spec as keyof DataPoints]?.label!} />
          <button onClick={openModalClick} data-spec={spec} aria-label={`Learn more about ${spec}`} className={styles.learnMore}>
            Learn More <span className={styles.questionMark}>?</span>
          </button>
        </div>
      ))}
      <dialog ref={modal} className={styles.dialog}>
        {moreInfo.title && <div className={styles.dialogTitle}>{moreInfo.title}</div>}
        {moreInfo.text && <div className={styles.dialogText}>{moreInfo.text}</div>}
        {moreInfo.image && <img src={moreInfo.image} className={styles.dialogImage} />}
        <button onClick={closeModalClick} className={styles.dialogButton}>Close</button>
      </dialog>
    </div>
  );
};

ProductDataCard.schema = {
  title: "ProductDataCard",
  description: "",
  type: "object",
  properties: {

  }
};

export default ProductDataCard;

