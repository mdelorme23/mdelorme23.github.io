function openModal(num){
    document.getElementById('modal'+num).showModal();
}

function closeModal(num){
    document.getElementById('modal'+num).close();
}

window.addEventListener('click', (event) => {
  // 1. Check if the element clicked is actually a native <dialog> tag
  if (event.target.tagName === 'DIALOG') {
    const modal = event.target;
    
    // 2. Find the unique inner .modal-content box inside THIS specific modal
    const contentBox = modal.querySelector('.modal-content');
    const rect = contentBox.getBoundingClientRect();
    
    // 3. Run the boundary calculation
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    ) {
      modal.close(); // Closes whichever unique modal was active
    }
  }
});