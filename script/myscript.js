const windows = document.querySelectorAll('.window');
let offsetX = 0;
let offsetY = 0;
let currentDraggable = null;

windows.forEach((draggable) => {
  draggable.addEventListener('mousedown', (e) => {
    currentDraggable = draggable;
    offsetX = e.clientX - draggable.offsetLeft;
    offsetY = e.clientY - draggable.offsetTop;
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
  });
});

function drag(e) {
  if (currentDraggable) {
    currentDraggable.style.left = (e.clientX - offsetX) + 'px';
    currentDraggable.style.top = (e.clientY - offsetY) + 'px';
  }
}

function stopDrag() {
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', stopDrag);
  currentDraggable = null;
}