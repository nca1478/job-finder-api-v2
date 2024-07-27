export const createUserPayload = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    img: null,
    google: user.google,
    facebook: user.facebook,
    createdAt: user.createdAt,
  };
};
