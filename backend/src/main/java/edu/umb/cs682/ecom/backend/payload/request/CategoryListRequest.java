package edu.umb.cs682.ecom.backend.payload.request;

import edu.umb.cs682.ecom.backend.models.Category;

import javax.validation.constraints.NotBlank;
import java.util.List;

/**
 * <code>CategoryListRequest</code> represents a request from the frontend for
 * a list of {@link Category} objects from a list of category IDs.
 */
public class CategoryListRequest {
    @NotBlank private List<String> categoryIDs;

    public List<String> getCategoryIDs() { return categoryIDs; }
    public void setCategoryIDs(List<String> categoryIDs) { this.categoryIDs = categoryIDs; }
}
