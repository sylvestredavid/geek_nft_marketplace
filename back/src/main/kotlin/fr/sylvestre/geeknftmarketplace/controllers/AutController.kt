package fr.sylvestre.geeknftmarketplace.controllers

import fr.sylvestre.geeknftmarketplace.dto.requests.LoginRequestDto
import fr.sylvestre.geeknftmarketplace.dto.responses.LoginResponseDto
import fr.sylvestre.geeknftmarketplace.dto.responses.UserDto
import fr.sylvestre.geeknftmarketplace.services.interfaces.auth.IAuthService
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin(origins = ["*"])
@RequestMapping("/auth")
class AutController(
    val authService: IAuthService
    ) {

    @PostMapping("/login")
    fun login(@RequestBody request: LoginRequestDto): LoginResponseDto {
        return authService.login(request)
    }

    @GetMapping("/validate-token")
    fun validateToken(@RequestParam(name = "jwt", required = true) jwt: String): UserDto {
        return authService.validateToken(jwt)
    }
}