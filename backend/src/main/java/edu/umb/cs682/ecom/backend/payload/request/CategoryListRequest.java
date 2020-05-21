package edu.umb.cs682.ecom.backend.payload.request;

import javax.validation.constraints.NotBlank;
import java.util.List;

public class CategoryListRequest {
    @NotBlank
    private List<String> categoryIDs;

    public List<String> getCategoryIDs() { return categoryIDs; }
    public void setCategoryIDs(List<String> categoryIDs) { this.categoryIDs = categoryIDs; }
}
