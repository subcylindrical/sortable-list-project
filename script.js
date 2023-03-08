const orderingList = document.querySelector('.ordering-list');
let listUnits = null;
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Innitialize DOM
(() => {
  const randomMonths = [...months];
  shuffle(randomMonths);
  randomMonths.forEach((month) => {
    const monthEle = document.createElement('li');
    monthEle.classList = 'unit';
    monthEle.draggable = 'true';
    monthEle.innerHTML = `
        <span class="number">${randomMonths.indexOf(month) + 1}</span>
        <div class="name-icon-wrapper">
          <span class="unit-name">${month}</span>
          <i class="drag">=</i>
        </div>`;
    orderingList.appendChild(monthEle);
  });
  listUnits = document.querySelectorAll('.unit');
})();

// Event Listeners
listUnits.forEach((unit) => {
  unit.addEventListener('dragstart', handleDrag);
  unit.addEventListener('dragend', handleDrop);
});
orderingList.addEventListener('dragover', handleDragOver);

// Drag Function
function handleDrag(e) {
  e.target.classList.add('dragging');
}

// Drop Function
function handleDrop(e) {
  e.target.classList.remove('dragging');
}

// Drag Over
function handleDragOver(e) {
  e.preventDefault();
  const appendAfter = getAppendLocation(e.clientY);
  const dragging = document.querySelector('.dragging');
  if (appendAfter == null) {
    orderingList.appendChild(dragging);
  } else {
    orderingList.insertBefore(dragging, appendAfter);
  }
  setListNumbers();
  checkCorrect();
}

// Locate element to append above
function getAppendLocation(y) {
  const sortableElements = [
    ...document.querySelectorAll('.unit:not(.dragging)'),
  ];
  return sortableElements.reduce(
    (closest, currentUnit) => {
      const box = currentUnit.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: currentUnit };
      } else {
        return closest;
      }
    },
    {
      offset: Number.NEGATIVE_INFINITY,
      element: null,
    }
  ).element;
}

// Check if month order is corret
function checkCorrect() {
  const currentList = [...orderingList.children];
  currentList.forEach((current) => {
    if (
      months[currentList.indexOf(current)] ===
      current.lastElementChild.firstElementChild.textContent
    ) {
      current.firstElementChild.classList.add('correct');
    } else {
      current.firstElementChild.classList.remove('correct');
    }
  });
}

// Shuffle the month array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function setListNumbers() {
  const currentList = [...orderingList.children];
  currentList.forEach((current) => {
    current.firstElementChild.textContent = currentList.indexOf(current) + 1;
  });
}
