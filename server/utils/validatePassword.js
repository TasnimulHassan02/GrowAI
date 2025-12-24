export function validatePassword(password) {
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);

  if (!hasUpper) {
    return "Password must include uppercase";
  }
    if (!hasLower) {
    return "Password must include lowercase";
  }
    if (!hasNumber) {
    return "Password must include number";
  }

  return null;
}
