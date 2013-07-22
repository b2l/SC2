package models;

import java.io.File;

public class Unit {
	public String name;
	public String race;
	public float supplyCost;
	public int mineralCost;
	public int gazCost;
	
	public Unit(String name, String race, float supplyCost, int mineralCost,
			int gazCost) {
		super();
		this.name = name;
		this.race = race;
		this.supplyCost = supplyCost;
		this.mineralCost = mineralCost;
		this.gazCost = gazCost;
	}
	
}
