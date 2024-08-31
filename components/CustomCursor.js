import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isLinkHovered, setIsLinkHovered] = useState(false);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseDown = () => {
      setIsActive(true);
    };

    const onMouseUp = () => {
      setIsActive(false);
    };

    addEventListeners();
    return () => removeEventListeners();
  }, []);

  useEffect(() => {
    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a').forEach((el) => {
        el.addEventListener('mouseover', () => setIsLinkHovered(true));
        el.addEventListener('mouseout', () => setIsLinkHovered(false));
      });
    };

    handleLinkHoverEvents();
  }, []);

  const cursorClasses = `
    fixed top-0 left-0 z-50 pointer-events-none
    transition-transform duration-150 ease-in-out
    ${isVisible ? 'opacity-100' : 'opacity-0'}
    ${isActive ? 'bg-green-700 scale-95' : 'bg-green-500'}
    ${isLinkHovered ? 'scale-125' : 'scale-100'}
  `;

  return (
    <div
      className={cursorClasses}
      style={{
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        transform: `translate3d(${position.x - 15}px, ${position.y - 15}px, 0)`,
      }}
    />
  );
};

export default CustomCursor;
