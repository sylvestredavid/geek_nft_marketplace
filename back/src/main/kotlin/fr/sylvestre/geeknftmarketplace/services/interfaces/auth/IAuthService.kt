package fr.sylvestre.geeknftmarketplace.services.interfaces.auth

import fr.sylvestre.geeknftmarketplace.dto.requests.LoginRequestDto
import fr.sylvestre.geeknftmarketplace.dto.responses.LoginResponseDto
import fr.sylvestre.geeknftmarketplace.dto.responses.UserDto

interface IAuthService {
    fun login(request: LoginRequestDto): LoginResponseDto
    fun validateToken(jwt: String): UserDto
}