import { useState, useRef } from "react";
import { useClickOutside } from "./useClickOutside";

export default function Simple() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => {
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
