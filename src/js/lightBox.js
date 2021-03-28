import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import refs from './refs';

refs.gallery.addEventListener('click', onGalleryClick);
function onGalleryClick(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const instance = basicLightbox.create(
    `
    <div class="modal">
      <img src=${event.target.dataset.largeUrl} alt="" class="large-image"/>
    </div>
`,
    {
      onShow: instance => {
        document.body.classList.add('modal-is-open');
      },
      onClose: instance => {
        document.body.classList.remove('modal-is-open');
      },
    },
  );

  instance.show();
}
