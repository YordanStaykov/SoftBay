import { addPartials, saveUserData, clearUserData } from "../util.js";

const auth = firebase.auth();

export async function renderLoginPage() {
    await addPartials(this);

    this.partial('/templates/login.hbs')
};

export async function renderRegisterPage() {
    await addPartials(this);

    this.partial('/templates/register.hbs')
};

export async function registerPagePost(ctx) {
    const { email, password, repeatPassword } = ctx.params;

    if (password !== repeatPassword) {
        ctx.redirect('/register');
    };

    auth.createUserWithEmailAndPassword(email, repeatPassword)
        .then(data => {
            saveUserData(data);
            ctx.redirect('/home');
        })
        .catch(() => {
            ctx.redirect('/register');
        })
};

export async function loginPagePost(ctx) {
    const { email, password } = ctx.params;

    auth.signInWithEmailAndPassword(email, password)
        .then((data) => {
            console.log(data);
            saveUserData(data);
            ctx.redirect('/home');
        })
        .catch(() => {
            ctx.redirect('/login');
        });
};

export async function logOut() {
    auth.signOut()
        .then(() => {
            clearUserData();
            this.redirect('/home');
        })
}