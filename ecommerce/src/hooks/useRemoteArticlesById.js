import { useEffect, useState } from "react";

export const useRemoteArticlesById = (id) => {
  const [article, setArticle] = useState([]);

  useEffect(() => {
    const loadArticle = async () => {
      const response = await fetch(
        `http://localhost:8081/api/v1/articles/${id}`
      );
      if (response.status === 200) {
        const json = await response.json();
        setArticle(json);
      }
    };
    loadArticle();
  }, []);

  return [article, setArticle];
};
export default useRemoteArticlesById;
