import { Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
const {
	jwtSecret, refreshTokenSecret, tokenExpiration,
	cookieTokenExpiration, cookieBaseDomain
} = require('../../config')

export function verifyToken(token:string, tenant:string) {
	if (!token.trim()) {
		return Promise.reject()
	}
	return verify(token, tenant, jwtSecret)
}

export function verifyRefreshToken(refreshToken:string, tenant:string) {
	return verify(refreshToken, tenant, refreshTokenSecret)
}

function verify(token:string, tenant:string, secret:Secret) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, secret, (err, decoded) => {
			if (err || !decoded || (decoded as any).tenant !== tenant) {
				// the 401 code is for unauthorized status
				return reject(err || { message: 'token is empty' })
			}
			return resolve(decoded)
		})
	})
}

export function getUniqueId(creationTime = Date.now().toString()) {
	return creationTime + ':' + Buffer.from(Math.random().toString()).toString('base64')
}

function getCookieParameters(cookieId:string, maxAge:string) {
	let cookieParams:any = { maxAge, httpOnly: true }
	if (cookieBaseDomain) {
		cookieParams.domain = cookieBaseDomain
		cookieParams.sameSite = 'None'
		cookieParams.secure = true
	}

	return ['token', cookieId, cookieParams]
}

export function setCookie(res:Response, cookieId:string, maxAge = cookieTokenExpiration) {
	const [type, id, parameters] = getCookieParameters(cookieId, maxAge)
	res.cookie(type, id, parameters)
	return res
}

export function getSignedToken(user:any, tokenIdentifier:string, expiresIn = tokenExpiration) {
	const secretParams = {
		sub: user._id,
		tenant: user.tenant,
		email: user.email,
		name: user.name,
		roles: user.roles
	}
	if (tokenIdentifier) {
		(secretParams as any).tokenIdentifier = tokenIdentifier
	}
	return {
		payload: secretParams,
		token: jwt.sign(secretParams, jwtSecret, { expiresIn })
	}
}


