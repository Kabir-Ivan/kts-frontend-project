export enum PasswordStrength {
  Weak = 'Weak',
  Medium = 'Medium',
  Strong = 'Strong',
}

export const getPasswordStrength = (password: string): PasswordStrength => {
  const conditionsMet =
    (/[A-Z]/.test(password) ? 1 : 0) +
    (/[a-z]/.test(password) ? 1 : 0) +
    (/[0-9]/.test(password) ? 1 : 0) +
    (/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 1 : 0);

  let strength = PasswordStrength.Weak;
  switch (conditionsMet) {
    case 3:
      strength = PasswordStrength.Medium;
      break;
    case 4:
      strength = PasswordStrength.Strong;
      break;
    default:
      strength = PasswordStrength.Weak;
  }

  return strength;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};
