package fr.sylvestre.geeknftmarketplace.controllersadvices

import fr.sylvestre.geeknftmarketplace.exceptions.CategoryNotFoundException
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.ResponseStatus


@ControllerAdvice
class CategoryNotFoundAdvice {

    @ResponseBody
    @ExceptionHandler(CategoryNotFoundException::class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    fun categoryNotFoundHandler(ex: CategoryNotFoundException): Map<String, String>? {
        return hashMapOf("message" to ex.message)
    }
}