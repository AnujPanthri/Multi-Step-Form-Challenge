import "./SideBar.css";
import React from 'react'
import Step from "@components/Step";

function SideBar({
  formIdx,
  formTitles,
}) {
  return (
    <div className="sidebar">
      {formTitles.map((title, idx) => (
        title &&
        (<Step
          isActive={formIdx == idx}
          key={idx}
          number={idx + 1}
          title={title}
        />)
      ))}
    </div>
  )
}

export default SideBar;