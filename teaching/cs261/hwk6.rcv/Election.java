
/**
 * This is the Election interface that your RankChoiceElection class
 * must implement.
 * 
 */
public interface Election {

    /**
     * A winner is selected if their % of votes exceed this
     * threshold. Remember that any field defined in an interface
     * is automatically public final static.
     */
    double MAJORITY = 0.5;
    
    /**
     * Inputs a file name holding ballot data and prepares
     * a list of ballots (valid ones only).
     * 
     * @param filename Name of file containing ballot data
     * @return the number of valid ballots received and loaded
     */
    int createBallotsFromFile(String filename);
    
    /**
     * Runs the election and prints out the results of each round.
     * Determines the winner in the last round.
     */
    void runElection();
}
