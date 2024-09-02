// components/DynamicModal.js

import { useState, useEffect } from "react";

function DynamicModal({ title, description }) {
  const [isModalOpen, setIsModalOpen] = useState(true); // Set modal to open by default

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    // This useEffect could handle any side effects on mount if needed
    
    // e.g., tracking that the modal has opened
  }, []);

  return (
    <div>
      {/* Modal component */}
      {isModalOpen && (
        <dialog className="modal modal-bottom sm:modal-middle" open>
          <div className="modal-box">
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="py-4">{description}</p>
            <div className="modal-action">
              <button className="btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default DynamicModal;
