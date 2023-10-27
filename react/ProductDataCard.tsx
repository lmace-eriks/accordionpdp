import React, { useRef, useState } from "react";
// import { Link, canUseDOM } from "vtex.render-runtime";

// Styles
import styles from "./styles.css";

// Types
import { PointObject, MoreInfoObject } from "./typesdata";
import { removeSpaces } from "./AccordionPDP";

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

const ProductDataCard = ({ validSpecs, category }: { validSpecs: Array<PointObject>, category: string }) => {
  const modal = useRef<HTMLDialogElement>(null);
  const [moreInfo, setMoreInfo] = useState<MoreInfoObject>({});

  const openModalClick = (index: number) => {
    console.info(category);
    const title = validSpecs[index]?.label;
    const text = validSpecs[index]?.info?.text;
    const image = validSpecs[index]?.info?.image;
    setMoreInfo({ title, text, image });
    modal.current?.showModal();
  }

  const closeModalClick = () => {
    setMoreInfo({ title: "", text: "", image: "" });
    modal.current?.close();
  }

  // Value Snowboard Element?
  const ValueElement = ({ index, label }: { index: number, label: string }) => (
    <div className={styles.value}>
      {label === "All Style" && // Best Use          
        <div className={styles.valueStack}>
          <div className={styles.valueText}>
            {validSpecs[index]?.value}
          </div>
          {category === "skis" && <img src={`/arquivos/pdc-v2-allstyle-ski-${removeSpaces(validSpecs[index].value!)}.png`} alt="" className={styles.valueImage} width={420} height={80} style={{ maxWidth: "420px" }} />}
          {category === "snowboards" && <img src={`/arquivos/pdc-v2-allstyle-snowboard-${removeSpaces(validSpecs[index].value!)}.png`} alt="" className={styles.valueImage} width={505} height={80} style={{ maxWidth: "505px" }} />}
        </div>
      }
      {label === "Flex" &&
        <div className={styles.valueStack}>
          <div className={styles.valueText}>
            {`${validSpecs[index]?.value} out of 10 - ${flexRating(validSpecs[index].value!)}`}
          </div>
          <img src={`/arquivos/pdc-flex-${validSpecs[index]?.value}.png`} alt="" className={styles.valueImage} width={400} height={40} style={{ maxWidth: "400px" }} />
        </div>
      }
      {label === "Profile" &&
        <div className={styles.valueStack}>
          <div className={styles.valueText}>
            {validSpecs[index]?.value}
          </div>
          <img src={`/arquivos/pdc-profile-${removeSpaces(validSpecs[index].value!)}.png`} alt="" className={styles.valueImage} width={400} height={80} style={{ maxWidth: "400px" }} />
        </div>
      }
      {label === "Rider Level" &&
        <div className={styles.valueStack}>
          <div className={styles.valueText}>
            {addSpaces(validSpecs[index].value!)}
          </div>
          <img src={`/arquivos/pdc-${removeSpaces((validSpecs[index].value!))}.png`} alt="" className={styles.valueImage} width={450} height={80} style={{ maxWidth: "450px" }} />
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
        <div className={styles.valueText}>{validSpecs[index].value}</div>
      }
    </div>
  )

  return (
    <div className={styles.pdcContainer}>

      {validSpecs.map((spec: PointObject, index: number) => (
        <div key={`detail-${index}`} className={styles.detailsRow}>
          <div className={styles.spec}>{spec.label}: <span className={styles.valueTextMobile}>{spec.value}</span></div>
          <ValueElement index={index} label={spec.label} />
          <button onClick={() => openModalClick(index)} data-spec={spec.label} aria-label={`Learn more about ${spec.label}`} className={styles.learnMore}>
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

