/**
 * This is a checked exception that should be thrown if you
 * detect a bad review format.
 */
public class BadReviewFormatException extends Exception {
    public BadReviewFormatException() {
        super();
    }

    public BadReviewFormatException(String msg) {
        super(msg);
    }
}
