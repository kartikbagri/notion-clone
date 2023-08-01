import { useParams } from "react-router-dom";
import styles from "./CurrentPage.module.css";
import PageContent from "./PageContent";
import { useEffect, useState } from "react";
import axios from "axios";
import { CURRENT_PAGE_MOCK_DATA } from "../MOCK_DATA";

const CurrentPage = () => {
  const [currentPage, setCurrentPage] = useState({});
  const [loading, setLoading] = useState(true);
  const { pageId } = useParams();

  const fetchPage = async () => {
    // const response = axios.get('');
    setLoading(true);
    setCurrentPage(CURRENT_PAGE_MOCK_DATA);
    setLoading(false);
  };

  useEffect(() => {
    fetchPage();
  }, []);

  return (
    <div className={styles["current-page"]}>
      {!pageId && (
        <p className={styles["center-content"]}>
          Select any one page to get started.
        </p>
      )}
      {pageId && <PageContent page={currentPage} />}
      {pageId && loading && (
        <p className={styles["center-content"]}>Loading...</p>
      )}
    </div>
  );
};

export default CurrentPage;
