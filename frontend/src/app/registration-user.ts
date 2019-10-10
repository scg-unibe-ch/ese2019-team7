export class RegistrationUser {

  constructor(
    public id: number,
    public username: string,
    public password1: string,
    public password2: string,
    public email: string,
    public tel?: number,
    public address?: string
  ) {}
}
