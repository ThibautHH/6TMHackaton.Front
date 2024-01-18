interface User {
  username?: string,
  token?: string,
  role?: string[],
  '@context'?: string | object,
  '@id'?: string,
  '@type'?: string
}

export default User;
