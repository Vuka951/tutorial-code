import { useState, useRef } from "react";
import { useClickOutside } from "./useClickOutsideMultiple";

export default function Multiple() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const otherRef = useRef(null);

  useClickOutside([dropdownRef, otherRef], () => {
    if (isDropdownOpen) {
      setDropdownOpen(false);
    }
  });

  return (
    <div
      style={{
        height: "50vh",
        width: "50vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <div ref={otherRef}>CLICK ME TOO</div>
        <button onClick={() => setDropdownOpen((prev) => !prev)}>
          Toggle Dropdown
        </button>
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            style={{
              position: "fixed",
              border: "1px solid black",
              padding: "10px",
              width: "150px",
            }}
          >
            THIS IS A DROPDWONAAAA
          </div>
        )}
      </div>
    </div>
  );
}
