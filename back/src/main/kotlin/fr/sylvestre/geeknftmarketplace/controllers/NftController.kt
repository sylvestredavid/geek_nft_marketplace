package fr.sylvestre.geeknftmarketplace.controllers

import fr.sylvestre.geeknftmarketplace.dto.requests.NftRequestDto
import fr.sylvestre.geeknftmarketplace.dto.responses.NftDto
import fr.sylvestre.geeknftmarketplace.services.interfaces.nft.INftCreateService
import fr.sylvestre.geeknftmarketplace.services.interfaces.nft.INftSearchService
import fr.sylvestre.geeknftmarketplace.services.interfaces.nft.INftUpdateService
import org.springframework.web.bind.annotation.*
import java.util.UUID

@RestController
@CrossOrigin(origins = ["*"])
@RequestMapping("/nfts")
class NftController(
    val createService: INftCreateService,
    val updateService: INftUpdateService,
    val searchService: INftSearchService
    ) {

    @GetMapping("")
    fun getAll(): List<NftDto> {
        return searchService.getAllNft()
    }

    @PostMapping("/create")
    fun createNft(@RequestBody request: NftRequestDto): NftDto {
        return createService.createNft(request)
    }

    @PutMapping("/{id}/update")
    fun updateNft(@PathVariable id: UUID, @RequestBody request: NftRequestDto): NftDto {
        return updateService.updateNft(request, id)
    }
}