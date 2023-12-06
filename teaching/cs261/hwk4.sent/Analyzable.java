/**
 * Your MovieBot must implement the follow contract.
 *
 * @author David
 * @version 9/25/2023
 */
public interface Analyzable
{
    /**
     * Trains the model by using data in the file indicated by the given filename
     * @param filename  the name of the movie review file
     */
    void trainModel(String filename);
    
    /**
     * Accepts a review as input with this format: <score 0-4> [space] <review>,
     * and splits it into an array of Strings. You may assume a single space
     * separates each term. For instance, given "0 Run for your lives !",
     * it returns the array ["0", "Run", "for", "your", "lives", "!"]
     * 
     * @param review A movie review in the format <score 0-4> [space] <review>
     * @return a string array containing all terms in the given review
     * @throws BadReviewFormatException if the input does not follow the specified format
     */
    String[] parseReview(String review) throws BadReviewFormatException;
    
    /**
     * A word's sentiment is computed as the total score over its frequency
     * @return the sentiment score for a word.
     */
    double getSentiment(String word);
    
    /**
     * A phrase's sentiment is computed as the average sentiment score of all its words
     * @param phrase    
     * @return the sentiment score for a specified phrase
     */
    double getSentimentByPhrase(String phrase);
    
    /**
     * Prints the list of word infos, followed by the number of word info entries,
     * followed by a count of all words (all the frequencies added up).
     */
    void showModel();
    
    /**
     * @returns a string containing all the WordInfos
     */
    String toString();
}
