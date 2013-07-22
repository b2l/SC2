package parser;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import models.Unit;

import org.junit.Ignore;
import org.junit.Test;

import play.test.UnitTest;

public class XmlFileParsingTest extends UnitTest{

	@Test
	public void getUnitsNamesTest(){
		File xml = new File("ressources/UnitData.xml");
		List<Unit> units = XMLParserSC2.parse(xml);

		List<String> names = new ArrayList<String>();
		for(Unit soldier : units){
			names.add(soldier.name);
		}
		
		assertNotNull("List of sc2 unit names is not null", names);
		assertTrue("List of sc2 unit names is not empty", names.size()>0);
		assertNotNull("List of sc2 unit names contains Zergling", names.contains("Zergling"));
	}
}
