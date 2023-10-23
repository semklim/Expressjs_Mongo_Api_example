import loginAndReg from "./authFetch.js";
import notification from "./notification.js";


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

