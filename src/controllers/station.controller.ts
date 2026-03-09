import { Request, Response } from "express";
import { db } from "../config/db";
import { chargingStations } from "../db/schema";
import { eq } from "drizzle-orm";

export const createStation = async (req: Request, res: Response) => {
  try {
    const { name, latitude, longitude, address, status, powerOutput, connectorType } = req.body;

    if (!name || !latitude || !longitude || !connectorType) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }
    const user = (req as any).user;
    await db.insert(chargingStations).values({ name, latitude, longitude, address, status, powerOutput, connectorType, createdBy: user.userId});
    res.status(201).json({
      message: "Charging station created successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Internal server error"
    });

  }
};

export const getStations = async (req: Request, res: Response) => {
  try {
    const stations = await db
      .select()
      .from(chargingStations);

    res.json(stations);
  } catch {
    res.status(500).json({
      message: "Internal server error"
    });
  }
};

export const updateStation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const station = await db
      .select()
      .from(chargingStations)
      .where(eq(chargingStations.id, Number(id)));
    if (station.length === 0) {
      return res.status(404).json({
        message: "Station not found"
      });
    }
    const { name, latitude, longitude, address, status, powerOutput, connectorType } = req.body;
    await db
      .update(chargingStations)
      .set({ name, latitude, longitude, address, status, powerOutput, connectorType })
      .where(eq(chargingStations.id, Number(id)));
    res.json({
      message: "Charging station updated successfully"
    });
  } catch {
    res.status(500).json({
      message: "Internal server error"
    });
  }
};

export const deleteStation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const station = await db
      .select()
      .from(chargingStations)
      .where(eq(chargingStations.id, Number(id)));
    if (station.length === 0) {
      return res.status(404).json({
        message: "Station not found"
      });
    }
    await db
      .delete(chargingStations)
      .where(eq(chargingStations.id, Number(id)));

    res.json({
      message: "Charging station deleted successfully"
    });
  } catch {
    res.status(500).json({
      message: "Internal server error"
    });

  }
};