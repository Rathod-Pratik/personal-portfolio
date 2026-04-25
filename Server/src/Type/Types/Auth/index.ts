export interface IAdmin {
	FirstName: string;
	LastName: string;
	email: string;
	password: string;
	role?: string;
	loginOtpHash: string | null;
	loginOtpExpiresAt: Date | null;
	resetOtpHash: string | null;
	resetOtpExpiresAt: Date | null;
	resetOtpVerified: boolean;
	view: number;
}

export interface LoginRequestBody {
	email: string;
	password: string;
}

export interface VerifyLoginOtpRequestBody {
	email: string;
	otp: string | number;
}

export interface SignupRequestBody {
	email: string;
	password: string;
	name: string;
}

export interface ForgotPasswordRequestBody {
	email: string;
}

export interface VerifyOtpRequestBody {
	email: string;
	otp: string | number;
}

export interface ResetPasswordRequestBody {
	email: string;
	password: string;
}

export interface JwtTokenPayload {
	id: string;
	role?: string;
}
