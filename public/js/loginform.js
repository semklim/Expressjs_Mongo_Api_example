const singIn = document.querySelector('.sing-in');
const singUp = document.querySelector('.singUpLink');
const singUpTxt = document.querySelector('.sing-upText');
const forgot = document.querySelector('.forgot-pass');
const username = document.querySelector('.userName');
const formName = document.querySelector('.formName');
const loginForm = document.forms['loginForm'];
const spinner = document.querySelector('.lds-dual-ring');
const userDto = JSON.parse(localStorage.getItem('userDto'));

let singInForm = true;

let logoutFrom = document.forms['logOutForm'];

if (userDto && userDto.user && userDto.user.userEmail) {
  accessAlow();

  logoutFrom = document.forms['logOutForm'];
  logoutFrom.addEventListener("submit", async (e) => {
    e.preventDefault()
    await loginAndReg('/api/logout');
    localStorage.clear();
    location.reload();
  }, { once: true });
}


async function loginAndReg(url, body) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message, { cause: err });
    }
    return res.json();
  } catch (e) {
    return e;
  }
}


// notification

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

function notification(err = null) {
  notif.insertAdjacentHTML('beforeend', template(err));
  const el = notif.lastElementChild;

  setTimeout(() => {
    el.remove();
  }, 2000);
}

//end notification


function accessAlow() {
  const delElement = document.querySelector('.content');
  const wrapper = document.createElement("div");
  const form = document.createElement("form");
  const button = document.createElement("button");
  form.name = "logOutForm";
  button.classList.add('logOut');
  button.textContent = 'Logout';
  button.setAttribute("type", "submit");
  wrapper.classList.add('content');
  form.append(button);
  wrapper.append(form);
  delElement.remove();
  document.body.append(wrapper);
  loginForm.reset();
}

function singInFormEvent(e) {
  if (singInForm) {
    singUp.textContent = 'sing in now';
    singUpTxt.textContent = "Have account?";
    singIn.textContent = 'SingUp';
    forgot.classList.toggle('display-none');
    username.classList.toggle('display-none');
    username.firstElementChild.required = true;
    formName.textContent = 'Registration From';
    singInForm = false;
  } else {
    singUp.textContent = 'signup now';
    singUpTxt.textContent = "Not a member?";
    singIn.textContent = 'Sing in';
    forgot.classList.toggle('display-none');
    username.classList.toggle('display-none');
    username.firstElementChild.required = false;
    formName.textContent = 'Login From';

    singInForm = true;
  }
}

singUp.addEventListener('click', singInFormEvent);

async function completeAndRedirect() {
  singIn.disabled = true;
  spinner.classList.toggle('display-none');
  let res;
  if (singInForm) {
    const value = {
      userEmail: loginForm.elements.email.value,
      password: loginForm.elements.password.value,
    };
    res = await loginAndReg('/api/login', value);
  } else {
    const value = {
      userName: loginForm.elements.email.value,
      email: loginForm.elements.email.value,
      password: loginForm.elements.password.value,
    };
    res = await loginAndReg('/api/reg', value);
  }
  spinner.classList.toggle('display-none');
  singIn.disabled = false;
  return res;
}

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const res = await completeAndRedirect();
  notification(res);
  if (!res.message) {
    accessAlow();

    logoutFrom = document.forms['logOutForm'];

    logoutFrom.addEventListener("submit", async (e) => {
      e.preventDefault()
      await loginAndReg('/api/logout');
      localStorage.clear();
      location.reload();
    }, { once: true });


    localStorage.setItem('userDto', JSON.stringify(res));
  }
});

