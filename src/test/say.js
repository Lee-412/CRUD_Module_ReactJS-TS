function sayHi(user) {
    alert(`Hello, ${user}!`);
}
function sayBye(user) {
    alert(`Bye, ${user}!`);
}
export default sayHi;
export { sayBye }; // a list of exported variables