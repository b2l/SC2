package parser;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;


public class XMLParserSC2 {
	private File xml;
	private Document parsedDocument;
	
	public XMLParserSC2(File xmlFile) {
		xml= xmlFile;
	}

	public List<String> getUnitNames() {
		NodeList units = parsedDocument.getElementsByTagName("CUnit");
		List<String> names = new ArrayList<String>();
		int nbUnits = units.getLength();
		for(int i=0; i<nbUnits; i++){
			Element element = (Element) units.item(i);
			names.add(element.getAttribute("id"));
		}
		return names;
	}

	public void parse() {
		DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
		try {
			DocumentBuilder db = dbf.newDocumentBuilder();
			parsedDocument = db.parse(xml);
		}catch(ParserConfigurationException pce) {
			pce.printStackTrace();
		}catch(SAXException se) {
			se.printStackTrace();
		}catch(IOException ioe) {
			ioe.printStackTrace();
		}
		
	}

}
