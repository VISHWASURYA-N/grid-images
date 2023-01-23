// import React from "react";
// const Modal = ({ setSelectId, setSelectedImg, selectedImg }) => {
//   const handleClick = (e) => {
//     if (e.target.classList.contains("backdrop")) {
//       setSelectedImg(null);
//     }
//   };

//   return (
//     <div className="backdrop" onClick={handleClick}>
//       <div>Xssdgfsduihasfashfhhds</div>
//       <img src={selectedImg.urls.full} alt="enlarged pic" />
//       <button
//         onClick={() => {
//           setSelectId(selectedImg.id, +1);
//         }}
//       >
//         Next
//       </button>
//       <button
//         onClick={() => {
//           setSelectId(selectedImg.id, -1);
//         }}
//       >
//         prev
//       </button>
//     </div>
//   );
// };

// export default Modal;
import React, { useState } from "react";

const Modal = ({ images, initialIndex, setSelectedImg }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const handleClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setSelectedImg(null);
    }
  };

  const handleClose = () => {
    setSelectedImg(null);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex + images.length - 1) % images.length);
  };
  console.log(images[currentIndex]);
  return (
    <div className="backdrop" onClick={handleClick}>
      <div className="modal">
        <button className="close" onClick={handleClose}>
          X
        </button>
        <div className="button-container">
          <div className="prev" onClick={handlePrev}>
            Prev
          </div>
          <img src={images[currentIndex].urls.full} alt="Modal Image" />
          <div className="next" onClick={handleNext}>
            Next
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
