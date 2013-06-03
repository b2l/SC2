package controllers;

import parser.XMLParserSC2;
import play.*;
import play.mvc.*;

import java.io.File;
import java.util.*;

import models.*;

public class Application extends Controller {

    public static void index() {
    	File xml = new File("ressources/UnitData.xml");
		XMLParserSC2 parser = new XMLParserSC2(xml);
		
		parser.parse();
		List<String> units = parser.getUnitNames();
        render(units);
    }

}