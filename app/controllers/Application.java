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
		
		List<Unit> units = XMLParserSC2.parse(xml);
		List<String> names = new ArrayList<String>();
		for(Unit soldier : units){
			names.add(soldier.name);
		}
        render(units);
    }

}