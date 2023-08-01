import { CURRENT_PAGE_MOCK_DATA } from "../MOCK_DATA";
import styles from "./PageContent.module.css";
import { useCallback, useState } from "react";
import ContentEditable from "react-contenteditable";

const PageContent = ({ page }) => {
  const [pageComponents, setPageComponents] = useState(
    CURRENT_PAGE_MOCK_DATA.content
  );
  const [openMenuItem, setOpenMenuItem] = useState(null);

  const Menu = ({ index }) => {
    const deleteHandler = () => {
      if (isNaN(index) || openMenuItem !== index) return;
      setPageComponents((prev) => {
        prev.splice(index, 1);
        setOpenMenuItem(null);
        return [...prev];
      });
    };

    const addHandler = () => {
      if (isNaN(index) || openMenuItem !== index) return;
      setPageComponents((prev) => {
        prev.splice(index + 1, 0, "");
        setOpenMenuItem(null);
        return [...prev];
      });
    };

    return (
      <ul className={styles["floating-menu"]}>
        <li onClick={addHandler}>Add</li>
        <li onClick={deleteHandler}>Delete</li>
      </ul>
    );
  };

  const changeContent = useCallback((e) => {
    const index = e.currentTarget.getAttribute("data-index");
    setPageComponents((prev) => {
      const text = new DOMParser().parseFromString(e.target.value, "text/html")
        .documentElement.textContent;
      if (text === "") {
        console.log(text);
        prev[index] = "";
        return [...prev];
      }
      if (text === "/head") {
        prev[index] = "<h1></h1>";
        return [...prev];
      } else if(text === "/subhead") {
        prev[index] = "<h2></h2>";
        return [...prev];
      }
      const tagName = new DOMParser()
        .parseFromString(e.target.value, "text/html")
        .documentElement.querySelectorAll("h1,h2,p")[0]?.tagName;
      if (tagName === "P" || !tagName) {
        prev[index] = `<p>${text}</p>`;
      } else if (tagName === "H1") {
        prev[index] = `<h1>${text}</h1>`;
      } else if (tagName === "H2") {
        prev[index] = `<h2>${text}</h2>`;
      }
      return [...prev];
    });
  }, []);

  const openMenu = (e) => {
    const elem = e.target;
    const index = elem.getAttribute("data-index");
    setOpenMenuItem(Number.parseInt(index));
  };

  return (
    <div className={styles["page-content-container"]}>
      {pageComponents.map((component, index) => {
        return (
          <div className={styles["input-container"]} key={index}>
            <span
              className="material-icon material-symbols-outlined"
              data-index={index}
              onClick={openMenu}
            >
              more_vert
            </span>
            <ContentEditable
              className={styles["input-component"]}
              onChange={changeContent}
              key={index}
              data-index={index}
              html={component}
              placeholder="Type in"
            />
            {openMenuItem === index && <Menu index={index} />}
          </div>
        );
      })}
    </div>
  );
};

export default PageContent;
