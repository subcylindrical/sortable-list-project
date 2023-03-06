const orderingList = document.querySelector('.ordering-list');
const listUnits = document.querySelectorAll('.unit');

// Event Listeners
listUnits.forEach((unit) => {
  unit.addEventListener('dragstart', handleDrag);
  unit.addEventListener('dragend', handleDrop);
});

// orderingList.addEventListener('dragstart', (e) => {
//   if (e.target.closest('.unit')) handleDrag(e);
// });
// orderingList.addEventListener('dragend', (e) => {
//   if (e.target.closest('.unit')) handleDrop(e);
// });

// Drag Function
function handleDrag(e) {
  console.log('drag');
  e.target.classList.add('dragging');
  //   e.dataTransfer.setData('text/plain', JSON.stringify(e.target));
  e.dataTransfer.clearData();
  e.dataTransfer.setData('text/plain', 'yess');
}

// Drop Function
function handleDrop(e) {
  console.log('drop');
  e.target.classList.remove('dragging');
  //   orderingList.removeChild(e.target);
}
