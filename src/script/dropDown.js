export function initializeDropdown() {
    const dropdownIcon = document.querySelector('.dropdown-icon');
    const dropdownMenu = document.querySelector('.dropdown-menu');
  
    dropdownIcon.addEventListener('click', function (event) {
      event.stopPropagation();
      toggleDropdown();
    });
  
    window.addEventListener('click', function () {
      if (window.innerWidth <= 640) {
        closeDropdown();
      }
    });
  
    window.addEventListener('resize', function () {
      if (window.innerWidth > 640) {
        closeDropdown();
      }
    });
  
    function toggleDropdown() {
      dropdownMenu.style.display =
        dropdownMenu.style.display === 'flex' ? 'none' : 'flex';
    }
  
    function closeDropdown() {
      dropdownMenu.style.display = 'none';
    }
  }
  