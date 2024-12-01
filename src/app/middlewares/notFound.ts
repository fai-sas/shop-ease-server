import { NextFunction, Request, Response } from 'express'
import status from 'http-status'

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(status.NOT_FOUND).json({
    success: false,
    status: status.NOT_FOUND,
    message: 'API Not Found',
    error: {
      path: req.originalUrl,
      message: 'Your requested path is not found!',
    },
  })
}

export default notFound