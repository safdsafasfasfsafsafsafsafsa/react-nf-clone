import React, { useEffect } from "react";

export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      console.log("ref", ref.current);
      //   ref가 모달 내부: 그냥 놔둠
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      // ref 모달 외부: () => setModalOpen(false) 작동
      handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
