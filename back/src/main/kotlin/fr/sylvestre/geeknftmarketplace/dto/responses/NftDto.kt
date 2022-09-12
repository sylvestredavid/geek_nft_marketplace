package fr.sylvestre.geeknftmarketplace.dto.responses

import fr.sylvestre.geeknftmarketplace.entities.NftDb
import org.hibernate.annotations.Type
import java.util.UUID
import javax.persistence.Column

data class NftDto(
    val id: UUID,
    val name: String,
    val description: String,
    val fileUri: String,
    val owner: String,
    val toSell: Boolean,
    val weiPrice: String,
    val categoryName: String,
    val tokenId: String?,
    val categoryId: UUID,
){
    companion object{
        fun fromDb(db: NftDb): NftDto {
            return NftDto(
                id =  db.id!!,
                name = db.name,
                description = db.description,
                fileUri = db.fileUri,
                owner = db.owner,
                toSell = db.toSell,
                weiPrice = db.weiPrice,
                tokenId = db.tokenId,
                categoryName = db.category.name,
                categoryId = db.category.id!!
            )
        }
    }
}
