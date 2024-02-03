export function getPaginationNumbers(pageCount, paginationNumbers) {
  paginationNumbers.innerHTML = '';

  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i, paginationNumbers);
  }
}

export function appendPageNumber(index, paginationNumbers) {
  const pageNumber = document.createElement('button');
  pageNumber.className = 'pagination-number';
  pageNumber.innerHTML = index;
  pageNumber.setAttribute('page-index', index);
  pageNumber.setAttribute('aria-label', 'Page ' + index);

  paginationNumbers.appendChild(pageNumber);
}

export function handlePageButtonsStatus(
  currentPage,
  pageCount,
  prevButton,
  nextButton
) {
  if (currentPage === 1) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }

  if (pageCount === currentPage) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
}

export function disableButton(button) {
  button.classList.add('disabled');
  button.setAttribute('disabled', true);
}

export function enableButton(button) {
  button.classList.remove('disabled');
  button.removeAttribute('disabled');
}

export function handleActivePageNumber(currentPage) {
  document.querySelectorAll('.pagination-number').forEach((button) => {
    button.classList.remove('active');
    const pageIndex = Number(button.getAttribute('page-index'));
    if (pageIndex === currentPage) {
      button.classList.add('active');
    }
  });
}
