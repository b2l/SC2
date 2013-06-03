package parser;

import java.io.File;
import java.util.List;

import org.junit.Ignore;
import org.junit.Test;

import play.test.UnitTest;

public class XmlFileParsingTest extends UnitTest{

	@Test
	public void getUnitsNamesTest(){
		File xml = new File("ressources/UnitData.xml");
		XMLParserSC2 parser = new XMLParserSC2(xml);
		
		parser.parse();
		List<String> names = parser.getUnitNames();
		
		assertNotNull("List of sc2 unit names is not null", names);
		assertTrue("List of sc2 unit names is not empty", names.size()>0);
		assertNotNull("List of sc2 unit names contains Zergling", names.contains("Zergling"));
	}
}
