package edu.umb.cs682.ecom.backend.models;

public class ProductReview {
    Product parent;
    int rating;
    String comment;
    long helpfulMarks;
    long unHelpfulMarks;
    String vendorReply;

    public ProductReview(Product parent, int rating, String comment) {
        this.parent = parent;
        this.rating = rating;
        this.comment = comment;
        helpfulMarks = 0;
        unHelpfulMarks = 0;
    }

    Product getParent() { return parent; }
    int getRating() { return rating; }
    String getComment() { return comment; }

    void addVendorReply(String vendorReply) { this.vendorReply = vendorReply; }

    long getHelpfulMarks() { return helpfulMarks; }
    void markHelpful() { helpfulMarks++; }

    long getUnHelpfulMarks() { return unHelpfulMarks; }
    void markUnHelpful() { unHelpfulMarks++; }

}
