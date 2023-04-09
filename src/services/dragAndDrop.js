const makeDraggable = (el, mousePosition, dragShift) => {
  el.style.pointerEvents = "none";
  el.style.position = "fixed";
  el.style.top = mousePosition[1] - dragShift[1] + "px";
  el.style.left = mousePosition[0] - dragShift[0] + "px";
  el.style.width = el.parentNode.offsetWidth + "px";
  el.style.height = el.parentNode.offsetHeight + "px";
};

export const onDragEnd = (el) => {
  [...document.querySelectorAll(".piece")].map(
    (el) => (el.style.pointerEvents = "inherit")
  );

  if (!el) {
    return;
  }

  el.style.position = "static";
  el.style.width = "80%";
  el.style.height = "80%";
};

const getShift = (e, el) => {
  let shiftX = e.clientX - el.getBoundingClientRect().left;
  let shiftY = e.clientY - el.getBoundingClientRect().top;

  return { shiftX, shiftY };
};

export const dragElement = (
  e,
  draggedElement,
  mousePosition,
  dragShift,
  setDragShift
) => {
  e.preventDefault();

  if (!draggedElement) {
    return;
  }

  const { shiftX, shiftY } = getShift(e, draggedElement);

  if (dragShift === null) {
    setDragShift([shiftX, shiftY]);
  } else {
    makeDraggable(draggedElement, mousePosition, dragShift);
  }
};

const dragAndDrop = {
  onDragEnd,
  dragElement,
};

export default dragAndDrop;
