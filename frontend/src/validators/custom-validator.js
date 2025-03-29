export function checkPasswordConfirm (password, passwordConfirm) {
    if ((!!password && !!passwordConfirm) && (password !== passwordConfirm)) {
        return false;
    }
    return true;
}