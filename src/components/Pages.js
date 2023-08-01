import axios from "axios";
import { useEffect, useState } from "react";
import { PAGES_MOCK_DATA } from "../MOCK_DATA";
import styles from "./Pages.module.css";
import { Link } from "react-router-dom";

const PagesList = ({ pages }) => {
  return (
    <ul>
      {pages.map((page) => {
        return (
					<Link to={`/page/${page.id}`} key={page.id}>
						<li
							onClick={() => {}}
							className={styles["list-item"]}
						>
							{page.pageName}
						</li>
					</Link>
        );
      })}
    </ul>
  );
};

const Pages = () => {
  const [pages, setPages] = useState(null);
	
	const fetchAllPages = async () => {
		// const response = await axios.get('');
		const data = PAGES_MOCK_DATA;
		setPages(data);
	};

  useEffect(() => {
    fetchAllPages();
  }, []);

  return (
    <div className={styles["pages-list-container"]}>
      {!pages && <p>Loading...</p>}
      {pages?.length === 0 && <p>Start adding pages.</p>}
      {pages?.length > 0 && (
        <PagesList pages={pages} />
      )}
    </div>
  );
};

export default Pages;
