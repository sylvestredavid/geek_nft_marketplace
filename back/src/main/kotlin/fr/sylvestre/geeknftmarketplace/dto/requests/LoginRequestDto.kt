package fr.sylvestre.geeknftmarketplace.dto.requests

import fr.sylvestre.geeknftmarketplace.entities.NftDb

data class LoginRequestDto(
    val message: String,
    val address: String,
    val signature: String,
)
