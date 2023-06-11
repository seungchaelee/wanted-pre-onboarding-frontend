import { useState, useEffect, useCallback } from "react";

export default function useFetch(url) {
  const [data, setData] = useState([]);

  const loadJson = useCallback(async function () {
    const res = await fetch(url);
    const datas = await res.json();

    setData(datas);

    return datas;
  }, [url]);

  useEffect(() => {
    loadJson();
  }, [loadJson]);

  return data;
}
