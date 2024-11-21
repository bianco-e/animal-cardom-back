export default interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  profile_img: string
  role_id: number
  google_id: string
  created_at: string
  deleted_at: string
}

export interface GoogleUser {
  sub: User["google_id"]
  picture: User["profile_img"]
  email: User["email"]
  given_name: User["first_name"]
  family_name: User["last_name"]
}
