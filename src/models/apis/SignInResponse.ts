import User from "../entities/User";

type SignInResponse = {
  expirationTime: string;
  user: User;
}

export default SignInResponse;
