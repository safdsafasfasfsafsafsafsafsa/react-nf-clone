import { useState, useEffect } from "react";

// 검색어, 딜레이 지정 시간
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // delay 시간 지난 뒤 set~ 적용
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // delay 시간 전에 다시 타이핑하면 시간 초기화
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
