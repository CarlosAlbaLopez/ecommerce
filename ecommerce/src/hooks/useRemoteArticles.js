import { useEffect, useState } from "react";

export const useRemoteArticles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const loadArticles = async () => {
      const response = await fetch("http://localhost:8081/api/v1/articles");
      if (response.status === 200) {
        const json = await response.json();
        setArticles(json);
      }
    };
    loadArticles();
  }, []);

  return [articles, setArticles];
};
export default useRemoteArticles;
