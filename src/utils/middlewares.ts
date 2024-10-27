import { NextFunction, Request, Response } from 'express'
import jwt, { VerifyErrors } from 'jsonwebtoken'
import { getBearer } from '.'

const JWT_SECRET = process.env.JWT_SECRET

const tokenHandler = (req: Request, res: Response, next: NextFunction, callback?: (decoded: any) => void): void => {
  const token = getBearer(req.headers.authorization)
  if (!token) {
    res.status(401).send({ error: 'Unauthorized - NT' })
    res.end()
  }
  if (!JWT_SECRET) {
    res.status(500).send({ error: 'Environment unset' })
    res.end()
  }

  jwt.verify(token as string, JWT_SECRET as string, (err: VerifyErrors | null, decoded: any) => {
    if (err) return res.status(401).send(err)
    if (callback) return callback(decoded)
    next()
  })
}

export const validateToken = (req: Request, res: Response, next: NextFunction) => tokenHandler(req, res, next)

export const validateAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const callback = (decoded: any) => {
    if (decoded.role !== 'ADMIN') return res.status(401).send({ error: 'User does not have required permissions' })
    next()
  }
  tokenHandler(req, res, next, callback)
}
