/**
 * This is the interface that your RankedBallot class
 * must implement.
 *
 * @author David
 */
public interface Ballot {
    /**
     * Adds a candidate to this ballot
     */
    void castVote(Candidate c);

    /**
     * @return true if this ballot is empty
     */
    boolean isEmpty();
    
    /**
     * @return the candidate at the top of the ballot.
     */
    Candidate top();

    /**
     * Remove a candidate from the ballot
     */
    void remove(String name);

}
