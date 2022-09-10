package fr.sylvestre.geeknftmarketplace.dto.requests

import fr.sylvestre.geeknftmarketplace.entities.CategoryDb
import fr.sylvestre.geeknftmarketplace.entities.NftDb
import java.util.UUID

data class NftRequestDto(
    val nom: String,
    val description: String,
    val fileUri: String,
    val owner: String,
    val toSell: Boolean,
    val weiPrice: String,
    val tokenId: String? = null,
    val categoryId: UUID
){
    fun mapRequestToEntity(id: UUID? = null, category: CategoryDb): NftDb {
        return NftDb(
            id = id,
            nom = this.nom,
            description = this.description,
            fileUri = this.fileUri,
            owner = this.owner,
            toSell = this.toSell,
            weiPrice = this.weiPrice,
            tokenId = this.tokenId,
            category = category
        )
    }
}
