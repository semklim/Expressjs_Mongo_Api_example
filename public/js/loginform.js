import loginAndReg from "./authFetch.js";


const accountElements = document.querySelector('.content');
const singIn = document.querySelector('.sing-in');
const singUp = document.querySelector('.singUpLink');
const singUpTxt = document.querySelector('.sing-upText');
const forgot = document.querySelector('.forgot-pass');
const username = document.querySelector('.userName');
const formName = document.querySelector('.formName');
const loginForm = document.forms['loginForm'];
const copyaccountElements = accountElements.cloneNode(true);
const client = {
  username: null,
  userEmail: null,
  password: null,
};
let logoutBtn;
let singInForm = true;

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
  let res;
  if (singInForm) {
    const value = {
      userEmail: loginForm.elements.email.value,
      password: loginForm.elements.password.value,
    };
    res = loginAndReg('/api/login', value);
  } else {
    const value = {
      userName: loginForm.elements.email.value,
      email: loginForm.elements.email.value,
      password: loginForm.elements.password.value,
    };
    res = loginAndReg('/api/reg', value);
  }
  singIn.disabled = false;
  return res;
}

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const res = await completeAndRedirect();
  if (res) {
    console.log(res);
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
  }
  loginForm.reset();
});
