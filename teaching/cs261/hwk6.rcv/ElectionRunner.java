/**
 * Runs the election
 * @author David
 */
public class ElectionRunner {
    // constants
    private final static String FILENAME = "RCVRaw.csv";

    public static void main(String[] args) {
        // create the election
        Election election = new RankChoiceElection();
        int count = election.createBallotsFromFile(FILENAME);

        System.out.println("===============================");
        System.out.println("Rank-Choice Vote Ballot Counter");
        System.out.println("===============================");
        System.out.println(count + " valid ballots received\n");

        // let's go!
        election.runElection();
    }
}
