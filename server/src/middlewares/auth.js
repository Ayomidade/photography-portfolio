/**
 * auth.js
 *
 * Session-based authentication middleware.
 * Protects admin routes:  if the session has no adminId,
 * the request is rejected with 401.
 */

export const protect = (req, res, next) => {
  if (!req.session || !req.session.adminId) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorised. Please log in.',
    })
  }
  next()
}