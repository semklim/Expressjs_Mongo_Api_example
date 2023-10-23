const notif = document.getElementsByClassName('notification')[0];

const template = (err) => {
  if (err.message) {
    return `
    <div class="alert alert-err alert-success d-flex p-4 rounded-3" role="alert">
        <i class="fa fa-exclamation-triangle text-success me-3 align-self-center"></i>
        <div class="mb-0">${err.message}</div>
        <button type="button" class="btn-close btn-sm" aria-label="Close"></button>
    </div>
    `;
  } else {
    return `
    <div class="alert alert-success d-flex p-4 rounded-3" role="alert">
        <i class="fa fa-check-circle text-success me-3 align-self-center"></i>
        <div class="mb-0">Success.</div>
        <button type="button" class="btn-close btn-sm" aria-label="Close"></button>
    </div>
    `;
  }
};

export default function notification(err = null) {
  notif.insertAdjacentHTML('beforeend', template(err));
  const el = notif.lastElementChild;

  setTimeout(() => {
    el.remove();
  }, 1000);
}
