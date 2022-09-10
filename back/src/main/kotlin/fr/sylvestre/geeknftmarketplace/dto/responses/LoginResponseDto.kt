package fr.sylvestre.geeknftmarketplace.dto.responses

data class LoginResponseDto(
    val user: UserDto,
    val token: String
)
