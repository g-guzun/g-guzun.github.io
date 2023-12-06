/**
 * This class tests the LetterCounter class you'll write.
 */

public class TestLetterCounter {

	/**
	 * The main method creates an instance of LetterCounter and feeds it
	 * some sample text.  After each new bit of text, the counter instance
	 * is printed so we can see the histogram.
	 */
	public static void main(String[] args) {
		LetterCounter counter = new LetterCounter();
		// text is an array of strings defined below.  This loop takes
		// each string in turn and passes it to countLetters.
		for(String s : text) {
			counter.countLetters(s);
			System.out.println("Frequencies after "+counter.getTotalCount()+" characters:");
			System.out.println(counter);
		}
	}

	/**
	 * This sample text was taken from the History section of Wikipedia's entry
	 * for Puget Sound, with each paragraph stored as a separate string.  LetterCounter 
	 * could easily handle the entire chunk of text in one piece, but splitting it 
	 * up into multiple pieces allows us to test that LetterCounter accumulates 
	 * count data across calls to countLetters().
	 */
	public static String[] text = {
		"The University of Puget Sound was founded by the Methodist Episcopal"+
		"Church in 1888 in downtown Tacoma. Charles Henry Fowler, who had"+
		"previously been the president of Northwestern University, dreamed up"+
		"the idea for the college while in Tacoma for a Methodist conference."+
		"He spoke at the conference with his vision of a Christian institution"+
		"of learning. The conference released a report:",

		"We commit ourselves...heartily to the building up within the bounds of"+
		"the conference of an institution of learning which shall by its ample"+
		"facilities...command the respect and patronage of Methodist people"+
		"within the bounds of the territory...and so by united and prayerful"+
		"efforts advance to the establishment of a school of learning which"+
		"shall be a praise in all the land.",

		"Two cities vied for the location of the school: Port Townsend and"+
		"Tacoma. The committee eventually decided on Tacoma. A charter was"+
		"drawn up and filed in Olympia on March 17, 1888. This date marks the"+
		"legal beginning of the school. At this time, the school's legal title"+
		"was \"The Puget Sound University\".[8] In September 1890, UPS opened its"+
		"doors, taking in 88 students.",

		"The beginnings of the school were marked by moral conviction: students"+
		"were warned against intoxicating liquors, visits to saloons, gambling,"+
		"tobacco use, and obscene drawings or writings on the college grounds."+
		"The university also had a financially tumultuous beginning. There was"+
		"no endowment and the school often struggled for funds to pay the"+
		"professors. It moved locations three times in 13 years and, at one"+
		"time, the school was merged with Portland University (former campus is"+
		"now the University of Portland). It opened up a year later (1899) back"+
		"in Tacoma on the 9th and G Street.[9] In 1903, the school was \"reborn\""+
		"and re-incorporated as a different entity, different trustees, and a"+
		"different name: the \"University of Puget Sound\".",

		"The character of the school changed dramatically during the presidency"+
		"of Edward H. Todd (1913-1942), who worked tirelessly to bring"+
		"financial and academic stability. During his tenure, the \"Million"+
		"Dollar Campaign\" was started, raising $1,022,723 for buildings,"+
		"equipment, and endowment. With this money, the campus moved in"+
		"1924[10] to its current location in the residential North End of"+
		"Tacoma, with five buildings, setting a stylistic tone for the"+
		"institution. In 1914 the university was renamed the \"College of Puget"+
		"Sound\".",

		"President R. Franklin Thompson (1942-1973) led a massive physical and"+
		"institutional expansion: During this era almost all of the"+
		"university's buildings were constructed. In 1960, the university's"+
		"name changed from the \"College of Puget Sound\" back to the \"University"+
		"of Puget Sound\", as it is known today.",

		"Phillip M. Phibbs presided from 1973 to 1992 and endeavored to change"+
		"the tone of Puget Sound. In 1980, the university divested its"+
		"attachment with the Methodist Church, and an independent board of"+
		"trustees assumed full fiscal responsibility of the university. Also"+
		"during this time, the university began to focus on undergraduate"+
		"education excellence, phasing out all off-campus programs except the"+
		"law school and most graduate programs. During this time the library"+
		"collections were broadened and the faculty greatly expanded.",

		"With the advent of President Susan Resneck Pierce (1992-2003), the law"+
		"school was promptly sold to Seattle University, in a move that was"+
		"calculated to focus the university's resources on its undergraduate"+
		"campus. During her tenure, the University completed almost $100"+
		"million of new construction and renovation. Collins Memorial Library"+
		"and four academic buildings were renovated, and Wyatt Hall was"+
		"constructed to house the growing class and office space needs of the"+
		"Humanities Department. Trimble Residence Hall was constructed,"+
		"bringing on-campus student residency to 65%. SAT scores rose from 1067"+
		"to 1253 and the endowment more than tripled. Puget Sound's newest"+
		"President is Ronald R. Thomas, affectionately called \"Ron Thom\" by"+
		"many students, a scholar of Victorian literature, and the former"+
		"vice-President of Trinity College.",

		"Thompson Hall, home of the sciences at the university, underwent a"+
		"major renovation, including the construction of a new wing (Harned"+
		"Hall, completed 2006) on the building's western side against Union"+
		"Avenue and extensive renovations to the current wings and courtyard to"+
		"allow for upgraded labs and facilities. The entire project was"+
		"completed in mid 2008. The entire complex is now known locally as \"The"+
		"Science Center at Puget Sound.\" The now completely enclosed courtyard"+
		"contains a striking Plexiglas structure where a coffee shop,"+
		"Oppenheimer Cafe, is located.[11]",

		"In fall 2013 Puget Sound opened Commencement Hall, a residence hall"+
		"for upper-division students featuring 11 \"houses\" organized around"+
		"five academic-residential programs: the Humanities Program,"+
		"environmental outdoor leadership, international experiential learning,"+
		"entrepreneurship, and the Honors Program. The hall is home for 135"+
		"students, and includes a seminar room, four studies, and an"+
		"event/meeting space for approximately 150 people, accommodating"+
		"special events, guest lectures, performances and more.[12]"
	};
}