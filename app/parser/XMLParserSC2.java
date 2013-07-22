package parser;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import models.Unit;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;


public class XMLParserSC2 {
	

	public static List<String> getUnitNames( Document parsedDocument) {
		NodeList units = parsedDocument.getElementsByTagName("CUnit");
		List<String> names = new ArrayList<String>();
		int nbUnits = units.getLength();
		for(int i=0; i<nbUnits; i++){
			Element element = (Element) units.item(i);
			names.add(element.getAttribute("id"));
		}
		return names;
	}
	

	public static List<Unit> parse(File xml) {
		
		DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
		List<Unit> units= new ArrayList();
		try {
			DocumentBuilder db = dbf.newDocumentBuilder();
			Document parsedDocument = db.parse(xml);
			//List<String> names = getUnitNames(parsedDocument);
			NodeList unitsNode = parsedDocument.getElementsByTagName("CUnit");
			int nbUnits = unitsNode.getLength();
			
			for(int i=0; i<nbUnits; i++){
				Element element = (Element) unitsNode.item(i);
				String name = element.getAttribute("id");
				
				NodeList army = element.getElementsByTagName("CostCategory");
				
				if (army.getLength()>0){
					
					if(((Element)army.item(0)).getAttribute("value") != null 
							&& ((Element)army.item(0)).getAttribute("value").equalsIgnoreCase("Army")){
						String race = getRace(element);
						Unit unit = new Unit(name, race, 0, 0, 0);
						units.add(unit);
					}
				}
				
				
			}
			
			
		}catch(ParserConfigurationException pce) {
			pce.printStackTrace();
		}catch(SAXException se) {
			se.printStackTrace();
		}catch(IOException ioe) {
			ioe.printStackTrace();
		}
		return units;
	}


	private static String getRace(Element element) {
		NodeList raceNode = element.getElementsByTagName("Race");
		String race="";
		if (raceNode.getLength()>0){
			race = ((Element)raceNode.item(0)).getAttribute("value");
		}
		return race;
	}
}
