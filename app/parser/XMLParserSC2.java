package parser;

import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.xml.sax.SAXException;

import com.sun.xml.internal.txw2.Document;

public class XMLParserSC2 {
	private File xml;
	private Document parsedDocument;
	
	public XMLParserSC2(File xmlFile) {
		xml= xmlFile;
	}

	public List<String> getUnitNames() {
		// TODO Auto-generated method stub
		return null;
	}

	public void parse() {
		DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
		try {
			DocumentBuilder db = dbf.newDocumentBuilder();
			org.w3c.dom.Document dom = db.parse(xml);
		}catch(ParserConfigurationException pce) {
			pce.printStackTrace();
		}catch(SAXException se) {
			se.printStackTrace();
		}catch(IOException ioe) {
			ioe.printStackTrace();
		}
		
	}

}
