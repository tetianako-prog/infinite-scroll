import './styles.css';
import cardTemplate from './templates/card.hbs';
import photoService from './js/photoService';
import refs from './js/refs';
import './js/lightBox';

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  photoService.query = e.currentTarget.elements.query.value;
  if (photoService.query === '') {
    return alert('Введите поисковый запрос');
  }

  //document.body.style.height = '';
  refs.gallery.innerHTML = '';
  refs.form.reset();
  photoService.resetPage();
  photoService.fetchPhotos().then(photos => {
    createMarkup(photos);
  });
});

// const height = refs.gallery.scrollHeight + 100;
// document.body.style.height = document.body.scrollHeight + 780 + 'px';

function createMarkup(data) {
  const markup = cardTemplate(data);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && photoService.query !== '') {
      photoService.fetchPhotos().then(photos => {
        createMarkup(photos);
      });
    }
  });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '150px',
});
observer.observe(refs.anchor);
